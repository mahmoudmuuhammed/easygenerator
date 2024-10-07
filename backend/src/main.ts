import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Use the versioning in the API.
  app.enableVersioning();

  await app.listen(8000);
}
bootstrap();
