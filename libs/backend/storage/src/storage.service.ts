import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || 'hirenova-resumes';
    this.region = process.env.AWS_S3_REGION || 'us-east-1';

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async generatePresignedUrl(
    fileName: string,
    mimeType: string,
    fileSize?: number,
  ): Promise<{ presignedUrl: string; fileUrl: string; expiresIn: number }> {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException(
        'Invalid file type. Only PDF, DOC, and DOCX files are allowed.',
      );
    }

    if (fileSize && fileSize > 10 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds 10MB limit.');
    }

    const key = `resumes/${Date.now()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: mimeType,
    });

    const expiresIn = 3600;
    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn,
    });

    const fileUrl = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

    return {
      presignedUrl,
      fileUrl,
      expiresIn,
    };
  }
}
