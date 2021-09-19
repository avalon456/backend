import 'reflect-metadata'
import { ConnectionOptions, createConnection } from 'typeorm'
import { database, databaseType, isProduction } from '@/config'
import { join } from 'path'
import { TheNamingStrategy } from '@/helpers/typeorm-utils'
import { clone, merge } from '@/helpers/object-utils'
import { readFileSync } from 'fs'

export const connectionOptions: ConnectionOptions = {
    type: databaseType as any,
    url: database,
    entities: [
        join(__dirname, '../models/**/*.{ts,js}')
    ],
    migrations: [
        join(__dirname, '../migrations/*.{ts,js}')
    ],
    logging: isProduction ? ['migration', 'warn', 'error'] : true,
    namingStrategy: new TheNamingStrategy(),
    // ssl: {
    //     ca: readFileSync('./dist/src/ca_cert.cer').toString()
    // }
}

export default async function typeOrmLoader (connOptions: Partial<ConnectionOptions> = {}): Promise<void> {
    const conn = await createConnection(merge(clone(connectionOptions), connOptions))

    await conn.runMigrations()
}
