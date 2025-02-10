import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../user/entities/User.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  bio: string

  @Field()
  @Column()
  avatar: string

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user: User
}
