import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { SignUpInput } from './dto/sign-up.input'
import { hash, verify } from 'argon2'
import { User } from '../user/entities/User.entity'
import { SignInInput } from './dto/sign-in.input'
import { JwtPayload } from './types/jwt-payload'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const hashedPassword = await hash(signUpInput.password)
    return this.userService.createUser({
      ...signUpInput,
      password: hashedPassword,
    })
  }

  async validateLocalUser({ email, password }: SignInInput) {
    const localUser = await this.userService.findOneByEmail(email)

    //Нужно обязательно дождаться разрешения Promise. Иначе isPasswordValid всегда будет true.
    const isPasswordValid = await verify(localUser.password, password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return localUser
  }

  async generateToken(userId: number) {
    const payload: JwtPayload = {
      sub: {
        userId,
      },
    }

    //signAsync будет использовать значения переменных окружения, указанные в настройках AuthModule (JwtModule)
    const accessToken = await this.jwtService.signAsync(payload)
    return { accessToken }
  }

  async signIn(user: User) {
    const { accessToken } = await this.generateToken(user.id)
    return {
      userId: user.id,
      role: user.role,
      accessToken,
    }
  }
}
