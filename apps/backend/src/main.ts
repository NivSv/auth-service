import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Constants } from '@niv/constants'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('bootstrap')

    app.use(cookieParser())

    // Security middlewares
    app.use(helmet())
    app.enableCors()
    if (!Constants.JWT_SECRET) {
        logger.error('JWT_SECRET is not defined')
        process.exit(1)
    }

    // Start the application
    await app.listen(Constants.BACKEND_PORT)
    logger.log(`Application is running on: ${await app.getUrl()} 🚀`)
}
bootstrap()
