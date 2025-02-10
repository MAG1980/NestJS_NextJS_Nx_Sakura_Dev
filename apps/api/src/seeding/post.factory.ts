import { Post } from '../post/entities/Post.entity'
import { setSeederFactory } from 'typeorm-extension'
import { Faker, ru } from '@faker-js/faker'

export const postFactory = setSeederFactory(Post, (faker) => {
  const ruFaker = new Faker({ locale: [ru] })
  const post = new Post()
  post.title = ruFaker.lorem.sentence()
  post.content = ruFaker.lorem.paragraph()
  return post
})
