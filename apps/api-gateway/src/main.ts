import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API Gateway documentation for all microservices')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-tenant-id',
        in: 'header',
        description: 'Tenant ID for multi-tenancy',
      },
      'tenant-id',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'API Gateway Documentation',
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: 'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css',
  });

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway running on http://localhost:${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`,
  );
}

bootstrap();
