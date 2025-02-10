import { CockroachConnectionOptions } from 'typeorm/driver/cockroachdb/CockroachConnectionOptions'

export default {
  url: process.env.DB_URL,
  type: 'cockroachdb',
  ssl: true,
  timeTravelQueries: false,
  //Без этой опции не работает приложение
  autoLoadEntities: true,
  //Без этой опции не работают посев данных и миграции
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  // synchronize: true,
  logging: true,
} as CockroachConnectionOptions
