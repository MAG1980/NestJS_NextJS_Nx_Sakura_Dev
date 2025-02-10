import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from '../../post/entities/Post.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity({ name: 'tags' })
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Promise<Post[]>
}
