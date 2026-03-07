import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';

export interface ConfigType {
  database: TypeOrmModuleAsyncOptions;
}

export const appConfigSchema = Joi.object({
  DB_URL: Joi.string().required(),
  DB_SYNC: Joi.boolean().required().default(false),
  DB_REJECT_UNAUTH: Joi.boolean().required().default(false),
});
