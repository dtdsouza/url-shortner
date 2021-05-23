import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          type: config.databaseType,
          host: config.databaseHost,
          port: config.databasePort,
          database: config.databaseName,
          username: config.databaseUsername,
          password: config.databasePassword,
          entities: ['src/modules/**/*.entity{.ts,.js}'],
          migrations: ['src/modules/**/*.migration{.ts,.js}'],
          synchronize: config.isDev,
          logging: !config.isProd,
          useNewUrlParser: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleOptions),
    }),
  ],
})
export class DatabaseModule {}
