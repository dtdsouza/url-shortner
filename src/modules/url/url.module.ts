import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlRepository } from './model/url.repository';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlRepository])],
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService],
})
export class UrlModule {}
