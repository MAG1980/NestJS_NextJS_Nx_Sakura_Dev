import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserInput } from '../user/dto/create-user.input'
import { hash } from 'argon2'
import { User } from '../user/entities/User.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpInput: CreateUserInput): Promise<User> {
    const hashedPassword = await hash(signUpInput.password)
    return this.userService.createUser({
      ...signUpInput,
      password: hashedPassword,
    })
  }
}
