import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigins = configService.get<string[]>('cors.origins') as string[];

  // Middleware for security purpose
  app.use(helmet());

  // Applying CORs middleware to whitelist all external URLs that can access the APIs.
  app.enableCors({
    origin: corsOrigins, // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Use the versioning in the API.
  app.enableVersioning();

  // Accessing the PORT from .env variables.
  const port = configService.get<number>('port') as number;

  await app.listen(port);
}

bootstrap();
