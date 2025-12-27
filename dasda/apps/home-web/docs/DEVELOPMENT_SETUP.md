# Development Setup Guide

This document outlines the development tools and workflows configured for the HireNova project.

## Installed Tools

### Code Formatting

- **Prettier** - Automatic code formatting
- **prettier-plugin-tailwindcss** - Tailwind class sorting

### Linting

- **ESLint** - Code quality and style checking
- **eslint-plugin-import** - Import organization rules

### Git Hooks

- **Husky** - Git hooks manager
- **lint-staged** - Run linters on staged files only
- **Commitlint** - Conventional commit message validation

### Editor Support

- **EditorConfig** - Cross-editor consistency
- **VS Code Settings** - Workspace-specific configuration

## Available Scripts

```bash
# Format all files
npm run format

# Check formatting without fixing
npm run format:check

# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix

# Development server
npm run dev

# Build for production
npm run build
```

## Pre-Commit Hooks

When you commit code, the following happens automatically:

1. **Pre-commit hook** runs:
   - Formats staged files with Prettier
   - Lints staged files with ESLint
   - Auto-fixes linting issues where possible

2. **Commit-msg hook** validates:
   - Commit message follows conventional format
   - Format: `type(scope): subject`

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes

**Examples:**

```
feat(auth): add OTP verification flow
fix(dashboard): resolve user data loading issue
chore: update Prettier configuration
```

## VS Code Setup

### Recommended Extensions

The project includes `.vscode/extensions.json` with recommended extensions:

- Prettier - Code formatter
- ESLint - JavaScript/TypeScript linter
- Tailwind CSS IntelliSense - Tailwind autocomplete
- TypeScript and JavaScript Language Features

### Workspace Settings

The project includes `.vscode/settings.json` with:

- Format on save enabled
- Prettier as default formatter
- ESLint auto-fix on save
- Tailwind CSS IntelliSense configuration

## Configuration Files

### Prettier (`.prettierrc`)

- Print width: 100
- Tab width: 2 spaces
- Semicolons: enabled
- Quotes: double quotes
- Trailing commas: ES5
- Tailwind plugin: enabled

### ESLint (`.eslintrc.json`)

- Extends Next.js core web vitals
- Import order enforcement
- Console statement warnings
- React unescaped entities disabled

### EditorConfig (`.editorconfig`)

- UTF-8 encoding
- LF line endings
- 2-space indentation
- Trim trailing whitespace

### lint-staged (`.lintstagedrc.json`)

- Formats and lints TypeScript/JavaScript files
- Formats JSON, Markdown, CSS files

## Branching Strategy

See [BRANCHING.md](./BRANCHING.md) for complete branching guidelines.

### Quick Reference

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Create bug fix branch
git checkout -b fix/bug-description

# Create hotfix branch
git checkout -b hotfix/critical-issue
```

## Pull Request Process

See [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md) for PR template.

### PR Checklist

- Code follows architecture patterns
- Routes use `ROUTES` constants
- API calls use `API_ENDPOINTS` constants
- Types properly defined
- Code formatted and linted
- Tested locally

## Workflow

### Daily Development

1. **Pull latest changes**

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make changes**
   - Code will auto-format on save (VS Code)
   - Run `npm run lint:fix` if needed

4. **Commit changes**

   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

   - Pre-commit hook will format and lint
   - Commit message will be validated

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

## Troubleshooting

### Pre-commit hook not running

```bash
# Reinstall Husky
npm run prepare
```

### Formatting issues

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Linting errors

```bash
# Auto-fix linting issues
npm run lint:fix

# Check linting
npm run lint
```

### Commit message rejected

Ensure your commit message follows the format:

```
type(scope): subject
```

Example: `feat(auth): add login functionality`

## Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated**: December 2024
