import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationController {
  @Get()
  @ApiOperation({ summary: 'Get notifications', description: 'Retrieve notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async getNotifications() {
    return { message: 'This endpoint is proxied to the notification service' };
  }
}
