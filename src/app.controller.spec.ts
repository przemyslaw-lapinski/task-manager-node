import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';

describe('AppController', () => {
    let appController: AppController;
    let configService: ConfigService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
        configService = app.get(ConfigService);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toEqual({ message: 'Hello World! App: ' + configService.get<string>('APP_NAME')});
        });
    });

    describe('healthz', () => {
        it('should return status OK', () => {
            expect(appController.healthz()).toEqual({status: 'OK'});
        });
    });

    describe('readyz', () => {
        it('should return status OK', () => {
            expect(appController.readyz()).toEqual({status: 'OK'});
        });
    });
});
