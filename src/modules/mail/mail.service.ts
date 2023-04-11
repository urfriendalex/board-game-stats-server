import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

import { InvitePlayerDto } from './dto';
import { MailConfig } from 'src/config/interface';

@Injectable()
export class MailService {
  private mailerConfig: MailConfig;

  constructor(
    private readonly mailerService: MailerService,
    configService: ConfigService,
  ) {
    this.mailerConfig = configService.getOrThrow<MailConfig>('mail');
  }

  async invitePlayer(body: InvitePlayerDto) {
    await this.mailerService
      .sendMail({
        to: this.mailerConfig.email,
        subject: 'Contact Us Feedback',
        text: `Contact Us Feedback`,
        template: path.join(path.resolve(), 'src/templates/mail.pug'),
        context: {
          email: body.email,
          firstname: body.name,
        },
      })
      .catch((error) => {
        throw new HttpException(
          error.message || 'Error with SMTP',
          error.code || error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
