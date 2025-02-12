/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import * as process from 'node:process'
import { EntityNotFoundFilter } from './filters/entity-not-found.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  app.useGlobalFilters(new EntityNotFoundFilter())

  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT || 3000

  console.log('DB_URL=', process.env.DB_URL)

  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )
}

bootstrap()
