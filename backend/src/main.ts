import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AllExceptionsFilter } from './shared/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for frontend
  const corsOrigins = configService.get<string[]>('cors.origins');
  app.use(helmet());
  app.enableCors({
    origin: true, 
    methods: 'GET,POST,PATCH,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = configService.get<number>('port');
  await app.listen(port || 6002);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
