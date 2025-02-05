import { DataSource } from 'typeorm'
import connectionOptionsConfig from './configs/connectionOptions.config'

export default new DataSource({ ...connectionOptionsConfig })
