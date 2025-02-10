import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { User } from './entities/User.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  //Если не указать имя запроса, то оно будет совпадать с названием метода.
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }

  @Query(() => User, { name: 'getUser' })
  //nullable: true - значение по умолчанию
  async getUser(@Args('id', { type: () => Int, nullable: true }) id: number) {
    return this.userService.findOneById(id)
  }

  //Универсальный способ разрешения свойств сущности при ленивой загрузке
  @ResolveField('profile')
  //Название метода должно совпадать с названием свойства сущности
  async profile(@Parent() user: User) {
    return await user.profile
  }
}
