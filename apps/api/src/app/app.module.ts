import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import dbConfig from '../configs/db.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.local',
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync(dbConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //Объекты TypeORM DataSource и EntityManager будут доступны для внедрения во всём проекте
  constructor(private readonly dataSource: DataSource) {}
}
