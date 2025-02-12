import { InputType, OmitType } from '@nestjs/graphql'
import { User } from '../entities/User.entity'

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['id', 'role', 'profile', 'posts'] as const,
  //это декоратор, который будет применен к `User` при отображении этого типа
  InputType,
) {}
