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
import { UpdateUserInput } from './dto/update-user.input'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import type { JwtUser } from '../auth/types/jwt-user'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './enums/role.enum'
import { RoleGuard } from '../auth/guards/role.guard'

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

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(RoleGuard)
  //@UseGuards(GqlJwtGuard) следует располагать ближе к обработчику запроса,
  // чтобы он успел добавить свойство Request.user.role,
  //Потому что обработчик передаётся каждому декоратору в виде обратного вызова,
  // а первыми срабатывают декораторы, расположенные в коде ближе к обработчику.
  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  updateUser(
    @CurrentUser() user: JwtUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser(user.userId, updateUserInput)
  }
}
