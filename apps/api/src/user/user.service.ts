import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/User.entity'
import { Repository } from 'typeorm'
import { SignUpInput } from '../auth/dto/sign-up.input'
import { Role } from './enums/role.enum'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository
      .find
      /*      {
      //Использование отношений в данном случае неоптимально.
      // Из БД всегда будут выбираться все поля, даже если они не требуются.
      //relations: ['profile', 'posts'],
    }*/
      ()
  }

  async findOneByIdOrFail(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id })
  }

  async createUser(createUserInput: SignUpInput) {
    const newUser = this.userRepository.create({
      ...createUserInput,
      role: Role.USER,
    })

    return await this.userRepository.save(newUser)
  }

  async removeUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id)
    return result.affected === 1
  }

  async findOneByEmail(email: string) {
    //Если пользователь не будет найден, то будет выброшено исключение.
    return await this.userRepository.findOneOrFail({
      where: { email },
      select: ['id', 'password', 'role'],
    })
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    const user = new User()
    const partialUser = this.userRepository.merge(
      user,
      { id },
      { ...updateUserInput },
    )

    return await this.userRepository.save(partialUser)
  }
}
