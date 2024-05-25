import { Constants } from '@niv/constants'

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './drizzle-artifacts',
    dialect: 'mysql',
    dbCredentials: {
        url: Constants.DATABASE_URL,
    },
})
