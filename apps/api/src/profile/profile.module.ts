import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Profile } from './entities/Profile.entity'

@Module({ imports: [TypeOrmModule.forFeature([Profile])] })
export class ProfileModule {}
