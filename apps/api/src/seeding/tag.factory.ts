import { Tag } from '../tag/entities/tag.entity'
import { setSeederFactory } from 'typeorm-extension'
import { Faker, ru } from '@faker-js/faker'

export const tagFactory = setSeederFactory(Tag, (faker) => {
  const ruFaker = new Faker({ locale: [ru] })
  const tag = new Tag()
  tag.name = ruFaker.lorem.word()
  return tag
})
