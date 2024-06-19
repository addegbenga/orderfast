import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/sendMail')
  async sendMail(@Body() payload: CreateMailDto) {
    const resp = await this.mailService.sendMail(payload);
    return resp;
  }
}
