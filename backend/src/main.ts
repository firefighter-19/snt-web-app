import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('APP_PORT');
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:8080'],
    exposedHeaders: 'X-Auth-Token',
  });
  await app.listen(PORT || 3000, () =>
    console.log(`App was started on ${PORT} port`),
  );
}
bootstrap();
