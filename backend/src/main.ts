import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedApp: any;

async function createNestServer(expressApp: express.Application) {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    const configService = app.get(ConfigService);

    // Enable CORS for frontend
    const corsOrigins = configService.get<string[]>('cors.origins');
    app.use(helmet());
    app.enableCors({
      origin: corsOrigins || true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));

    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

// For Vercel serverless
export default async function handler(req: any, res: any) {
  const expressApp = express();
  const app = await createNestServer(expressApp);
  return app.getHttpAdapter().getInstance()(req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Enable CORS for frontend
    const corsOrigins = configService.get<string[]>('cors.origins');
    app.use(helmet());
    app.enableCors({
      origin: corsOrigins || true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));

    const port = configService.get<number>('port');
    await app.listen(port || 6002);
    console.log(`Application is running on: http://localhost:${port}`);
  }
  bootstrap();
}
