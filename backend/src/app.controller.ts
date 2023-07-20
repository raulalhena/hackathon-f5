import { Controller, Get, Req, Post, Sse, Query } from '@nestjs/common';
import { AppService } from './app.service';

interface MessageEvent {
  data: string | object;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello World!';
  }
}
