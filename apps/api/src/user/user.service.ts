import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/User.entity'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'

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

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id })
  }

  async createUser(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput)

    return await this.userRepository.save(newUser)
  }
}
