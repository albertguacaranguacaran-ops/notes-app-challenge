import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors();

  // Set global prefix
  // app.setGlobalPrefix('api'); // Let's keep it simple for now as requirements didn't specify api/v1

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip properties not in DTO
    transform: true, // auto-transform payloads to DTO instances
  }));

  await app.listen(3000);
}
bootstrap();
