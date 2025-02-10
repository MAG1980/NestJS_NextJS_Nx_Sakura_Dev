import { Profile } from '../profile/entities/Profile.entity'
import { setSeederFactory } from 'typeorm-extension'
import { Faker, ru } from '@faker-js/faker'

export const profileFactory = setSeederFactory(Profile, (faker) => {
  const ruFaker = new Faker({ locale: [ru] })
  const profile = new Profile()
  profile.bio = ruFaker.lorem.sentence()
  profile.avatar = ruFaker.image.avatar()
  return profile
})
