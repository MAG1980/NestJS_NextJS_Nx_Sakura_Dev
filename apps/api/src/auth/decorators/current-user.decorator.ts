import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    //Преобразование контекста HTTP в контекст GraphQL
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext().req.user
  },
)
