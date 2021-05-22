import { parse, DotenvParseOutput } from 'dotenv';
import { readFileSync } from 'fs';
import * as Joi from 'joi';
import { ConnectionOptions } from 'typeorm';

export class ConfigService {
  private readonly envConfig: DotenvParseOutput;

  constructor(filePath: string) {
    const parsedConfig = parse(readFileSync(filePath));
    this.envConfig = this.validateInput(parsedConfig);
  }

  private validateInput(parsedConfig: DotenvParseOutput) {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      DATABASE_TYPE: Joi.string()
        .valid([
          'cockroachdb',
          'cordova',
          'mariadb',
          'mongodb',
          'mssql',
          'mysql',
          'nativescript',
          'oracle',
          'postgres',
          'react-native',
          'sqlite',
          'sqljs',
        ])
        .required(),
      PORT: Joi.number(),
    });

    const validationOptions: Joi.ValidationOptions = { allowUnknown: true };

    const { error, value: validatedEnvConfig } = Joi.validate(
      parsedConfig,
      envVarsSchema,
      validationOptions,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string) {
    return this.envConfig[key];
  }

  public get isDev() {
    return this.envConfig.NODE_ENV === 'development';
  }

  public get isProd() {
    return this.envConfig.NODE_ENV === 'production';
  }

  public get isTest() {
    return this.envConfig.NODE_ENV === 'test';
  }

  public get databaseType() {
    return this.envConfig.DATABASE_TYPE;
  }

  public get databaseHost() {
    return this.envConfig.DATABASE_HOST;
  }

  public get databasePort() {
    return Number(this.envConfig.DATABASE_PORT);
  }

  public get databaseUsername() {
    return this.envConfig.DATABASE_USERNAME;
  }

  public get databasePassword() {
    return this.envConfig.DATABASE_PASSWORD;
  }

  public get databaseName() {
    return this.envConfig.DATABASE_NAME;
  }
}
