import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { MailService } from './mail.service';
import { InvitePlayerDto } from './dto';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/invite')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: 'string',
  })
  @HttpCode(HttpStatus.CREATED)
  async invitePlayer(@Body() dto: InvitePlayerDto) {
    await this.mailService.invitePlayer(dto);
    return 'Invite was successufully sent';
  }
}
