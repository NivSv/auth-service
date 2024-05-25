import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpCode,
    Inject,
    Req,
    Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    @Inject(AuthService) private readonly authService!: AuthService
    @Inject(JwtService) private readonly jwtService!: JwtService

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() response: Response) {
        const user = await this.authService.login(
            loginDto.username,
            loginDto.password
        )
        const payload = { sub: user.id, username: user.username }
        const access_token = await this.jwtService.signAsync(payload)
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        })
        response.cookie('act', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 6000 /* 60s */,
        })
        response.cookie('rft', refresh_token, {
            httpOnly: true,
            secure: false,
            maxAge: 604800000 /* 7d */,
            path: '/auth/refresh',
        })
        response.status(200).send()
    }

    @Post('refresh')
    async refresh(@Req() request: Request, @Res() response: Response) {
        const refresh_token = request.cookies['rft']
        const payload = await this.jwtService.verifyAsync(refresh_token)
        const access_token = await this.jwtService.signAsync(payload)
        response.cookie('act', access_token, {
            httpOnly: true,
            secure: false,
            maxAge: 6000 /* 60s */,
        })
        response.status(200).send()
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Res() response: Response) {
        response.clearCookie('act')
        response.clearCookie('rft')
        response.send()
    }
}
