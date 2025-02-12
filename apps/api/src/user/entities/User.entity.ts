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

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  //Для строковых полей не требуется указывать тип GraphQL
  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  email: string

  //Возвращать пароль не планируется, поэтому декоратор @Field() не требуется
  @Column({ select: false, nullable: true })
  password: string

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
