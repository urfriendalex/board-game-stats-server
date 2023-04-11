import { Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { appConfig, dbConfig, authConfig } from './config';
import { LoggerModule } from './infra/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: DataSourceOptions = {
          ...configService.get('database'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    UserModule,
    GameModule,
    AuthModule,
  ],
})
export class AppModule {}
