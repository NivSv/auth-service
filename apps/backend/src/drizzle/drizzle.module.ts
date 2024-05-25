import { Logger, Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from './schema'
import { Constants } from '@niv/constants'
import { createConnection } from 'mysql2/promise'

export const DRIZZLE_PROVIDER = 'drizzleProvider'

@Module({
    providers: [
        {
            provide: DRIZZLE_PROVIDER,
            useFactory: async () => {
                const logger = new Logger(DRIZZLE_PROVIDER)
                const maxAttempts = 5
                const CONNECTION_URL = Constants.DATABASE_URL
                let attempts = 0
                let connection

                while (attempts < maxAttempts) {
                    try {
                        connection = await createConnection(CONNECTION_URL)
                        return drizzle(connection, { schema, mode: 'default' })
                    } catch (error) {
                        attempts++
                        logger.error(
                            `Failed to connect to MySQL. Retrying (${attempts}/${maxAttempts})...`,
                            error.stack,
                            'DrizzleModule'
                        )
                        await new Promise((resolve) =>
                            setTimeout(resolve, 2000)
                        ) // Wait for 2 seconds before retrying
                    }
                }

                throw new Error(
                    `Failed to connect to MySQL after ${maxAttempts} attempts`
                )
            },
        },
    ],
    exports: [DRIZZLE_PROVIDER],
})
export class DrizzleModule {}
