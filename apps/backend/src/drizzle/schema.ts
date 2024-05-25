import {
    index,
    mysqlEnum,
    mysqlTable,
    serial,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
    'users',
    {
        id: serial('id').primaryKey(),
        username: varchar('username', { length: 50 }).unique(),
        passwordHash: varchar('password_hash', { length: 255 }),
        passwordSalt: varchar('password_salt', { length: 255 }),
        createAt: timestamp('create_at', { mode: 'date' }).default(new Date()),
        updateAt: timestamp('update_at', { mode: 'date' }).$onUpdate(
            () => new Date()
        ),
        lastLogin: timestamp('last_login', { mode: 'date' }),
        status: mysqlEnum('status', ['active', 'suspended', 'deleted']),
    },
    (table) => {
        return {
            usernameIdx: index('username_idx').on(table.username),
        }
    }
)
