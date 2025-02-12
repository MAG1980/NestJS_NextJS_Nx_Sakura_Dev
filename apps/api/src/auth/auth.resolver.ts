import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../user/entities/User.entity'
import { CreateUserInput } from '../user/dto/create-user.input'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('signUpInput') signUpInput: CreateUserInput): Promise<User> {
    return this.authService.signUp(signUpInput)
  }
}
