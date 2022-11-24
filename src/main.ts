import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const port = parseInt(configService.get('APP_PORT'));

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Chat App Backend')
    .setDescription('Chat App API description')
    .setVersion('1.0')
    .addTag('CAB')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}
bootstrap();
