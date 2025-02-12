import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql'

//Данный фильтр будет перехватывать сообщения типа EntityNotFoundError,
//которые генерируются TypeORM
//Фильтр должен реализовать интерфейс GqlExceptionFilter (по умолчанию (для REST) - ExceptionFilter),
//т.к. он предназначен для работы с GraphQL.
//Фильтр исключений будет отслеживать произошедшие ошибки типа EntityNotFoundError
//и преобразовывать их в ошибки типа NotFoundException.
//Он будет работать в любом месте приложения.
//Для этого его необходимо зарегистрировать в main.ts с помощью .useGlobalFilters.
@Catch(EntityNotFoundError)
export class EntityNotFoundFilter<EntityNotFoundError>
  implements GqlExceptionFilter
{
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    GqlArgumentsHost.create(host)
    return new NotFoundException('Entity not found')
  }
}
