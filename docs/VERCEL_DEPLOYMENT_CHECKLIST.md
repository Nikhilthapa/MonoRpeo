# Vercel Deployment Checklist

Quick reference checklist for deploying `home-web` and `admin-panel-web` to Vercel.

## home-web Deployment

### Initial Setup
- [ ] Import repository to Vercel (or create new project)
- [ ] **DO NOT** set root directory (leave as workspace root)
- [ ] Select **Next.js** as Framework Preset

### Build Configuration
- [ ] Toggle override for **Build Command**
- [ ] Set Build Command to: `npx nx build home-web --prod`
- [ ] Toggle override for **Output Directory**
- [ ] Set Output Directory to: `apps/home-web/.next`

### Optimization
- [ ] Go to Project Settings > Git
- [ ] Set Ignore Build Step to: `npx nx-ignore home-web`

### Environment Variables
- [ ] Add required environment variables in Project Settings > Environment Variables
- [ ] Configure for Production, Preview, and Development environments

### Verification
- [ ] Trigger a build and verify it succeeds
- [ ] Check build logs for correct execution
- [ ] Visit deployed URL and test application
- [ ] Verify all routes work correctly

---

## admin-panel-web Deployment

### Initial Setup
- [ ] Import repository to Vercel (or create new project)
- [ ] **DO NOT** set root directory (leave as workspace root)
- [ ] Select **Next.js** as Framework Preset

### Build Configuration
- [ ] Toggle override for **Build Command**
- [ ] Set Build Command to: `npx nx build admin-panel-web --prod`
- [ ] Toggle override for **Output Directory**
- [ ] Set Output Directory to: `apps/admin-panel-web/.next`

### Optimization
- [ ] Go to Project Settings > Git
- [ ] Set Ignore Build Step to: `npx nx-ignore admin-panel-web`

### Environment Variables
- [ ] Add required environment variables in Project Settings > Environment Variables
- [ ] Configure for Production, Preview, and Development environments

### Verification
- [ ] Trigger a build and verify it succeeds
- [ ] Check build logs for correct execution
- [ ] Visit deployed URL and test application
- [ ] Verify all routes work correctly

---

## Post-Deployment

- [ ] Monitor first few builds to ensure `nx-ignore` is working
- [ ] Verify builds are skipped when apps are not affected
- [ ] Set up custom domains (if needed)
- [ ] Configure preview deployments for pull requests
- [ ] Review and optimize environment variables

