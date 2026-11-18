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
  @ApiOperation({ summary: 'Get public profile information' })
  @ApiResponse({ status: 200, description: 'Profile, links, roles, and contact email.' })
  get() { return this.profile.get(); }

  @Get('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get editable administrator and public profile settings' })
  admin(@Req() request: Request & { user: { sub: string } }) {
    return this.profile.getAdmin(request.user);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update administrator credentials and public profile settings' })
  @ApiResponse({ status: 200, description: 'Profile and account settings updated.' })
  update(@Req() request: Request & { user: { sub: string } }, @Body() dto: UpdateProfileDto) {
    return this.profile.update(request.user, dto);
  }
}
