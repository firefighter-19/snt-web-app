import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); //dependency injection
  }
}

@Controller('/psina')
export class PsinaController {
  @Get('/eb')
  getPsina(): string {
    return 'poshel nahui';
  }
}
