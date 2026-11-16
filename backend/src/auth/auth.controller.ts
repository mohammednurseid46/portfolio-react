import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in as the administrator' })
  @ApiResponse({ status: 201, description: 'Returns a JWT access token.' })
  @ApiResponse({ status: 401, description: 'Invalid username or password.' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated administrator' })
  @ApiResponse({ status: 200, description: 'Authenticated administrator details.' })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  me(@Req() request: Request & { user: { sub: string } }) {
    return this.auth.me(request.user);
  }
}
