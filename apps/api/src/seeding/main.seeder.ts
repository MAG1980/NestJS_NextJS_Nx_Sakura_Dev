import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { faker } from '@faker-js/faker'
import { Tag } from '../tag/entities/Tag.entity'
import { User } from '../user/entities/User.entity'
import { Profile } from '../profile/entities/Profile.entity'
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
      Array(3)
        .fill('')
        .map(async () => {
          //make - создание экземпляра сущности с дополнительными свойствами
          const user = await userFactory.make({
            //Вызов profileFactory пришлось обернуть в Promise, т.к. User.profile имеет тип Promise<Profile>
            profile: Promise.resolve(
              //Создаёт, сохраняет в БД и возвращает созданную сущность
              await profileFactory.save(),
            ),
          })

          return user
        }),
    )

    const userRepository = dataSource.getRepository(User)
    await userRepository.save(users)

    console.log('Seeding posts...')
    const postFactory = seederFactoryManager.get(Post)
    const posts = await Promise.all(
      Array(15)
        .fill('')
        .map(async () => {
          const post = await postFactory.make({
            user: Promise.resolve(faker.helpers.arrayElement(users)),
            tags: Promise.resolve(
              faker.helpers.arrayElements(
                tags,
                faker.number.int({ min: 0, max: 2 }),
              ),
            ),
          })

          return post
        }),
    )

    const postRepository = dataSource.getRepository(Post)
    await postRepository.save(posts)
  }
}
