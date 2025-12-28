import { Module } from '@nestjs/common';
import {
  AuthController,
  UserController,
  ProfileController,
  StorageController,
  TenantController,
  CustomFieldsController,
  JobController,
  ApplicationController,
  CompanyController,
  AuditController,
  SearchController,
  NotificationController,
} from './controllers';

@Module({
  controllers: [
    AuthController,
    UserController,
    ProfileController,
    StorageController,
    TenantController,
    CustomFieldsController,
    JobController,
    ApplicationController,
    CompanyController,
    AuditController,
    SearchController,
    NotificationController,
  ],
})
export class SwaggerModule {}
