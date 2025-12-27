-- CreateEnum
CREATE TYPE "PermissionScope" AS ENUM ('SYSTEM', 'COMPANY', 'VENDOR');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'PAUSED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'APPROVE', 'REJECT', 'PUBLISH', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CustomFieldType" AS ENUM ('TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SELECT', 'MULTI_SELECT', 'JSON');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "subscriptionPlan" TEXT,
    "subscriptionStatus" TEXT,
    "subscriptionStartDate" TIMESTAMP(3),
    "subscriptionEndDate" TIMESTAMP(3),
    "maxUsers" INTEGER DEFAULT 10,
    "maxJobs" INTEGER DEFAULT 100,
    "settings" JSONB,
    "features" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "changes" JSONB,
    "metadata" JSONB,
    "userId" TEXT,
    "userEmail" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "shortDescription" TEXT,
    "profileSummary" TEXT,
    "currentJobFunction" TEXT,
    "linkedInProfile" TEXT,
    "yearsOfExperience" TEXT,
    "preferredLocation" TEXT,
    "noticePeriod" TEXT,
    "preferredWorkModel" TEXT,
    "currentAnnualSalary" DECIMAL(10,2),
    "expectedAnnualSalary" DECIMAL(10,2),
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "systemRoleId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "system_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scope" "PermissionScope" NOT NULL DEFAULT 'SYSTEM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "proficiency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "employmentType" TEXT,
    "location" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "fieldOfStudy" TEXT,
    "location" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "grade" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "jobOverview" TEXT,
    "employmentType" TEXT,
    "workModel" TEXT,
    "location" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "numberOfOpenings" INTEGER NOT NULL DEFAULT 1,
    "experienceLevel" TEXT,
    "minExperience" INTEGER,
    "maxExperience" INTEGER,
    "educationRequirement" TEXT,
    "minSalary" DECIMAL(10,2),
    "maxSalary" DECIMAL(10,2),
    "currency" TEXT,
    "paymentType" TEXT,
    "noticePeriod" TEXT,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "JobStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_jobs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_skills" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "address" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "industry" TEXT,
    "companySize" TEXT,
    "workModel" TEXT,
    "gstin" TEXT,
    "linkedInUrl" TEXT,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "company_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_roles" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "company_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scope" "PermissionScope" NOT NULL DEFAULT 'COMPANY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendors" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "description" TEXT,
    "address" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "industry" TEXT,
    "vendorSize" TEXT,
    "workModel" TEXT,
    "gstin" TEXT,
    "linkedInUrl" TEXT,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "vendor_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_roles" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "vendor_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scope" "PermissionScope" NOT NULL DEFAULT 'VENDOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendor_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "entityType" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_steps" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "approverRoleId" TEXT,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "canSkip" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_instances" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "currentStepId" TEXT,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'PENDING',
    "startedBy" TEXT,
    "completedBy" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version_history" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "changes" JSONB NOT NULL,
    "changeType" TEXT NOT NULL,
    "changedBy" TEXT,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "version_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_fields" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT,
    "entityType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" "CustomFieldType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,
    "validationRules" JSONB,
    "options" JSONB,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "custom_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_field_values" (
    "id" TEXT NOT NULL,
    "customFieldId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "textValue" TEXT,
    "numberValue" DECIMAL(20,6),
    "dateValue" TIMESTAMP(3),
    "booleanValue" BOOLEAN,
    "jsonValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_field_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_email_key" ON "tenants"("email");

-- CreateIndex
CREATE INDEX "tenants_slug_idx" ON "tenants"("slug");

-- CreateIndex
CREATE INDEX "tenants_email_idx" ON "tenants"("email");

-- CreateIndex
CREATE INDEX "tenants_isActive_deletedAt_idx" ON "tenants"("isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_tenantId_createdAt_idx" ON "audit_logs"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_userId_createdAt_idx" ON "audit_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_action_createdAt_idx" ON "audit_logs"("action", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_systemRoleId_key" ON "users"("systemRoleId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_tenantId_isActive_deletedAt_idx" ON "users"("tenantId", "isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- CreateIndex
CREATE INDEX "users_archivedAt_idx" ON "users"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_email_key" ON "users"("tenantId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "system_roles_name_key" ON "system_roles"("name");

-- CreateIndex
CREATE INDEX "system_roles_deletedAt_idx" ON "system_roles"("deletedAt");

-- CreateIndex
CREATE INDEX "system_roles_archivedAt_idx" ON "system_roles"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "system_permissions_name_key" ON "system_permissions"("name");

-- CreateIndex
CREATE INDEX "system_role_permissions_roleId_idx" ON "system_role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "system_role_permissions_permissionId_idx" ON "system_role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "system_role_permissions_roleId_permissionId_key" ON "system_role_permissions"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_key" ON "skills"("name");

-- CreateIndex
CREATE INDEX "skills_name_idx" ON "skills"("name");

-- CreateIndex
CREATE INDEX "user_skills_userId_idx" ON "user_skills"("userId");

-- CreateIndex
CREATE INDEX "user_skills_skillId_idx" ON "user_skills"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "user_skills_userId_skillId_key" ON "user_skills"("userId", "skillId");

-- CreateIndex
CREATE INDEX "experiences_userId_idx" ON "experiences"("userId");

-- CreateIndex
CREATE INDEX "experiences_deletedAt_idx" ON "experiences"("deletedAt");

-- CreateIndex
CREATE INDEX "educations_userId_idx" ON "educations"("userId");

-- CreateIndex
CREATE INDEX "educations_deletedAt_idx" ON "educations"("deletedAt");

-- CreateIndex
CREATE INDEX "resumes_userId_idx" ON "resumes"("userId");

-- CreateIndex
CREATE INDEX "resumes_deletedAt_idx" ON "resumes"("deletedAt");

-- CreateIndex
CREATE INDEX "jobs_tenantId_companyId_status_idx" ON "jobs"("tenantId", "companyId", "status");

-- CreateIndex
CREATE INDEX "jobs_tenantId_status_deletedAt_idx" ON "jobs"("tenantId", "status", "deletedAt");

-- CreateIndex
CREATE INDEX "jobs_companyId_status_idx" ON "jobs"("companyId", "status");

-- CreateIndex
CREATE INDEX "jobs_status_deletedAt_idx" ON "jobs"("status", "deletedAt");

-- CreateIndex
CREATE INDEX "jobs_deletedAt_idx" ON "jobs"("deletedAt");

-- CreateIndex
CREATE INDEX "jobs_archivedAt_idx" ON "jobs"("archivedAt");

-- CreateIndex
CREATE INDEX "jobs_createdAt_idx" ON "jobs"("createdAt");

-- CreateIndex
CREATE INDEX "job_applications_jobId_userId_idx" ON "job_applications"("jobId", "userId");

-- CreateIndex
CREATE INDEX "job_applications_userId_status_idx" ON "job_applications"("userId", "status");

-- CreateIndex
CREATE INDEX "job_applications_jobId_status_idx" ON "job_applications"("jobId", "status");

-- CreateIndex
CREATE INDEX "job_applications_status_deletedAt_idx" ON "job_applications"("status", "deletedAt");

-- CreateIndex
CREATE INDEX "job_applications_deletedAt_idx" ON "job_applications"("deletedAt");

-- CreateIndex
CREATE INDEX "job_applications_archivedAt_idx" ON "job_applications"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "job_applications_jobId_userId_key" ON "job_applications"("jobId", "userId");

-- CreateIndex
CREATE INDEX "saved_jobs_userId_idx" ON "saved_jobs"("userId");

-- CreateIndex
CREATE INDEX "saved_jobs_jobId_idx" ON "saved_jobs"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_jobs_jobId_userId_key" ON "saved_jobs"("jobId", "userId");

-- CreateIndex
CREATE INDEX "job_skills_jobId_idx" ON "job_skills"("jobId");

-- CreateIndex
CREATE INDEX "job_skills_skillId_idx" ON "job_skills"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "job_skills_jobId_skillId_key" ON "job_skills"("jobId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_email_idx" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_tenantId_isActive_deletedAt_idx" ON "companies"("tenantId", "isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "companies_deletedAt_idx" ON "companies"("deletedAt");

-- CreateIndex
CREATE INDEX "companies_archivedAt_idx" ON "companies"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "companies_tenantId_email_key" ON "companies"("tenantId", "email");

-- CreateIndex
CREATE INDEX "company_users_userId_companyId_idx" ON "company_users"("userId", "companyId");

-- CreateIndex
CREATE INDEX "company_users_companyId_isActive_deletedAt_idx" ON "company_users"("companyId", "isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "company_users_roleId_idx" ON "company_users"("roleId");

-- CreateIndex
CREATE INDEX "company_users_deletedAt_idx" ON "company_users"("deletedAt");

-- CreateIndex
CREATE INDEX "company_users_archivedAt_idx" ON "company_users"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "company_users_userId_companyId_key" ON "company_users"("userId", "companyId");

-- CreateIndex
CREATE INDEX "company_roles_companyId_deletedAt_idx" ON "company_roles"("companyId", "deletedAt");

-- CreateIndex
CREATE INDEX "company_roles_deletedAt_idx" ON "company_roles"("deletedAt");

-- CreateIndex
CREATE INDEX "company_roles_archivedAt_idx" ON "company_roles"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "company_roles_companyId_name_key" ON "company_roles"("companyId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "company_permissions_name_key" ON "company_permissions"("name");

-- CreateIndex
CREATE INDEX "company_role_permissions_roleId_idx" ON "company_role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "company_role_permissions_permissionId_idx" ON "company_role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "company_role_permissions_roleId_permissionId_key" ON "company_role_permissions"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_email_key" ON "vendors"("email");

-- CreateIndex
CREATE INDEX "vendors_email_idx" ON "vendors"("email");

-- CreateIndex
CREATE INDEX "vendors_tenantId_isActive_deletedAt_idx" ON "vendors"("tenantId", "isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "vendors_deletedAt_idx" ON "vendors"("deletedAt");

-- CreateIndex
CREATE INDEX "vendors_archivedAt_idx" ON "vendors"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_tenantId_email_key" ON "vendors"("tenantId", "email");

-- CreateIndex
CREATE INDEX "vendor_users_userId_vendorId_idx" ON "vendor_users"("userId", "vendorId");

-- CreateIndex
CREATE INDEX "vendor_users_vendorId_isActive_deletedAt_idx" ON "vendor_users"("vendorId", "isActive", "deletedAt");

-- CreateIndex
CREATE INDEX "vendor_users_roleId_idx" ON "vendor_users"("roleId");

-- CreateIndex
CREATE INDEX "vendor_users_deletedAt_idx" ON "vendor_users"("deletedAt");

-- CreateIndex
CREATE INDEX "vendor_users_archivedAt_idx" ON "vendor_users"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_users_userId_vendorId_key" ON "vendor_users"("userId", "vendorId");

-- CreateIndex
CREATE INDEX "vendor_roles_vendorId_deletedAt_idx" ON "vendor_roles"("vendorId", "deletedAt");

-- CreateIndex
CREATE INDEX "vendor_roles_deletedAt_idx" ON "vendor_roles"("deletedAt");

-- CreateIndex
CREATE INDEX "vendor_roles_archivedAt_idx" ON "vendor_roles"("archivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_roles_vendorId_name_key" ON "vendor_roles"("vendorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_permissions_name_key" ON "vendor_permissions"("name");

-- CreateIndex
CREATE INDEX "vendor_role_permissions_roleId_idx" ON "vendor_role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "vendor_role_permissions_permissionId_idx" ON "vendor_role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_role_permissions_roleId_permissionId_key" ON "vendor_role_permissions"("roleId", "permissionId");

-- CreateIndex
CREATE INDEX "workflows_tenantId_entityType_isActive_idx" ON "workflows"("tenantId", "entityType", "isActive");

-- CreateIndex
CREATE INDEX "workflows_deletedAt_idx" ON "workflows"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "workflows_tenantId_entityType_name_key" ON "workflows"("tenantId", "entityType", "name");

-- CreateIndex
CREATE INDEX "workflow_steps_workflowId_idx" ON "workflow_steps"("workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_steps_workflowId_stepOrder_key" ON "workflow_steps"("workflowId", "stepOrder");

-- CreateIndex
CREATE INDEX "workflow_instances_workflowId_status_idx" ON "workflow_instances"("workflowId", "status");

-- CreateIndex
CREATE INDEX "workflow_instances_entityType_entityId_idx" ON "workflow_instances"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "workflow_instances_status_createdAt_idx" ON "workflow_instances"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "workflow_instances_entityType_entityId_key" ON "workflow_instances"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "version_history_entityType_entityId_idx" ON "version_history"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "version_history_entityType_entityId_version_idx" ON "version_history"("entityType", "entityId", "version");

-- CreateIndex
CREATE INDEX "version_history_changedBy_createdAt_idx" ON "version_history"("changedBy", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "version_history_entityType_entityId_version_key" ON "version_history"("entityType", "entityId", "version");

-- CreateIndex
CREATE INDEX "custom_fields_tenantId_entityType_isVisible_idx" ON "custom_fields"("tenantId", "entityType", "isVisible");

-- CreateIndex
CREATE INDEX "custom_fields_entityType_deletedAt_idx" ON "custom_fields"("entityType", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "custom_fields_tenantId_entityType_name_key" ON "custom_fields"("tenantId", "entityType", "name");

-- CreateIndex
CREATE INDEX "custom_field_values_entityType_entityId_idx" ON "custom_field_values"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "custom_field_values_customFieldId_idx" ON "custom_field_values"("customFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "custom_field_values_customFieldId_entityType_entityId_key" ON "custom_field_values"("customFieldId", "entityType", "entityId");

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_systemRoleId_fkey" FOREIGN KEY ("systemRoleId") REFERENCES "system_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_roles" ADD CONSTRAINT "system_roles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_roles" ADD CONSTRAINT "system_roles_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_permissions" ADD CONSTRAINT "system_role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "system_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_permissions" ADD CONSTRAINT "system_role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "system_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "company_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_users" ADD CONSTRAINT "company_users_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_roles" ADD CONSTRAINT "company_roles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_roles" ADD CONSTRAINT "company_roles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_roles" ADD CONSTRAINT "company_roles_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_role_permissions" ADD CONSTRAINT "company_role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "company_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_role_permissions" ADD CONSTRAINT "company_role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "company_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_users" ADD CONSTRAINT "vendor_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_users" ADD CONSTRAINT "vendor_users_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_users" ADD CONSTRAINT "vendor_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "vendor_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_users" ADD CONSTRAINT "vendor_users_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_users" ADD CONSTRAINT "vendor_users_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_roles" ADD CONSTRAINT "vendor_roles_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_roles" ADD CONSTRAINT "vendor_roles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_roles" ADD CONSTRAINT "vendor_roles_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_role_permissions" ADD CONSTRAINT "vendor_role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "vendor_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_role_permissions" ADD CONSTRAINT "vendor_role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "vendor_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_steps" ADD CONSTRAINT "workflow_steps_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_instances" ADD CONSTRAINT "workflow_instances_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_instances" ADD CONSTRAINT "workflow_instances_currentStepId_fkey" FOREIGN KEY ("currentStepId") REFERENCES "workflow_steps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_instances" ADD CONSTRAINT "workflow_instances_startedBy_fkey" FOREIGN KEY ("startedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_instances" ADD CONSTRAINT "workflow_instances_completedBy_fkey" FOREIGN KEY ("completedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "version_history" ADD CONSTRAINT "version_history_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_fields" ADD CONSTRAINT "custom_fields_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_field_values" ADD CONSTRAINT "custom_field_values_customFieldId_fkey" FOREIGN KEY ("customFieldId") REFERENCES "custom_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;
