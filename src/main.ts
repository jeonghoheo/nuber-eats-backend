import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // DTO 유효성 검사를 위한 파이프 추가
  app.useGlobalPipes(new ValidationPipe());
  app.use(JwtMiddleware);
  await app.listen(3000);
}
bootstrap();
