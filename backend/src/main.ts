import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // forbidNonWhitelisted: true, // throws error on unknown fields
    }),
  );
  process.on('unhandledRejection', (reason, promise) => {
    console.log('UNHANDLED REJECTION AT:', promise);
    console.log('REASON:', reason);
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
