import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Post } from '../../post/entities/Post.entity'
import { Profile } from '../../profile/entities/Profile.entity'
import { Role } from '../enums/role.enum'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsEmail, IsEnum, IsString } from 'class-validator'

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  //Для строковых полей не требуется указывать тип GraphQL
  @Field()
  @Column()
  name: string

  @IsEmail()
  @Field()
  @Column()
  email: string

  @Field({ nullable: true })
  @Column({ select: false, nullable: true })
  password: string

  @IsEnum(Role)
  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    lazy: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Promise<Profile>

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Promise<Post[]>
}
