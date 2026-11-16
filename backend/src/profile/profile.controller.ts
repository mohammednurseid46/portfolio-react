import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ProfileService } from './profile.service';
@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}
  @Public() @Get()
  @ApiOperation({ summary: 'Get public profile information' })
  @ApiResponse({ status: 200, description: 'Profile, links, roles, and contact email.' })
  get() { return this.profile.get(); }
}
