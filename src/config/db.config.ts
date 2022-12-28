import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadConfig } from './orm.config';

export default registerAs(
  'db',
  (): TypeOrmModuleOptions => {
    return loadConfig();
  },
);