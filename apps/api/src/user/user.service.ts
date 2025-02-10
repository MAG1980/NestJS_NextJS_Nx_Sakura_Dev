import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/User.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      //Использование отношений в данном случае неоптимально.
      // Из БД всегда будут выбираться все поля, даже если они не требуются.
      relations: ['profile', 'posts'],
    })
  }
}
