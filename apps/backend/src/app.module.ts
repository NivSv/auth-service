import { Module } from '@nestjs/common'
import { HealthModule } from '@niv/health'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [HealthModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
1
