import { DataSource } from 'typeorm'
import connectionOptionsConfig from './connectionOptions.config'

export default new DataSource({ ...connectionOptionsConfig })
