# Vercel Deployment Guide for Nx Next.js Applications

This guide covers deploying `home-web` and `admin-panel-web` Next.js applications from the Nx workspace to Vercel.

## Prerequisites

- Nx workspace with Next.js applications configured
- Vercel account
- Git repository connected to Vercel

## Application Overview

- **home-web**: Located at `apps/home-web/`
- **admin-panel-web**: Located at `apps/admin-panel-web/`

Both applications use:
- Next.js 16.0.1
- React 19
- Nx 22.3.3
- Tailwind CSS

## Deployment Configuration

### 1. home-web Deployment

#### New Vercel Project Setup

1. **Import Repository**
   - Import the repository to Vercel
   - **Important**: Do NOT set a root directory (leave it as workspace root)

2. **Framework Preset**
   - Select **Next.js** as the Framework Preset

3. **Build and Output Settings**
   - **Build Command** (toggle override):
     ```bash
     npx nx build home-web --prod
     ```
   - **Output Directory** (toggle override):
     ```
     apps/home-web/.next
     ```

4. **Ignored Build Step** (Optional but Recommended)
   - Go to Project Settings > Git
   - Set Ignore Build Step to:
     ```bash
     npx nx-ignore home-web
     ```
   - This skips builds when the app is not affected by changes

#### Project Settings Summary

- **Framework Preset**: Next.js
- **Root Directory**: (leave empty - workspace root)
- **Build Command**: `npx nx build home-web --prod`
- **Output Directory**: `apps/home-web/.next`
- **Install Command**: (default - Vercel will auto-detect)

---

### 2. admin-panel-web Deployment

#### New Vercel Project Setup

1. **Import Repository**
   - Import the same repository to Vercel (or create a new project)
   - **Important**: Do NOT set a root directory (leave it as workspace root)

2. **Framework Preset**
   - Select **Next.js** as the Framework Preset

3. **Build and Output Settings**
   - **Build Command** (toggle override):
     ```bash
     npx nx build admin-panel-web --prod
     ```
   - **Output Directory** (toggle override):
     ```
     apps/admin-panel-web/.next
     ```

4. **Ignored Build Step** (Optional but Recommended)
   - Go to Project Settings > Git
   - Set Ignore Build Step to:
     ```bash
     npx nx-ignore admin-panel-web
     ```
   - This skips builds when the app is not affected by changes

#### Project Settings Summary

- **Framework Preset**: Next.js
- **Root Directory**: (leave empty - workspace root)
- **Build Command**: `npx nx build admin-panel-web --prod`
- **Output Directory**: `apps/admin-panel-web/.next`
- **Install Command**: (default - Vercel will auto-detect)

---

## Updating Existing Projects

If you already have Vercel projects set up:

1. Navigate to **Project Settings** > **General**
2. Update the **Build Command** and **Output Directory** as specified above
3. Ensure **Framework Preset** is set to **Next.js**
4. Ensure **Root Directory** is empty (workspace root)

## Environment Variables

Configure environment variables in Vercel for each project:

1. Go to **Project Settings** > **Environment Variables**
2. Add any required variables for:
   - Production
   - Preview
   - Development (if using Vercel CLI)

### Common Environment Variables to Consider

- `NODE_ENV`: Set to `production` (usually auto-set by Vercel)
- API endpoints
- Authentication keys
- Database connection strings
- Any app-specific configuration

## Build Optimization

### Affected Builds

The `nx-ignore` command ensures builds only run when:
- The application code changes
- Dependencies of the application change
- Shared code used by the application changes

This saves build minutes and speeds up CI/CD.

### Build Cache

Nx automatically caches build artifacts. Vercel will benefit from:
- Faster subsequent builds
- Reduced build times for unaffected apps

## Verification Steps

After deployment:

1. **Check Build Logs**
   - Verify the build command executes correctly
   - Confirm output directory contains `.next` folder

2. **Test Deployment**
   - Visit the deployed URL
   - Verify all routes work correctly
   - Check for any runtime errors

3. **Monitor Builds**
   - Confirm `nx-ignore` is working (check skipped builds)
   - Monitor build times

## Troubleshooting

### Build Fails

- Verify Nx is installed: `npm install` should include `nx` in dependencies
- Check build command syntax matches exactly
- Ensure output directory path is correct

### Output Directory Not Found

- Verify the build completes successfully
- Check that `.next` folder exists in the specified output directory
- Ensure path is relative to workspace root

### Ignored Build Step Not Working

- Verify `nx-ignore` command is available (comes with Nx)
- Check that the command syntax matches: `npx nx-ignore <app-name>`
- Review Vercel build logs for ignored build messages

## Additional Resources

- [Nx Documentation - Vercel Deployment](https://nx.dev/recipes/deployment/deploy-nextjs-to-vercel)
- [Vercel Documentation](https://vercel.com/docs)
- [Nx Affected Commands](https://nx.dev/concepts/affected)

## Quick Reference

### home-web
```bash
Build Command: npx nx build home-web --prod
Output Directory: apps/home-web/.next
Ignore Build: npx nx-ignore home-web
```

### admin-panel-web
```bash
Build Command: npx nx build admin-panel-web --prod
Output Directory: apps/admin-panel-web/.next
Ignore Build: npx nx-ignore admin-panel-web
```

