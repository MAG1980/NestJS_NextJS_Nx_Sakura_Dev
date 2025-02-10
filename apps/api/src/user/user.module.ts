import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/User.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
