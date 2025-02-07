import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Post } from '../../post/entities/post.entity'
import { Profile } from '../../profile/entities/profile.entity'
import { Role } from '../enums/role.enum'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[]
}
