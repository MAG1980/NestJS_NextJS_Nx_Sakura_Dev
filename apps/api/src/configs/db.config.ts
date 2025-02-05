import { registerAs } from '@nestjs/config'

import { CockroachConnectionOptions } from 'typeorm/driver/cockroachdb/CockroachConnectionOptions'
import connectionOptionsConfig from './connectionOptions.config'

export default registerAs(
  'dbConnectionConfig',
  (): CockroachConnectionOptions =>
    // ({ ...typeormConfig } as CockroachConnectionOptions),
    {
      console.log(connectionOptionsConfig)
      return { ...connectionOptionsConfig }
    },
)
