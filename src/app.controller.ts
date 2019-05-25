import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('requestFile')
  async createFile() {
    const mensagem = await this.appService.createFile();

    return mensagem;
  }
}
