import { CockroachConnectionOptions } from 'typeorm/driver/cockroachdb/CockroachConnectionOptions'

export default {
  url: process.env.DB_URL,
  type: 'cockroachdb',
  ssl: true,
  timeTravelQueries: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
} as CockroachConnectionOptions
