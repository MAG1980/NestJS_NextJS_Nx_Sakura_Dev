import { registerAs } from '@nestjs/config'

import { CockroachConnectionOptions } from 'typeorm/driver/cockroachdb/CockroachConnectionOptions'

export default registerAs(
  'dbConnectionConfig',
  (): CockroachConnectionOptions => ({
    url: process.env.DB_URL,
    type: 'cockroachdb',
    ssl: true,
    timeTravelQueries: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  }),
)
