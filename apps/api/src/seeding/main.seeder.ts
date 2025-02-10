import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { Tag } from '../tag/entities/Tag.entity'
import { User } from '../user/entities/User.entity'
import { Profile } from '../profile/entities/Profile.entity'
import { faker } from '@faker-js/faker'
import { Post } from '../post/entities/Post.entity'

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    seederFactoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Seeding tags...')
    const tagRepository = dataSource.getRepository(Tag)
    const tags = await tagRepository.save([
      { name: 'Excellent' },
      { name: 'Good' },
      { name: 'Bad' },
    ])

    console.log('Seeding users...')
    const userFactory = seederFactoryManager.get(User)
    const profileFactory = seederFactoryManager.get(Profile)

    const users = await Promise.all(
      //Преимущество перебора фейкового массива перед циклом for
      //является возможность добавлять несколько свойств асинхронно (одновременно)
      Array(20)
        .fill('')
        .map(async () => {
          //make - создание экземпляра сущности с дополнительными свойствами
          const user = await userFactory.make({
            //Создаёт, сохраняет в БД и возвращает созданную сущность
            profile: await profileFactory.save(),
          })

          return user
        }),
    )

    const userRepository = dataSource.getRepository(User)
    await userRepository.save(users)

    console.log('Seeding posts...')
    const postFactory = seederFactoryManager.get(Post)
    const posts = await Promise.all(
      Array(100)
        .fill('')
        .map(async () => {
          const post = await postFactory.make({
            user: faker.helpers.arrayElement(users),
            tags: faker.helpers.arrayElements(
              tags,
              faker.number.int({ min: 0, max: 2 }),
            ),
          })

          return post
        }),
    )

    const postRepository = dataSource.getRepository(Post)
    await postRepository.save(posts)
  }
}
