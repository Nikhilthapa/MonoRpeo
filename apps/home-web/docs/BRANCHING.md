# Git Branching Strategy

## Overview

This document outlines the Git branching strategy and workflow for the HireNova project. Following these guidelines ensures a clean, organized codebase and smooth collaboration.

## Branch Structure

### Main Branches

- **`main`** - Production-ready code. Always deployable.
- **`develop`** - Integration branch for features. Latest development work.

### Supporting Branches

- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`hotfix/*`** - Critical production fixes
- **`chore/*`** - Maintenance tasks (dependencies, configs)

## Branch Naming Conventions

### Feature Branches

```
feature/description-of-feature
feature/user-authentication
feature/dashboard-analytics
```

### Bug Fix Branches

```
fix/description-of-bug
fix/login-redirect-issue
fix/mobile-responsive-layout
```

### Hotfix Branches

```
hotfix/critical-security-patch
hotfix/payment-processing-error
```

### Chore Branches

```
chore/update-dependencies
chore/setup-prettier
chore/update-documentation
```

## Workflow

### Starting a New Feature

1. **Create feature branch from `develop`**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Work on your feature**
   - Make small, focused commits
   - Write descriptive commit messages
   - Keep branch up to date with `develop`

3. **Push and create Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

   - Create PR targeting `develop`
   - Request code review
   - Address review comments

4. **Merge and cleanup**
   - After approval, merge PR
   - Delete feature branch locally and remotely

### Bug Fixes

1. **Create fix branch from `develop`**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b fix/bug-description
   ```

2. **Fix the bug**
   - Write tests if applicable
   - Ensure fix doesn't break existing functionality

3. **Create PR targeting `develop`**
   - Include description of the bug
   - Reference issue number if applicable

### Hotfixes (Production Issues)

1. **Create hotfix branch from `main`**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-issue
   ```

2. **Fix the issue**
   - Make minimal changes
   - Test thoroughly

3. **Merge to both `main` and `develop`**
   - Create PR targeting `main`
   - After merge, merge `main` into `develop`
   - Tag release in `main`

## Commit Messages

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes
- **build**: Build system changes

### Examples

```
feat(auth): add OTP verification flow

Implement OTP verification with resend functionality.
Add ProtectedRoute component for route guards.

Closes #123
```

```
fix(dashboard): resolve user data loading issue

Fix race condition in useAuth hook that caused
undefined user data on initial load.
```

```
chore: update Prettier configuration

Add Tailwind plugin and update formatting rules.
```

## Pull Request Process

### PR Checklist

- [ ] Code follows project architecture patterns
- [ ] All routes use `ROUTES` constants
- [ ] All API calls use `API_ENDPOINTS` constants
- [ ] Types are properly defined and exported
- [ ] Components are properly typed
- [ ] No console.log statements (except warnings/errors)
- [ ] Code is formatted with Prettier
- [ ] ESLint passes without errors
- [ ] No TypeScript errors
- [ ] Tested locally
- [ ] Documentation updated if needed

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor
- [ ] Chore

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

- [ ] Tested locally
- [ ] Manual testing completed
- [ ] No breaking changes

## Screenshots (if applicable)

Add screenshots here

## Related Issues

Closes #123
```

## Best Practices

### Do's

✅ **Keep branches focused** - One feature/fix per branch
✅ **Write descriptive commit messages** - Explain what and why
✅ **Keep branches up to date** - Regularly merge `develop` into your branch
✅ **Use meaningful branch names** - Clear and descriptive
✅ **Create small PRs** - Easier to review and merge
✅ **Test before pushing** - Ensure code works locally
✅ **Follow code style** - Use Prettier and ESLint

### Don'ts

❌ **Don't commit directly to `main` or `develop`**
❌ **Don't force push to shared branches**
❌ **Don't create huge PRs** - Break into smaller pieces
❌ **Don't skip code review** - Always get approval
❌ **Don't commit broken code** - Fix issues before pushing
❌ **Don't ignore linting errors** - Fix them before committing

## Branch Protection Rules

### `main` Branch

- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date
- No force pushes
- No deletion

### `develop` Branch

- Require pull request reviews
- Require status checks to pass
- No force pushes

## Merging Strategies

### Merge Commit (Default)

- Preserves branch history
- Creates merge commit
- Good for feature branches

### Squash and Merge

- Combines all commits into one
- Cleaner history
- Use for small feature branches

### Rebase and Merge

- Linear history
- Rewrites commit history
- Use carefully, only for small branches

## Troubleshooting

### Branch Out of Date

```bash
git checkout your-branch
git fetch origin
git merge origin/develop
# Resolve conflicts if any
git push origin your-branch
```

### Undo Last Commit (Not Pushed)

```bash
git reset --soft HEAD~1
```

### Undo Last Commit (Pushed)

```bash
git revert HEAD
git push origin your-branch
```

### Rename Branch

```bash
# Rename local branch
git branch -m old-name new-name

# Delete old remote branch
git push origin --delete old-name

# Push new branch
git push origin -u new-name
```

## Quick Reference

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branches
git checkout branch-name

# Update branch from develop
git checkout feature/your-branch
git merge develop

# Push branch
git push origin feature/your-branch

# Delete local branch
git branch -d feature/your-branch

# Delete remote branch
git push origin --delete feature/your-branch
```

---

**Last Updated**: December 2024
