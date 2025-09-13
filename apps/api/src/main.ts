import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap().catch((err: unknown) => {
    const logger = new Logger('Bootstrap');

    if (err instanceof Error) {
        logger.error(`App failed to start: ${err.message}`, err.stack);
    } else {
        logger.error(`App failed to start: ${String(err)}`);
    }
    process.exit(1);
});
