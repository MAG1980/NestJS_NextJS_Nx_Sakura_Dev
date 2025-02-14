import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { User } from './entities/User.entity'
import { UserService } from './user.service'
import { GqlJwtGuard } from '../auth/guards/gql-jwt.guard'
import { UseGuards } from '@nestjs/common'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  //Если не указать имя запроса, то оно будет совпадать с названием метода.
  @UseGuards(GqlJwtGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @UseGuards(GqlJwtGuard)
  @Query(() => User, { name: 'getUser' })
  //nullable: true - значение по умолчанию
  async getUser(@Args('id', { type: () => Int, nullable: true }) id: number) {
    return this.userService.findOneByIdOrFail(id)
  }

  //Универсальный способ разрешения свойств сущности при ленивой загрузке
  @ResolveField('profile')
  //Название метода должно совпадать с названием свойства сущности
  async profile(@Parent() user: User) {
    return await user.profile
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.removeUser(id)
  }
}
