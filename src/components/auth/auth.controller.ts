import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordRequest } from './dto/request/fotgot-password.request';
import { GetTokenRequest } from './dto/request/get-token.request';
import { UserLoginRequest } from './dto/request/user-login.request';
import { UserRegisterRequest } from './dto/request/user-register.request';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  public async register(@Body() request: UserRegisterRequest): Promise<any> {
    return this.authService.register(request);
  }

  @Post('login')
  async login(@Body() request: UserLoginRequest) {
    return this.authService.login(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: any) {
    return this.authService.getProfile(request);
  }

  @Post('token')
  getToken(@Body() request: GetTokenRequest) {
    return this.authService.getToken(request);
  }

  @Post('forgot-password')
  forgotPassword(@Body() request: ForgotPasswordRequest) {
    return this.authService.forgotPassword(request);
  }
}
