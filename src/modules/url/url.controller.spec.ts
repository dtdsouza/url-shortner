import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { ConfigModule } from '../config/config.module';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlRepository } from './model/url.repository';
import { DatabaseModule } from '../database/database.module';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as faker from 'faker';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        DatabaseModule,
        TypeOrmModule.forFeature([UrlRepository]),
      ],
      providers: [UrlService],
      controllers: [UrlController],
      exports: [UrlService],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create and return a short URL', async () => {
    const response = await controller.store({ url: 'https://google.com' });

    expect(response).toMatchObject(
      expect.objectContaining({
        newUrl: expect.any(String),
      }),
    );
  });

  it('Should redirect to original url', async () => {
    const response = await controller.store({ url: 'https://google.com' });

    expect(response).toMatchObject(
      expect.objectContaining({
        newUrl: expect.any(String),
      }),
    );

    const mockedResponse = ({ redirect: jest.fn() } as unknown) as Response;

    await controller.show(
      response.newUrl.split('/').splice(-1)[0],
      mockedResponse,
    );

    expect(mockedResponse.redirect).toHaveBeenCalled();
    expect(mockedResponse.redirect).toHaveBeenCalledWith(
      HttpStatus.MOVED_PERMANENTLY,
      'https://google.com',
    );
  });

  it('Should return a NOT FOUND error when short Url doesn\'t existis', async () => {
    const mockedResponse = ({ redirect: jest.fn() } as unknown) as Response;
    await expect(
      controller.show(faker.random.alphaNumeric(10), mockedResponse),
    ).rejects.toThrow(
      JSON.stringify({
        statusCode: 404,
        error: 'Not Found',
      }),
    );
  });
});
