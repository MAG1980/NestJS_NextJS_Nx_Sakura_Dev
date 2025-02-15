import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Role } from '../../user/enums/role.enum'
import { ROLES_KEY } from '../constants'

@Injectable()
//Свойство user добавляется в Request JwtStrategy, которая вызывается JwtGuard,
// поэтому @UseGuards(RoleGuard) следует добавлять только к обработчикам,
// декорированным @UseGuards(JwtGuard)
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      //Указываем ключ, по которому необходимо искать метаданные.
      ROLES_KEY,
      //Ищем требуемы роли в декораторе обработчика запроса. Если их там нет, ищем их в декораторе резолвера или контроллера.
      [context.getHandler(), context.getClass()],
    )

    //Если особые роли для доступа к запросу не требуются, возвращаем true (разрешаем запрос).
    if (!requiredRoles) {
      return true
    }

    //Переключаем контекст с HTTP на GraphQL.
    const gqlContext = GqlExecutionContext.create(context)

    //Свойство user добавляется в Request JwtStrategy, которая вызывается JwtGuard,
    // поэтому @UseGuards(RoleGuard) следует добавлять только к обработчикам,
    // декорированным @UseGuards(JwtGuard)
    const userRole = gqlContext.getContext().req.user.role

    //Если у пользователя есть хотя бы одна из требуемых ролей - разрешаем запрос.
    const userHasRequiredRole = requiredRoles.some((role) => role === userRole)
    return userHasRequiredRole
  }
}
