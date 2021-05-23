import {
  Controller,
  Post,
  HttpStatus,
  Body,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateShortUrlResponseDto } from './dto/create-url-response.dto';
import { CreateShortUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successful shorted url.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
  })
  store(
    @Body() payload: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
    return this.urlService.store(payload);
  }

  @Get('/:shortUrl')
  @ApiResponse({
    status: HttpStatus.MOVED_PERMANENTLY,
    description: 'Successful retrieved url.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found.',
  })
  async show(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    return res.redirect(
      HttpStatus.MOVED_PERMANENTLY,
      (await this.urlService.show(shortUrl)).url,
    );
  }
}
