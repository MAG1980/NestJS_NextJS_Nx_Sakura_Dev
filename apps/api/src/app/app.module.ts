import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import dbConfig from '../configs/db.config'
import { UserModule } from '../user/user.module'
import { ProfileModule } from '../profile/profile.module'
import { PostModule } from '../post/post.module'
import { TagModule } from '../tag/tag.module'

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
    UserModule,
    ProfileModule,
    PostModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //Объекты TypeORM DataSource и EntityManager будут доступны для внедрения во всём проекте
  constructor(private readonly dataSource: DataSource) {}
}
