import { DataSource } from 'typeorm'
import connectionOptionsConfig from './connectionOptions.config'

const appDataSource = new DataSource({ ...connectionOptionsConfig })
appDataSource.initialize()
export default appDataSource
