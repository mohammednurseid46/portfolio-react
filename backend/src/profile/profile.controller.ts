import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Controller('profile')
@ApiTags('About')
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'Get public profile information', description: 'Requires no request body or authentication. Returns the public profile as JSON.' })
  @ApiResponse({ status: 200, description: 'JSON profile object containing name, email, phone, tagline, intro, social links, and roles.' })
  get() { return this.profile.get(); }

  @Get('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get editable administrator and public profile settings', description: 'Accepts a bearer token and returns private editable profile and administrator settings as JSON.' })
  @ApiResponse({ status: 200, description: 'JSON administrator profile and settings object.' })
  admin(@Req() request: Request & { user: { sub: string } }) {
    return this.profile.getAdmin(request.user);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update administrator credentials and public profile settings', description: 'Accepts a bearer token and a JSON object containing any subset of profile fields. Password changes require the current password and a new password.' })
  @ApiResponse({ status: 200, description: 'JSON object containing the updated profile and account settings.' })
  update(@Req() request: Request & { user: { sub: string } }, @Body() dto: UpdateProfileDto) {
    return this.profile.update(request.user, dto);
  }
}
