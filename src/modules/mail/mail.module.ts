import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

import { MailConfig } from 'src/config/interface';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const mailerConfig = configService.getOrThrow<MailConfig>('mail');

        return {
          transport: {
            host: mailerConfig.host,
            service: 'gmail',
            secure: false,
            auth: {
              user: mailerConfig.email,
              pass: mailerConfig.password,
            },
          },
          defaults: {
            from: `Chillery Dev <${mailerConfig.email}>`,
          },
          template: {
            dir: path.join(path.resolve(), 'src/templates/'),
            adapter: new PugAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailController, MailService],
})
export class MailModule {}
