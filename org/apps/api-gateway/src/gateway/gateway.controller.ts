import { Controller, All, Req, Res, Headers, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';

@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @All('*')
  @HttpCode(200)
  async proxy(@Req() req: Request, @Res() res: Response, @Headers('x-tenant-id') tenantId?: string) {
    return this.gatewayService.route(req, res, tenantId);
  }
}
