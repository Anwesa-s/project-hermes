# Complete Step-by-Step Setup Guide for Project Hermes

## Part 1: Setting Up Google OAuth Credentials

### Step 1: Create a Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project**
   - Click the project dropdown at the top of the page (next to "Google Cloud")
   - Click "NEW PROJECT"
   - Enter a project name (e.g., "Project Hermes" or "My Auth App")
   - Click "CREATE"
   - Wait for the project to be created (you'll see a notification)

3. **Select Your New Project**
   - Click the project dropdown again
   - Select your newly created project

### Step 2: Enable Google+ API (Required for OAuth)

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" → "Library"
   - Or visit: https://console.cloud.google.com/apis/library

2. **Enable Required API**
   - Search for "Google+ API" in the search box
   - Click on "Google+ API"
   - Click the "ENABLE" button
   - Wait for it to enable (takes a few seconds)

### Step 3: Configure OAuth Consent Screen

1. **Go to OAuth Consent Screen**
   - In the left sidebar, click "OAuth consent screen"
   - Or visit: https://console.cloud.google.com/apis/credentials/consent

2. **Choose User Type**
   - Select "External" (allows anyone with a Google account to sign in)
   - Click "CREATE"

3. **Fill in App Information**
   - **App name**: Enter your app name (e.g., "Project Hermes")
   - **User support email**: Select your email from the dropdown
   - **App logo**: (Optional) Skip for now
   - **Application home page**: Enter `http://localhost:3000` for development
   - **Authorized domains**: Leave empty for now (needed only for production)
   - **Developer contact information**: Enter your email address
   - Click "SAVE AND CONTINUE"

4. **Scopes**
   - Click "ADD OR REMOVE SCOPES"
   - The default scopes (email, profile, openid) are already selected
   - Click "UPDATE"
   - Click "SAVE AND CONTINUE"

5. **Test Users** (Only for External apps in testing mode)
   - Click "ADD USERS"
   - Add your email address and any other test users
   - Click "ADD"
   - Click "SAVE AND CONTINUE"

6. **Summary**
   - Review your settings
   - Click "BACK TO DASHBOARD"

### Step 4: Create OAuth 2.0 Credentials

1. **Go to Credentials**
   - In the left sidebar, click "Credentials"
   - Or visit: https://console.cloud.google.com/apis/credentials

2. **Create OAuth Client ID**
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "OAuth client ID"

3. **Configure the OAuth Client**
   - **Application type**: Select "Web application"
   - **Name**: Enter a name (e.g., "Web Client" or "Development Client")
   - **Authorized JavaScript origins**:
     - Click "ADD URI"
     - Enter: `http://localhost:3000`
   - **Authorized redirect URIs**:
     - Click "ADD URI"
     - Enter: `http://localhost:3000/api/auth/callback/google`
     - For production, also add: `https://yourdomain.com/api/auth/callback/google`
   - Click "CREATE"

4. **Copy Your Credentials**
   - A popup will show your credentials
   - **Copy the Client ID** (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
   - **Copy the Client Secret** (looks like: `GOCSPX-abc123def456ghi789`)
   - Click "OK"

   ⚠️ **Important**: Keep these credentials secure! Don't share them publicly.

### Step 5: Add Credentials to Your Project

1. **Open your `.env.local` file** in VS Code
   - Located at: `d:\HERMES\project-hermes\.env.local`

2. **Update the file with your credentials**:

   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=jvoUBJOvwoH3LKD8Ou5HkfkEit53MHsTNWYpf+v00qE=

   # Google OAuth
   GOOGLE_CLIENT_ID=paste-your-client-id-here
   GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
   ```

3. **Save the file** (Ctrl+S)

---

## Part 2: Setting Up PostgreSQL Database

### Option A: Using Local PostgreSQL Installation

#### Step 1: Install PostgreSQL

**Windows:**

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Set a password for the postgres user (remember this!)
   - Default port: 5432 (keep it)
   - Remember the installation directory
4. Complete the installation

#### Step 2: Create Database

1. **Open pgAdmin 4** (installed with PostgreSQL)
2. Connect to your local server (enter the password you set)
3. Right-click on "Databases" → "Create" → "Database"
4. **Database name**: `hermes_db` (or any name you prefer)
5. Click "Save"

#### Step 3: Update Connection String

1. Open `.env.local`
2. Update `DATABASE_URL`:
   ```env
   DATABASE_URL=postgresql://postgres:your-password@localhost:5432/hermes_db
   ```
   Replace:
   - `your-password` with your PostgreSQL password
   - `hermes_db` with your database name

### Option B: Using Neon (Free Cloud PostgreSQL)

#### Step 1: Create Neon Account

1. Go to: https://neon.tech/
2. Click "Sign Up" or "Get Started"
3. Sign up with GitHub, Google, or email

#### Step 2: Create a Project

1. Click "Create Project"
2. **Project name**: `project-hermes`
3. **Region**: Select closest to you
4. **Postgres version**: Keep default (16)
5. Click "Create Project"

#### Step 3: Get Connection String

1. After project creation, you'll see the connection details
2. **Copy the connection string** (starts with `postgresql://`)
3. It looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

#### Step 4: Update .env.local

1. Open `.env.local`
2. Paste the connection string:
   ```env
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### Option C: Using Supabase (Free Alternative)

#### Step 1: Create Supabase Account

1. Go to: https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub or email

#### Step 2: Create a Project

1. Click "New Project"
2. Select your organization (or create one)
3. **Name**: `project-hermes`
4. **Database Password**: Create a strong password (save it!)
5. **Region**: Select closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for setup

#### Step 3: Get Connection String

1. In your project dashboard, click "Project Settings" (gear icon)
2. Click "Database" in the left sidebar
3. Scroll to "Connection string"
4. Select "URI" tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual password

#### Step 4: Update .env.local

```env
DATABASE_URL=postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres
```

---

## Part 3: Initialize Database Schema

### Step 1: Generate Migration Files

Open a terminal in VS Code and run:

```bash
pnpm db:generate
```

This creates migration files in the `drizzle` folder based on your schema.

### Step 2: Push Schema to Database

```bash
pnpm db:push
```

This creates all the tables (users, accounts, sessions, verification_tokens) in your database.

### Step 3: Verify Database (Optional)

To view your database in a GUI:

```bash
pnpm db:studio
```

This opens Drizzle Studio in your browser where you can see all tables and data.

---

## Part 4: Run Your Application

### Step 1: Install Dependencies (if not already done)

```bash
pnpm install
```

### Step 2: Start Development Server

```bash
pnpm dev
```

You should see:

```
> hermes@0.1.0 dev
> next dev

  ▲ Next.js 16.0.7
  - Local:        http://localhost:3000
  - ready in 2.5s
```

### Step 3: Test the Application

1. **Open your browser**: http://localhost:3000

2. **Test Sign Up** (Credentials):
   - Go to: http://localhost:3000/auth/signup
   - Enter your name, email, and password
   - Click "Sign up"
   - You should be automatically signed in and redirected to home

3. **Test Sign In** (Credentials):
   - Go to: http://localhost:3000/auth/signin
   - Enter your email and password
   - Click "Sign in"
   - You should be signed in and redirected

4. **Test Google OAuth**:
   - Go to: http://localhost:3000/auth/signin
   - Click "Sign in with Google"
   - Select your Google account
   - Grant permissions
   - You should be signed in and redirected

---

## Part 5: Troubleshooting

### Issue: "Database connection error"

**Solution:**

- Verify `DATABASE_URL` is correct in `.env.local`
- Make sure PostgreSQL is running (if local)
- Test connection in Drizzle Studio: `pnpm db:studio`

### Issue: "Invalid client: redirect_uri mismatch"

**Solution:**

- Go to Google Cloud Console → Credentials
- Edit your OAuth Client
- Make sure redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- No trailing slash!

### Issue: Google OAuth shows "This app is blocked"

**Solution:**

- You need to add your email as a test user
- Go to OAuth Consent Screen → Test Users → Add Users
- Or publish your app (for production)

### Issue: "NEXTAUTH_URL is not defined"

**Solution:**

- Make sure `.env.local` has: `NEXTAUTH_URL=http://localhost:3000`
- Restart your dev server after editing `.env.local`

### Issue: Password not working after sign up

**Solution:**

- Check browser console for errors
- Verify user was created in database (use `pnpm db:studio`)
- Make sure bcryptjs is installed: `pnpm add bcryptjs`

---

## Part 6: Next Steps (Optional)

### Add Protected Routes

Create `middleware.ts` in project root:

```typescript
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

### Access User Session in Components

**Server Component:**

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <div>Hello {session?.user?.name}</div>;
}
```

**Client Component:**

```typescript
"use client";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  return <div>Hello {session?.user?.name}</div>;
}
```

### Sign Out

```typescript
import { signOut } from "next-auth/react";

<button onClick={() => signOut()}>Sign Out</button>
```

---

## Summary Checklist

- ✅ Created Google Cloud Project
- ✅ Enabled Google+ API
- ✅ Configured OAuth Consent Screen
- ✅ Created OAuth Client credentials
- ✅ Added credentials to `.env.local`
- ✅ Set up PostgreSQL database (Local/Neon/Supabase)
- ✅ Updated `DATABASE_URL` in `.env.local`
- ✅ Ran `pnpm db:push` to create tables
- ✅ Started dev server with `pnpm dev`
- ✅ Tested sign up/sign in (both credentials and Google)

**You're all set! 🎉**

If you encounter any issues, refer to the Troubleshooting section above.
