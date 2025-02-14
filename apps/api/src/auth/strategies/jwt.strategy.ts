import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'
import { JwtPayload } from '../types/jwt-payload'
import { JwtUser } from '../types/jwt-user'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      //Извлекать токен из заголовка Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      //Блокировать доступ, если время жизни токена истекло
      ignoreExpiration: false,
    })
  }

  //"Под капотом" происходит валидация токена и извлечение из него полезной нагрузки.
  //Если JWT-токен не валиден, то запрос блокируется
  //Если JWT-токен валиден,
  // то метод validate в параметре payload примет данные, извлечённые из токена.
  // Данные, возвращаемые методом validate,
  // будут автоматически добавлены в объект Request в виде свойства Request.user.
  async validate(payload: JwtPayload): Promise<JwtUser> {
    const { userId } = payload.sub
    const jwtUser = await this.authService.validateJwtUser(userId)

    return jwtUser
  }
}
