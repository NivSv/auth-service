import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Constants } from '@niv/constants'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const logger = new Logger('bootstrap')

    // Security middlewares
    app.use(helmet())
    app.enableCors()

    // Start the application
    await app.listen(Constants.BACKEND_PORT)
    logger.log(`Application is running on: ${await app.getUrl()} 🚀`)
}
bootstrap()
