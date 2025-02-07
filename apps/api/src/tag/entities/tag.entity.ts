import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Post } from '../../post/entities/post.entity'

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[]
}
