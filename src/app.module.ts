import { Module } from '@nestjs/common';
import { MainModule } from './main/main.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import authConfig from 'src/config/auth.config';
import dbConfig from 'src/config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, dbConfig],
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('db'),
    }),
    MainModule,
  ],
})
export class AppModule {}
