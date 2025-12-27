# HireNova Frontend

A Next.js TypeScript application for user signup, OTP verification, and protected dashboard functionality.

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Documentation

📖 **[Complete Developer Guide](./ARCHITECTURE.md)** - Comprehensive documentation for new developers covering:

- Architecture overview
- Folder structure
- Development patterns
- Authentication flow
- API integration
- Common tasks
- Best practices
- Troubleshooting

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

## Project Structure

```
src/
├── app/              # Next.js App Router (route groups)
├── components/       # React components (ui, sections, auth)
├── constants/        # Route and API endpoint constants
├── hooks/            # Custom React hooks
├── lib/              # Core libraries (api, auth, config)
├── middleware.ts     # Route protection middleware
├── schemas/          # Zod validation schemas
├── types/            # TypeScript types/interfaces
└── utils/            # Utility functions
```

## Key Features

- ✅ User authentication (signup, login, OTP verification)
- ✅ Protected routes with middleware and component guards
- ✅ Scalable folder structure with route groups
- ✅ Type-safe API integration
- ✅ Cookie + localStorage authentication sync
- ✅ Responsive design with TailwindCSS

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Highlights

- **Route Groups**: Organized routes into `(auth)`, `(protected)`, `(public)` groups
- **Middleware Protection**: Edge-level route protection before page loads
- **Protected Routes**: Component-level protection with `ProtectedRoute` wrapper
- **Auth Hooks**: Reusable `useAuth` and `useRequireAuth` hooks
- **Constants**: Centralized route and API endpoint constants
- **Type Safety**: Full TypeScript coverage with organized types

For detailed architecture and development patterns, see [ARCHITECTURE.md](./ARCHITECTURE.md).
