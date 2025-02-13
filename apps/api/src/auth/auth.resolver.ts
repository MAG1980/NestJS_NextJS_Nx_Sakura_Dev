import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../user/entities/User.entity'
import { SignUpInput } from './dto/sign-up.input'
import { AuthService } from './auth.service'
import { AuthPayload } from './entities/auth.payload'
import { SignInInput } from './dto/sign-in.input'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.authService.signUp(signUpInput)
  }

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput)

    return await this.authService.signIn(user)
  }
}
