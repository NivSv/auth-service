import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { DRIZZLE_PROVIDER } from '../drizzle/drizzle.module'
import * as schema from '../drizzle/schema'
import { MySql2Database } from 'drizzle-orm/mysql2'
import * as bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

@Injectable()
export class AuthService {
    @Inject(DRIZZLE_PROVIDER) private readonly db!: MySql2Database<
        typeof schema
    >

    async login(username: string, password: string) {
        const foundUser = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.username, username))
        if (!foundUser[0]) {
            throw new UnauthorizedException(
                'username or password is incorrect!'
            )
        }
        const isMatch = await bcrypt.compare(
            password,
            foundUser[0].passwordHash
        )
        if (!isMatch) {
            throw new UnauthorizedException(
                'username or password is incorrect!'
            )
        }
        return foundUser[0]
    }
}
