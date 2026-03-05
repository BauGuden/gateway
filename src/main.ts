import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';


async function main() {

  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);


  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  await app.listen(envs.port);
  logger.log(`Gateway is running on port ${envs.port}`);
}
main();
