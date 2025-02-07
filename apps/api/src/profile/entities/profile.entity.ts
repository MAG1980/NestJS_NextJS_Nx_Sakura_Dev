import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../user/entities/user.entity'

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  bio: string

  @Column()
  avatar: string

  @OneToOne(() => User, (user) => user.profile)
  user: User
}
