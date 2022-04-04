import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';
import { ResponseBuilder } from '@utils/response-builder';
import { UserRegisterRequest } from './dto/request/user-register.request';
import { JwtService } from '@nestjs/jwt';
import { UserLoginRequest } from './dto/request/user-login.request';
import { Cache } from 'cache-manager';
import { GetTokenRequest } from './dto/request/get-token.request';
import * as jwt from 'jsonwebtoken';
import { ResponseCodeEnum } from '@enums/response-code.enum';
import { ResponseMessageEnum } from '@enums/response-message.enum';
import { plainToClass } from 'class-transformer';
import { GetProfileResponse } from './dto/response/get-profile.response';
import { ForgotPasswordRequest } from './dto/request/fotgot-password.request';
import { sendOtp } from '@utils/send-sms';
import { jwtConstants } from '@config/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    private jwtService: JwtService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async register(request: UserRegisterRequest): Promise<any> {
    const userEntity = this.userRepository.createEntity(request);
    const user = await this.userRepository.save(userEntity);

    const token = this.jwtService.sign({ id: user.id });
    const refreshToken = user.getRefreshToken();

    await this.cacheManager.set(user.id.toString(), refreshToken, {
      ttl: 10000000,
    });

    return new ResponseBuilder({ token, refreshToken })
      .withCode(ResponseCodeEnum.CREATED)
      .build();
  }

  async login(request: UserLoginRequest) {
    const user = await this.userRepository.findOne({
      where: {
        phone: request.phone,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = user.comparePassword(request.password);

    if (!isMatch) {
      return new ResponseBuilder()
        .withMessage(ResponseMessageEnum.INVALID_USER)
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .build();
    }

    const token = this.jwtService.sign({ id: user.id });
    const refreshToken = user.getRefreshToken();
    await this.cacheManager.set(user.id.toString(), refreshToken, {
      ttl: 10000000,
    });

    return new ResponseBuilder({
      token,
      refreshToken,
      expired: jwtConstants.expiresIn,
    })
      .withMessage(ResponseMessageEnum.SUCCESS)
      .withCode(ResponseCodeEnum.SUCCESS)
      .build();
  }

  async getToken(request: GetTokenRequest) {
    try {
      const verify: any = jwt.verify(request.refreshToken, 'abcbacb');

      const check = await this.cacheManager.get(verify?.id);

      if (!check) {
        return new ResponseBuilder()
          .withMessage(ResponseMessageEnum.INVALID_REFRESH_TOKEN)
          .withCode(ResponseCodeEnum.BAD_REQUEST)
          .build();
      }

      const token = this.jwtService.sign({ id: verify?.id });

      return new ResponseBuilder({ token, expired: jwtConstants.expiresIn })
        .withMessage(ResponseMessageEnum.SUCCESS)
        .withCode(ResponseCodeEnum.SUCCESS)
        .build();
    } catch (error) {
      return new ResponseBuilder()
        .withMessage(ResponseMessageEnum.INVALID_REFRESH_TOKEN)
        .withCode(ResponseCodeEnum.SERVER_ERROR)
        .build();
    }
  }

  async getProfile(request: any) {
    const dataReturn = plainToClass(GetProfileResponse, request.user, {
      excludeExtraneousValues: true,
    });

    return new ResponseBuilder(dataReturn)
      .withMessage(ResponseMessageEnum.SUCCESS)
      .withCode(ResponseCodeEnum.SUCCESS)
      .build();
  }

  async validateUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    return null;
  }

  async forgotPassword(request: ForgotPasswordRequest) {
    const user = await this.userRepository.findOne({
      where: {
        phone: request.phone,
      },
    });

    if (!user) {
      return new ResponseBuilder()
        .withMessage(ResponseMessageEnum.PHONE_NOT_FOUND)
        .withCode(ResponseCodeEnum.NOT_FOUND)
        .build();
    }

    const otpCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const otpCodeExpired = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otpCode.toString();
    user.otpExpired = otpCodeExpired;

    await this.userRepository.save(user);

    await sendOtp(user.phone, otpCode.toString());

    return new ResponseBuilder()
      .withMessage(ResponseMessageEnum.SUCCESS)
      .withCode(ResponseCodeEnum.SUCCESS)
      .build();
  }
}
