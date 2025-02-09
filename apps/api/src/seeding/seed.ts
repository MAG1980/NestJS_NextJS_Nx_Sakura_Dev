import { DataSource, DataSourceOptions } from 'typeorm'
import { runSeeders, SeederOptions } from 'typeorm-extension'
import connectionOptionsConfig from '../configs/connectionOptions.config'
import { userFactory } from './user.factory'
import { profileFactory } from './profile.factory'
import { tagFactory } from './tag.factory'
import { postFactory } from './post.factory'
import { MainSeeder } from './main.seeder'
import * as process from 'node:process'

const options: DataSourceOptions & SeederOptions = {
  ...connectionOptionsConfig,
  factories: [userFactory, profileFactory, postFactory, tagFactory],
  seeds: [MainSeeder],
}

const dataSource = new DataSource(options)
dataSource.initialize().then(async () => {
  //Синхронизация БД с сущностями в приложении.
  await dataSource.synchronize(true)
  await runSeeders(dataSource)
  process.exit()
})
