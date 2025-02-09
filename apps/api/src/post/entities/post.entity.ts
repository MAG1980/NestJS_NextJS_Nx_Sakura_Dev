import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Tag } from '../../tag/entities/tag.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  content: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'posts_tags',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[]
}
