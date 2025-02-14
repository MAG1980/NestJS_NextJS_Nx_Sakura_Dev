import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
//Будет вызывать JWTStrategy, т.к. в AuthGuard передано значение 'jwt'.
export class GqlJwtGuard extends AuthGuard('jwt') {
  //По умолчанию ExecutionContext - HttpContext.
  getRequest(context: ExecutionContext) {
    //Преобразование контекста HTTP в контекст GraphQL
    const ctx = GqlExecutionContext.create(context)
    //Возвращаем объект запроса, извлечённый из контекста GraphQL.
    return ctx.getContext().req
  }
}
