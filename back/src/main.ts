import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT ?? 4001;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });
  app.setGlobalPrefix('/api');
  await app.listen(PORT);
  console.log(`server runs on http://localhost:${PORT}`);
}

bootstrap();
