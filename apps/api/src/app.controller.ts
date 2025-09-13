import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): { message: string } {
        return { message: this.appService.getHello() };
    }

    @Get('/healthz')
    healthz(): { status: string } {
        return { status: 'OK' };
    }

    @Get('/readyz')
    readyz(): { status: string } {
        return { status: 'OK' };
    }
}
