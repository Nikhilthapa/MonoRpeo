import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PresignedUrlDto } from '../dto/profile.dto';

@ApiTags('Storage')
@Controller('api/storage')
export class StorageController {
  @Post('presigned-url')
  @ApiOperation({
    summary: 'Generate presigned URL',
    description: 'Generate a presigned S3 URL for uploading resume files',
  })
  @ApiBody({ type: PresignedUrlDto })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL generated successfully',
    schema: {
      type: 'object',
      properties: {
        presignedUrl: { type: 'string', example: 'https://s3.amazonaws.com/...' },
        fileUrl: { type: 'string', example: 'https://bucket.s3.region.amazonaws.com/resumes/...' },
        expiresIn: { type: 'number', example: 3600 },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  async generatePresignedUrl(@Body() presignedUrlDto: PresignedUrlDto) {
    return { message: 'This endpoint is proxied to the auth service' };
  }
}
