import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { InjectReply } from 'fastify';

describe('AppController (e2e)', () => {
  let app: INestApplication<NestFastifyApplication>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response: InjectReply = await app
      .getHttpAdapter()
      .getInstance()
      .inject({
        method: 'GET',
        url: '/',
      });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: expect.any(String) });
  });

  it('/healthz (GET)', async () => {
    const response: InjectReply = await app
      .getHttpAdapter()
      .getInstance()
      .inject({
        method: 'GET',
        url: '/healthz',
      });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'OK' });
  });

  it('/readyz (GET)', async () => {
    const response: InjectReply = await app
      .getHttpAdapter()
      .getInstance()
      .inject({
        method: 'GET',
        url: '/readyz',
      });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'OK' });
  });
});
