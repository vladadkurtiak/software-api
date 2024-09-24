import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  config();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const corsOptions: CorsOptions = { origin: process.env.CORS_OPTIONS_ORIGIN, credentials: true };

  app.enableCors(corsOptions);

  app.register(fastifyCookie, { secret: process.env.COOKIES_SECRET });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );

  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}
bootstrap();
