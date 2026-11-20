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
  @ApiOperation({ summary: 'Log in as the administrator', description: 'Accepts a JSON username and password and returns a bearer token for protected endpoints.' })
  @ApiResponse({ status: 201, description: 'JSON authentication response containing a JWT `access_token` string.' })
  @ApiResponse({ status: 401, description: 'Invalid username or password.' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated administrator', description: 'Accepts an `Authorization: Bearer <token>` header and returns the current administrator account.' })
  @ApiResponse({ status: 200, description: 'JSON administrator object containing the account identifier and username.' })
  @ApiResponse({ status: 401, description: 'Missing or invalid bearer token.' })
  me(@Req() request: Request & { user: { sub: string } }) {
    return this.auth.me(request.user);
  }
}
