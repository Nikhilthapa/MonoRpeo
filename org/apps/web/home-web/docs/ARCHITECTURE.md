# HireNova Frontend - Developer Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Key Concepts](#key-concepts)
6. [Development Patterns](#development-patterns)
7. [Authentication Flow](#authentication-flow)
8. [API Integration](#api-integration)
9. [Common Tasks](#common-tasks)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

HireNova is a Next.js 14 application built with TypeScript, implementing a scalable architecture for user authentication, route protection, and API integration. The application follows modern React patterns with server-side rendering and client-side interactivity.

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Validation**: Zod schemas

### Key Features

- User authentication (signup, login, OTP verification)
- Protected routes with middleware and component-level guards
- Scalable folder structure with route groups
- Type-safe API integration
- Cookie + localStorage authentication sync
- Responsive design with TailwindCSS

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Middleware                    │
│              (Edge-level route protection)              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Route Groups                          │
│  (auth) │ (protected) │ (public)                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Page Components                            │
│  (Server/Client Components)                             │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              UI Components & Hooks                       │
│  (ProtectedRoute, useAuth, useRequireAuth)              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              API Layer & Auth Storage                   │
│  (lib/api, lib/auth)                                    │
└─────────────────────────────────────────────────────────┘
```

### Authentication Layers

1. **Edge Layer** (Middleware): Protects routes before page loads
2. **Component Layer** (ProtectedRoute): Wraps protected components
3. **Hook Layer** (useRequireAuth): Client-side auth checks
4. **Storage Layer** (Cookies + localStorage): Auth persistence

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd hirenova
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Folder Structure

### Complete Directory Tree

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Route group: Authentication pages
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── signup/
│   │   │   └── page.tsx         # Signup page
│   │   └── otp/
│   │       └── page.tsx         # OTP verification page
│   ├── (protected)/             # Route group: Protected pages
│   │   └── dashboard/
│   │       └── page.tsx         # Dashboard (requires auth)
│   ├── (public)/                # Route group: Public pages
│   │   └── home/
│   │       └── page.tsx         # Landing page
│   ├── layout.tsx               # Root layout (fonts, global styles)
│   ├── page.tsx                 # Root page (redirects to /home)
│   └── globals.css              # Global Tailwind imports
│
├── components/                   # React components
│   ├── auth/
│   │   └── ProtectedRoute.tsx   # Protected route wrapper
│   ├── sections/                # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ...
│   └── ui/                      # Reusable UI primitives
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
│
├── constants/                    # Application constants
│   ├── routes.ts                # Route path constants
│   ├── api.ts                   # API endpoint constants
│   └── index.ts                 # Barrel export
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Auth state hook
│   ├── useRequireAuth.ts        # Require auth hook
│   └── index.ts                 # Barrel export
│
├── lib/                          # Core libraries
│   ├── api/
│   │   ├── client.ts            # Axios instance
│   │   ├── endpoints.ts         # API functions (post, get, etc.)
│   │   └── index.ts             # Barrel export
│   ├── auth/
│   │   ├── cookies.ts           # Cookie utilities (for middleware)
│   │   ├── storage.ts           # localStorage utilities
│   │   ├── server.ts            # Server-side auth utilities
│   │   └── index.ts             # Barrel export
│   └── config/
│       └── env.ts               # Environment configuration
│
├── middleware.ts                 # Next.js middleware (route protection)
│
├── schemas/                      # Zod validation schemas
│   ├── auth.ts                  # Auth schemas (login, signup)
│   └── index.ts                 # Barrel export
│
├── types/                        # TypeScript types/interfaces
│   ├── api.ts                   # API-related types
│   ├── auth.ts                  # Auth-related types
│   └── index.ts                 # Barrel export
│
└── utils/                        # Pure utility functions
    └── index.ts                 # Barrel export
```

### Route Groups Explained

Route groups `(auth)`, `(protected)`, `(public)` are organizational folders that **do NOT affect URLs**. They help organize routes by purpose:

- `(auth)/` - Authentication pages (login, signup, OTP)
- `(protected)/` - Pages requiring authentication
- `(public)/` - Public pages accessible to everyone

**Important**: Route groups don't appear in URLs. For example:

- `src/app/(auth)/login/page.tsx` → `/login` (not `/(auth)/login`)
- `src/app/(protected)/dashboard/page.tsx` → `/dashboard`

---

## Key Concepts

### 1. Path Aliases

All imports use the `@/` alias pointing to `src/`:

```typescript
// ✅ Correct
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";
import { post } from "@/lib/api";

// ❌ Wrong
import { ROUTES } from "../../constants";
```

### 2. Barrel Exports

Each directory exports through an `index.ts` file:

```typescript
// constants/index.ts
export * from "./routes";
export * from "./api";

// Usage
import { ROUTES, API_ENDPOINTS } from "@/constants";
```

### 3. Route Constants

**Never hardcode route strings**. Always use `ROUTES` constants:

```typescript
// ✅ Correct
import { ROUTES } from "@/constants";
router.push(ROUTES.DASHBOARD);

// ❌ Wrong
router.push("/dashboard");
```

### 4. API Endpoint Constants

**Never hardcode API endpoints**. Always use `API_ENDPOINTS` constants:

```typescript
// ✅ Correct
import { API_ENDPOINTS } from "@/constants";
const response = await post(API_ENDPOINTS.AUTH.LOGIN, data);

// ❌ Wrong
const response = await post("/api/auth/login", data);
```

### 5. Type Organization

Types are organized by domain and exported from `types/index.ts`:

```typescript
// types/auth.ts
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  token: string;
}

// Usage
import type { UserData } from "@/types";
```

### 6. Schema Organization

Zod schemas are organized by domain and exported from `schemas/index.ts`:

```typescript
// schemas/auth.ts
export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Usage
import { loginSchema, type LoginFormData } from "@/schemas";
```

---

## Development Patterns

### Creating a New Page

1. **Determine route group**
   - Public page → `app/(public)/your-page/page.tsx`
   - Auth page → `app/(auth)/your-page/page.tsx`
   - Protected page → `app/(protected)/your-page/page.tsx`

2. **Add route constant**

   ```typescript
   // constants/routes.ts
   export const ROUTES = {
     // ... existing routes
     YOUR_PAGE: "/your-page",
   } as const;
   ```

3. **Create page component**

   ```typescript
   // app/(public)/your-page/page.tsx
   'use client'; // Only if you need interactivity

   import { ROUTES } from '@/constants';

   export default function YourPage() {
     return <div>Your Page Content</div>;
   }
   ```

### Creating a Protected Page

```typescript
// app/(protected)/your-page/page.tsx
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function YourPageContent() {
  return <div>Protected Content</div>;
}

export default function YourPage() {
  return (
    <ProtectedRoute>
      <YourPageContent />
    </ProtectedRoute>
  );
}
```

### Creating a New Component

1. **Determine component type**
   - UI primitive → `components/ui/YourComponent.tsx`
   - Page section → `components/sections/YourSection.tsx`
   - Auth-related → `components/auth/YourComponent.tsx`

2. **Create component**

   ```typescript
   // components/ui/YourComponent.tsx
   'use client';

   import React from 'react';

   interface YourComponentProps {
     // Define props
   }

   export const YourComponent: React.FC<YourComponentProps> = ({ ...props }) => {
     return <div>Component Content</div>;
   };
   ```

### Creating a New Hook

```typescript
// hooks/useYourHook.ts
"use client";

import { useState, useEffect } from "react";

interface UseYourHookReturn {
  // Define return type
}

export const useYourHook = (): UseYourHookReturn => {
  // Hook implementation
  return {
    // Return values
  };
};

// hooks/index.ts
export { useYourHook } from "./useYourHook";
```

### Creating a New API Endpoint

1. **Add endpoint constant**

   ```typescript
   // constants/api.ts
   export const API_ENDPOINTS = {
     AUTH: {
       // ... existing endpoints
       YOUR_ENDPOINT: "/api/your-endpoint",
     },
   } as const;
   ```

2. **Use in component**

   ```typescript
   import { post } from "@/lib/api";
   import { API_ENDPOINTS } from "@/constants";

   const response = await post(API_ENDPOINTS.AUTH.YOUR_ENDPOINT, data);
   ```

### Adding a New Type

```typescript
// types/your-domain.ts
export interface YourType {
  field1: string;
  field2: number;
}

// types/index.ts
export * from "./your-domain";
```

---

## Authentication Flow

### Overview

Authentication uses a multi-layer approach:

1. **Middleware** (Edge): Checks cookies before page loads
2. **ProtectedRoute** (Component): Wraps protected pages
3. **useRequireAuth** (Hook): Client-side auth checks
4. **Storage** (Persistence): Cookies + localStorage sync

### Authentication Storage

Auth data is stored in two places for compatibility:

- **Cookies**: Used by middleware (edge-level protection)
- **localStorage**: Used by client components (client-side access)

Both are synced automatically via `setStoredUser()` and `clearStoredUser()`.

### Login Flow

```
1. User submits login form
   ↓
2. API call to API_ENDPOINTS.AUTH.LOGIN
   ↓
3. On success: setStoredUser(userData)
   - Sets localStorage
   - Sets cookie (for middleware)
   ↓
4. Redirect to ROUTES.DASHBOARD
   ↓
5. Middleware checks cookie → allows access
   ↓
6. ProtectedRoute checks auth → renders content
```

### Signup Flow

```
1. User submits signup form
   ↓
2. API call to API_ENDPOINTS.AUTH.REGISTER
   ↓
3. Store temp user data in localStorage
   ↓
4. Redirect to ROUTES.OTP
   ↓
5. User enters OTP
   ↓
6. API call to API_ENDPOINTS.AUTH.VERIFY_OTP
   ↓
7. On success: setStoredUser(userData)
   ↓
8. Redirect to ROUTES.DASHBOARD
```

### Protected Route Access

```
1. User navigates to /dashboard
   ↓
2. Middleware checks cookie
   - No cookie → redirect to ROUTES.LOGIN
   - Has cookie → allow access
   ↓
3. Page loads → ProtectedRoute wrapper
   ↓
4. useRequireAuth hook checks localStorage
   - Not authenticated → redirect to ROUTES.LOGIN
   - Authenticated → render content
```

### Auth Utilities

```typescript
// Get current user
import { getStoredUser } from "@/lib/auth";
const user = getStoredUser(); // UserData | null

// Set user (syncs cookie + localStorage)
import { setStoredUser } from "@/lib/auth";
setStoredUser(userData);

// Clear auth (syncs cookie + localStorage)
import { clearStoredUser } from "@/lib/auth";
clearStoredUser();

// Get token only
import { getToken } from "@/lib/auth";
const token = getToken(); // string | null
```

### Auth Hooks

```typescript
// Check auth state
import { useAuth } from "@/hooks";

const { user, isAuthenticated, isLoading } = useAuth();

// Require authentication (with redirect)
import { useRequireAuth } from "@/hooks";

const { isAuthenticated, isLoading } = useRequireAuth({
  redirectTo: ROUTES.LOGIN, // optional, defaults to LOGIN
});
```

---

## API Integration

### API Client Structure

The API layer is organized as:

- `lib/api/client.ts` - Axios instance configuration
- `lib/api/endpoints.ts` - API functions (post, get, etc.)
- `lib/api/index.ts` - Barrel export

### Making API Calls

```typescript
import { post } from "@/lib/api";
import { API_ENDPOINTS } from "@/constants";
import type { ApiResponse } from "@/types";

// POST request
const response = await post<UserData>(API_ENDPOINTS.AUTH.LOGIN, {
  email: "user@example.com",
  password: "password123",
});

if (response.error) {
  // Handle error
  console.error(response.error);
  return;
}

if (response.data) {
  // Handle success
  console.log(response.data);
}
```

### API Response Type

```typescript
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}
```

### Error Handling Pattern

```typescript
const response = await post(API_ENDPOINTS.AUTH.LOGIN, data);

if (response.error) {
  // Display error to user
  alert(response.error);
  return;
}

// Proceed with success case
if (response.data) {
  // Handle success
}
```

---

## Common Tasks

### Adding a New Route

1. **Create page file**

   ```typescript
   // app/(public)/new-route/page.tsx
   export default function NewRoutePage() {
     return <div>New Route</div>;
   }
   ```

2. **Add route constant**

   ```typescript
   // constants/routes.ts
   export const ROUTES = {
     // ... existing
     NEW_ROUTE: "/new-route",
   } as const;
   ```

3. **Update middleware** (if needed)
   ```typescript
   // middleware.ts
   const isProtectedRoute =
     pathname.startsWith(ROUTES.DASHBOARD) || pathname.startsWith(ROUTES.NEW_ROUTE);
   ```

### Adding Form Validation

1. **Create schema**

   ```typescript
   // schemas/your-domain.ts
   import { z } from "zod";

   export const yourFormSchema = z.object({
     field1: z.string().min(1, "Field is required"),
     field2: z.string().email("Valid email required"),
   });

   export type YourFormData = z.infer<typeof yourFormSchema>;
   ```

2. **Use in component**

   ```typescript
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { yourFormSchema, type YourFormData } from "@/schemas";

   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<YourFormData>({
     resolver: zodResolver(yourFormSchema),
   });
   ```

### Adding a New API Endpoint

1. **Add endpoint constant**

   ```typescript
   // constants/api.ts
   export const API_ENDPOINTS = {
     YOUR_MODULE: {
       YOUR_ENDPOINT: "/api/your-module/your-endpoint",
     },
   } as const;
   ```

2. **Use in component**

   ```typescript
   import { post } from "@/lib/api";
   import { API_ENDPOINTS } from "@/constants";

   const response = await post(API_ENDPOINTS.YOUR_MODULE.YOUR_ENDPOINT, data);
   ```

### Redirecting Authenticated Users

```typescript
import { useAuth } from "@/hooks";
import { ROUTES } from "@/constants";
import { useEffect } from "react";

export default function AuthPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);

  // ... rest of component
}
```

---

## Best Practices

### 1. Always Use Constants

```typescript
// ✅ Good
import { ROUTES } from "@/constants";
router.push(ROUTES.DASHBOARD);

// ❌ Bad
router.push("/dashboard");
```

### 2. Use Type Imports for Types

```typescript
// ✅ Good
import type { UserData } from "@/types";

// ❌ Bad
import { UserData } from "@/types";
```

### 3. Server Components by Default

```typescript
// ✅ Good (Server Component)
export default function Page() {
  return <div>Content</div>;
}

// Only add 'use client' when needed
'use client';
export default function InteractivePage() {
  const [state, setState] = useState();
  return <div>Interactive Content</div>;
}
```

### 4. Barrel Exports

```typescript
// ✅ Good
import { ROUTES, API_ENDPOINTS } from "@/constants";
import { useAuth, useRequireAuth } from "@/hooks";

// ❌ Bad
import { ROUTES } from "@/constants/routes";
import { API_ENDPOINTS } from "@/constants/api";
```

### 5. Protected Routes Pattern

```typescript
// ✅ Good
export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <PageContent />
    </ProtectedRoute>
  );
}

// ❌ Bad (manual auth check)
export default function ProtectedPage() {
  const user = getStoredUser();
  if (!user) {
    router.push('/login');
    return null;
  }
  return <PageContent />;
}
```

### 6. Error Handling

```typescript
// ✅ Good
const response = await post(API_ENDPOINTS.AUTH.LOGIN, data);

if (response.error) {
  // Handle error explicitly
  alert(response.error);
  return;
}

// ❌ Bad
const response = await post(API_ENDPOINTS.AUTH.LOGIN, data);
// No error handling
```

### 7. Form Validation

```typescript
// ✅ Good
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(formSchema),
});

// ❌ Bad
const [email, setEmail] = useState("");
// Manual validation
```

---

## Troubleshooting

### CSS Not Applying

**Problem**: Tailwind classes not working

**Solution**:

1. Check `tailwind.config.js` content paths include `./src/`
2. Clear `.next` cache: `rm -rf .next`
3. Restart dev server: `npm run dev`

### Routes Not Working

**Problem**: 404 errors on routes

**Solution**:

1. Verify route groups don't affect URLs (they're organizational)
2. Check `middleware.ts` isn't blocking routes incorrectly
3. Ensure route constants match actual file paths

### Authentication Not Working

**Problem**: User gets redirected even when authenticated

**Solution**:

1. Check cookies are being set: `setStoredUser()` syncs both
2. Verify middleware cookie name matches: `AUTH_COOKIE_NAME`
3. Check localStorage has user data
4. Verify `useAuth` hook is working correctly

### Import Errors

**Problem**: Cannot find module '@/...'

**Solution**:

1. Verify `tsconfig.json` has `"@/*": ["./src/*"]`
2. Check file exists in correct location
3. Ensure barrel exports (`index.ts`) exist
4. Restart TypeScript server in IDE

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:

1. Run `npm run build` to see full error messages
2. Check all imports use `@/` alias
3. Verify all types are exported from `types/index.ts`
4. Ensure all constants are exported from `constants/index.ts`

---

## Additional Resources

### Next.js Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

### React Documentation

- [React Hooks](https://react.dev/reference/react)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### TypeScript Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### TailwindCSS Documentation

- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

## Support

For questions or issues:

1. Check this documentation first
2. Review existing code patterns
3. Consult team members
4. Check Next.js/React documentation

---

**Last Updated**: December 2024
**Version**: 1.0.0
