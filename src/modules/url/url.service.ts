import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShortUrlDto } from './dto/create-url.dto';
import { UrlEntity } from './model/url.entity';
import { UrlRepository } from './model/url.repository';
import { CreateShortUrlResponseDto } from './dto/create-url-response.dto';
import { GetShortUrlResponseDto } from './dto/get-url-response.dto';
import { ConfigService } from '../config/config.service';
import * as faker from 'faker';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlRepository)
    private readonly urlRepository: UrlRepository,
    private readonly configService: ConfigService,
  ) {}

  private async generateShortUrl(tries: number = 0): Promise<string | null> {
    if (tries > 10) {
      return null;
    }

    const randomString = faker.random.alphaNumeric(10);

    const hasAlreadyUse = await this.urlRepository.findOne({
      where: {
        shortUrl: randomString,
      },
    });

    if (!hasAlreadyUse) {
      return randomString;
    }

    return this.generateShortUrl(++tries);
  }

  async store(data: CreateShortUrlDto): Promise<CreateShortUrlResponseDto> {
    const haveShortedAlready = await this.urlRepository.findOne({
      where: {
        originalUrl: data.url,
      },
    });

    if (haveShortedAlready) {
      haveShortedAlready.setExpiresAt();
      await this.urlRepository.save(haveShortedAlready);

      return {
        newUrl: `${this.configService.get('API_URL')}/${
          haveShortedAlready.shortUrl
        }`,
      };
    }

    const shortUrl = await this.generateShortUrl();

    if (!shortUrl) {
      throw new InternalServerErrorException('Short url creation failed.');
    }

    const newUrl = this.urlRepository.create({
      originalUrl: data.url,
      shortUrl,
    });

    await this.urlRepository.save(newUrl);

    return {
      newUrl: `${this.configService.get('API_URL')}/${newUrl.shortUrl}`,
    };
  }

  async show(shortUrl: string): Promise<GetShortUrlResponseDto> {
    const url = await this.urlRepository
      .findOneOrFail({
        where: { shortUrl, expiresAt: MoreThan(new Date()) },
      })
      .catch(() => {
        throw new NotFoundException();
      });

    return {
      url: url.originalUrl,
    };
  }
}
