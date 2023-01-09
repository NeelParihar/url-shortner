import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import { ShortUrl } from './entities/ShortUrl.entity'

export const connect = async(): Promise<Connection> => {
  let options: ConnectionOptions = {
    type: 'postgres',
    username: 'urladmin',
    password: 'urladmin',
    database: 'urlshortner',
    logging: 'all',
    logger: 'advanced-console',
    entities: [ShortUrl],
    synchronize: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: ['error'],
      logger: 'simple-console',
      entities: [ShortUrl],
      synchronize: true,
    }
  }

  return await createConnection(options)
}