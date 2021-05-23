import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'modules/config/config.module';
import { UrlRepository } from './model/url.repository';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UrlRepository])],
  providers: [UrlService],
  controllers: [UrlController],
  exports: [UrlService],
})
export class UrlModule {}
