import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, dbConfig, authConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig, authConfig],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
