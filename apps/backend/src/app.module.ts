import { Module } from '@nestjs/common'
import { HealthModule } from '@niv/health'
import { AuthModule } from './auth/auth.module'
import { ZodValidationPipe } from 'nestjs-zod'
import { APP_PIPE } from '@nestjs/core'

@Module({
    imports: [HealthModule, AuthModule],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
1
