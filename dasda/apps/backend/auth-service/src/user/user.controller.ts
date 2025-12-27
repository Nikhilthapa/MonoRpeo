import { Controller, Get, Put, Param, Body, Headers, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string, @Headers('x-tenant-id') tenantId?: string) {
    return this.userService.getUser(id, tenantId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return this.userService.updateUser(id, updateDto, tenantId);
  }
}
