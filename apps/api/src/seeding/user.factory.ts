import { setSeederFactory } from 'typeorm-extension'
import { User } from '../user/entities/user.entity'
import { Role } from '../user/enums/role.enum'
import { Faker, ru } from '@faker-js/faker'

export const userFactory = setSeederFactory(User, (faker) => {
  const ruFaker = new Faker({ locale: [ru] })
  const user = new User()
  user.name = ruFaker.person.firstName()
  user.email = ruFaker.internet.email()
  user.role = ruFaker.helpers.arrayElement([...Object.values(Role)])
  return user
})
