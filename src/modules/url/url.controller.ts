import { Controller, Post, HttpStatus, Body, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateShortUrlDto } from './dto/create-url.dto';
import { UrlEntity } from './model/url.entity';
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
  store(@Body() payload: CreateShortUrlDto): Promise<UrlEntity> {
    return this.urlService.store(payload);
  }

  @Get('/:shortUrl')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Successful retrieved url.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found.',
  })
  show(@Param('shortUrl') shortUrl: string): Promise<UrlEntity> {
    return this.urlService.show(shortUrl);
  }
}
