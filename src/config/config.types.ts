import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

export interface ConfigType {
  database: TypeOrmModuleAsyncOptions;
  jwt: JwtModuleOptions;
}

export const appConfigSchema = Joi.object({
  DB_URL: Joi.string().required(),
  DB_SYNC: Joi.boolean().required().default(false),
  DB_REJECT_UNAUTH: Joi.boolean().required().default(false),
});

export const jwtConfigSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY: Joi.string().required(),
});
