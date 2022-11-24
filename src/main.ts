import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { EnvironmentEnum } from './common/enums/environment.enum';
import { LogLevelEnum } from './common/enums/log-level.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
        ? [LogLevelEnum.LOG, LogLevelEnum.WARN, LogLevelEnum.ERROR]
        : [
            LogLevelEnum.LOG,
            LogLevelEnum.DEBUG,
            LogLevelEnum.VERBOSE,
            LogLevelEnum.WARN,
            LogLevelEnum.ERROR,
          ],
  });

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
