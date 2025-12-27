import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, PermissionScope } from '../generated/prisma/client'
import bcrypt from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // ============================================
  // System Permissions (Auth Category)
  // ============================================
  console.log('📝 Creating system permissions...');
  const systemPermissions = [
    {
      name: 'system.manage.users',
      description: 'Manage all users in the system',
      scope: PermissionScope.SYSTEM,
    },
    {
      name: 'system.manage.companies',
      description: 'Manage all companies',
      scope: PermissionScope.SYSTEM,
    },
    {
      name: 'system.manage.vendors',
      description: 'Manage all vendors',
      scope: PermissionScope.SYSTEM,
    },
    {
      name: 'system.manage.roles',
      description: 'Manage system roles and permissions',
      scope: PermissionScope.SYSTEM,
    },
    {
      name: 'system.view.analytics',
      description: 'View system-wide analytics',
      scope: PermissionScope.SYSTEM,
    },
    {
      name: 'system.manage.settings',
      description: 'Manage system settings',
      scope: PermissionScope.SYSTEM,
    },
  ];

  const createdSystemPermissions = await Promise.all(
    systemPermissions.map((perm) =>
      prisma.systemPermission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  );

  // ============================================
  // Company Permissions
  // ============================================
  console.log('📝 Creating company permissions...');
  const companyPermissions = [
    {
      name: 'company.jobs.create',
      description: 'Create new job postings',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.jobs.edit',
      description: 'Edit job postings',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.jobs.publish',
      description: 'Publish job postings',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.jobs.pause',
      description: 'Pause or close job postings',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.jobs.view',
      description: 'View all company jobs',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.applications.view',
      description: 'View job applications',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.applications.manage',
      description: 'Manage application status',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.team.view',
      description: 'View team members',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.team.invite',
      description: 'Invite team members',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.team.remove',
      description: 'Remove team members',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.profile.edit',
      description: 'Edit company profile',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.roles.manage',
      description: 'Manage company roles and permissions',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.analytics.view',
      description: 'View company analytics',
      scope: PermissionScope.COMPANY,
    },
    {
      name: 'company.activity.view',
      description: 'View activity logs',
      scope: PermissionScope.COMPANY,
    },
  ];

  await Promise.all(
    companyPermissions.map((perm) =>
      prisma.companyPermission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  );

  // ============================================
  // Vendor Permissions
  // ============================================
  console.log('📝 Creating vendor permissions...');
  const vendorPermissions = [
    {
      name: 'vendor.profile.edit',
      description: 'Edit vendor profile',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.team.view',
      description: 'View vendor team members',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.team.invite',
      description: 'Invite vendor team members',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.team.remove',
      description: 'Remove vendor team members',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.roles.manage',
      description: 'Manage vendor roles and permissions',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.analytics.view',
      description: 'View vendor analytics',
      scope: PermissionScope.VENDOR,
    },
    {
      name: 'vendor.activity.view',
      description: 'View vendor activity logs',
      scope: PermissionScope.VENDOR,
    },
  ];

  await Promise.all(
    vendorPermissions.map((perm) =>
      prisma.vendorPermission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  );

  // ============================================
  // System Roles
  // ============================================
  console.log('👤 Creating system roles...');
  const superAdminRole = await prisma.systemRole.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: {
      name: 'Super Admin',
      description: 'Full system access with all permissions',
    },
  });

  // Assign all system permissions to Super Admin role
  console.log('🔗 Assigning permissions to Super Admin role...');
  for (const permission of createdSystemPermissions) {
    await prisma.systemRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // ============================================
  // Super Admin User
  // ============================================
  console.log('👤 Creating super admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const superAdminUser = await prisma.user.upsert({
    where: { email: 'admin@hirenova.com' },
    update: {},
    create: {
      email: 'admin@hirenova.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      emailVerified: true,
      isActive: true,
      systemRoleId: superAdminRole.id,
    },
  });

  // ============================================
  // Sample Skills (Job Category)
  // ============================================
  console.log('📝 Creating sample skills...');
  const sampleSkills = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'TypeScript', category: 'Programming' },
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'UI/UX Design', category: 'Design' },
    { name: 'Product Management', category: 'Management' },
  ];

  await Promise.all(
    sampleSkills.map((skill) =>
      prisma.skill.upsert({
        where: { name: skill.name },
        update: {},
        create: skill,
      })
    )
  );

  console.log('✅ Database seed completed successfully!');
  console.log(`📧 Super Admin Email: admin@hirenova.com`);
  console.log(`🔑 Super Admin Password: admin123`);
  console.log('⚠️  Please change the default password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
