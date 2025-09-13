import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EnvironmentVariables {
    APP_NAME: string;
}

@Injectable()
export class AppService {
    constructor(private configService: ConfigService<EnvironmentVariables>) {}

    getHello(): string {
        return (
            'Hello World! App: ' + this.configService.get<string>('APP_NAME')
        );
    }
}
