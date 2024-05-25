import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { DrizzleModule } from '../drizzle/drizzle.module'
import { JwtModule } from '@nestjs/jwt'
import { Constants } from '@niv/constants'

@Module({
    imports: [
        DrizzleModule,
        JwtModule.register({
            global: true,
            secret: Constants.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
