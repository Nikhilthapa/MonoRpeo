import { Controller, Post, Body } from '@nestjs/common';
import { StorageService } from '@hirenova/storage';
import { PresignedUrlDto } from './dto/presigned-url.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('presigned-url')
  async generatePresignedUrl(@Body() presignedUrlDto: PresignedUrlDto) {
    return this.storageService.generatePresignedUrl(
      presignedUrlDto.fileName,
      presignedUrlDto.mimeType,
      presignedUrlDto.fileSize,
    );
  }
}
