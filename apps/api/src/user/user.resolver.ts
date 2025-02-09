import { Query, Resolver } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  //Если не указать имя запроса, то оно будет совпадать с названием метода.
  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll()
  }
}
