import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('requestAndCreateFile')
  async requestAndCreateFile() {
    const message = await this.appService.requestAndCreateFile();

    return message;
  }

  @Get('loadAndDecryptFile')
  async loadAndDecryptFile() {
    const message = await this.appService.readFileAndDecrypt();

    return message;
  }

  @Get('submitFile')
  async submitFile() {
    const message = await this.appService.submitFile();

    return message;
  }
}
