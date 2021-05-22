import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShortUrlDto } from './dto/create-url.dto';
import { UrlEntity } from './model/url.entity';

import { UrlRepository } from './model/url.repository';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlRepository)
    private readonly urlRepository: UrlRepository,
  ) {}

  async store(data: CreateShortUrlDto): Promise<UrlEntity> {
    return this.urlRepository.save({
      originalUrl: data.url,
      shortUrl: 'test',
    });
  }

  async show(shortUrl: string): Promise<UrlEntity> {
    return this.urlRepository
      .findOneOrFail({
        where: { shortUrl },
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }
}
