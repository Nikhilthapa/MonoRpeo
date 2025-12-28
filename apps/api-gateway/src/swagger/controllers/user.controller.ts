import { Controller, Get, Put, Param, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve user information by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getUser(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user', description: 'Update user information' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }

  @Get(':id/profile-status')
  @ApiOperation({ 
    summary: 'Get profile status', 
    description: 'Get user profile verification status and completion info' 
  })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Profile status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        email: { type: 'string' },
        profileStatus: { type: 'string', enum: ['PENDING_REVIEW', 'APPROVED', 'REJECTED'] },
        emailVerified: { type: 'boolean' },
        profileComplete: {
          type: 'object',
          properties: {
            hasJobFunction: { type: 'boolean' },
            hasLocation: { type: 'boolean' },
            hasExperience: { type: 'boolean' },
            hasSalary: { type: 'boolean' },
            hasResume: { type: 'boolean' },
          },
        },
        resumeCount: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
  @ApiHeader({ name: 'x-tenant-id', required: false, description: 'Tenant ID' })
  async getProfileStatus(
    @Param('id') id: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return { message: 'This endpoint is proxied to the auth service' };
  }
}
