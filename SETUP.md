# Project Hermes - NextAuth Setup Complete

## Setup Instructions

### 1. Database Setup

First, set up your PostgreSQL database and update the `.env.local` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=jvoUBJOvwoH3LKD8Ou5HkfkEit53MHsTNWYpf+v00qE=
```

**Note:** A secure `NEXTAUTH_SECRET` has been pre-generated for you. Change it in production if needed.

### 2. Database Migration

Run the following commands to set up your database schema:

```bash
# Generate migration files
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 3. Google OAuth Setup

To enable Google OAuth sign-in, you need to create OAuth credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Click "Create Credentials" → "OAuth client ID"
4. Configure the consent screen if prompted
5. Set Application type to "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy the Client ID and Client Secret

Add the credentials to `.env.local`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Run the Application

```bash
pnpm dev
```

## Features Implemented

✅ **NextAuth Configuration**

- JWT session strategy
- Credentials provider (email/password)
- Google OAuth provider
- Custom callbacks for JWT and session
- Pre-generated secure NEXTAUTH_SECRET

✅ **Database Schema (Drizzle + PostgreSQL)**

- Users table with email, password, name, image
- Accounts table for OAuth providers
- Sessions table for session management
- Verification tokens table

✅ **Authentication Pages**

- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/auth/error` - Error page

✅ **API Routes**

- `/api/auth/[...nextauth]` - NextAuth handler
- `/api/auth/register` - User registration endpoint

✅ **Utilities**

- Password hashing with bcryptjs
- Password verification
- TypeScript types for NextAuth

✅ **Session Provider**

- Wrapped app with SessionProvider for client-side session access

## Usage

### Access Session in Server Components

```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello {session.user.name}</div>;
}
```

### Access Session in Client Components

```tsx
'use client';

import { useSession, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return (
    <div>
      <p>Hello {session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Protect Routes with Middleware (Optional)

Create `middleware.ts` in the root:

```tsx
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/protected/:path*'],
};
```

## Database Commands

- `pnpm db:generate` - Generate migration files
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Drizzle Studio (database GUI)
