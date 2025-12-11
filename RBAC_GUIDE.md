# Role-Based Access Control (RBAC) Implementation Guide

## ✅ Implementation Complete!

Your Project Hermes now has a complete Role-Based Access Control system with 4 distinct user roles and dashboards.

## 🎯 Features Implemented

### 1. **User Roles**

- **Admin**: Full system access with user management capabilities
- **Investor**: Access to investment opportunities and portfolio management
- **Startup**: Access to funding management and investor connections
- **User**: General access to platform features

### 2. **Role-Based Dashboards**

Each role has its own unique dashboard with role-specific features:

- **Admin Dashboard** (`/dashboard/admin`): Purple/Indigo theme
  - User Management
  - System Analytics
  - Settings Configuration

- **Investor Dashboard** (`/dashboard/investor`): Green/Emerald theme
  - Portfolio Management
  - Startup Discovery
  - Investment Analytics

- **Startup Dashboard** (`/dashboard/startup`): Orange/Red/Pink theme
  - Company Profile Management
  - Funding Status
  - Investor Connections

- **User Dashboard** (`/dashboard/user`): Blue/Cyan theme
  - Profile Management
  - Platform Exploration
  - Activity Tracking

### 3. **Security Features**

✅ **Route Protection**: Middleware protects all `/dashboard/*` routes
✅ **Role Validation**: Each dashboard validates user role on load
✅ **Automatic Redirects**: Unauthorized access redirects to `/unauthorized`
✅ **Session Management**: JWT-based sessions with role information

## 🚀 How to Use

### Step 1: Sign Up with a Role

1. Go to `http://localhost:3000/auth/signup`
2. Fill in your details
3. **Select a role** from the dropdown:
   - General User
   - Investor
   - Startup
   - Admin
4. Click "Sign up"

### Step 2: Automatic Dashboard Redirect

After signing up or signing in, you'll be automatically redirected to your role-specific dashboard:

- Admin → `/dashboard/admin`
- Investor → `/dashboard/investor`
- Startup → `/dashboard/startup`
- User → `/dashboard/user`

### Step 3: Access Control in Action

Try accessing a dashboard that doesn't match your role:

- You'll see an "Access Denied" page
- Automatically redirected to homepage after 3 seconds

## 📝 Testing the System

### Create Different User Accounts:

**Admin User:**

```
Email: admin@example.com
Password: admin123
Role: Admin
```

**Investor User:**

```
Email: investor@example.com
Password: invest123
Role: Investor
```

**Startup User:**

```
Email: startup@example.com
Password: start123
Role: Startup
```

**General User:**

```
Email: user@example.com
Password: user123
Role: General User
```

### Test Access Control:

1. **Sign up as Admin** → Should see Admin Dashboard (purple theme)
2. **Try accessing** `/dashboard/investor` → Should see "Access Denied"
3. **Sign out** and **sign in as Investor** → Should see Investor Dashboard (green theme)
4. **Try accessing** `/dashboard/admin` → Should see "Access Denied"

## 🔒 How RBAC Works

### 1. **Database Level**

```typescript
// Schema includes role enum
role: userRoleEnum('role').default('user').notNull();
// Possible values: 'admin', 'investor', 'startup', 'user'
```

### 2. **Authentication Level**

```typescript
// Role is stored in JWT token and session
session.user.role; // Available in all components
```

### 3. **Route Protection**

```typescript
// Middleware protects dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
```

### 4. **Component Level**

```typescript
// Each dashboard checks user role
if (session.user.role !== 'admin') {
  router.push('/unauthorized');
}
```

## 🛠️ File Structure

```
app/
├── dashboard/
│   ├── admin/
│   │   └── page.tsx       # Admin-only dashboard
│   ├── investor/
│   │   └── page.tsx       # Investor-only dashboard
│   ├── startup/
│   │   └── page.tsx       # Startup-only dashboard
│   └── user/
│       └── page.tsx       # User-only dashboard
├── unauthorized/
│   └── page.tsx           # Access denied page
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts   # NextAuth with role support
│       └── register/
│           └── route.ts   # Registration with role
└── auth/
    ├── signin/
    │   └── page.tsx       # Sign in page
    └── signup/
        └── page.tsx       # Sign up with role selection

lib/
└── db/
    └── schema.ts          # Database schema with role enum

middleware.ts              # Route protection
types/
└── next-auth.d.ts        # TypeScript types for role
```

## 🎨 Dashboard Themes

Each dashboard has a unique color theme for easy visual identification:

- **Admin**: Purple → Indigo → Blue gradient
- **Investor**: Green → Emerald → Teal gradient
- **Startup**: Orange → Red → Pink gradient
- **User**: Blue → Cyan → Sky gradient

## 📊 Database Schema

```sql
-- User roles enum
CREATE TYPE user_role AS ENUM ('admin', 'investor', 'startup', 'user');

-- Users table with role
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  email_verified TIMESTAMP,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## ✨ Next Steps

You can now extend each dashboard with role-specific features:

### Admin Dashboard Enhancements:

- User management (CRUD operations)
- System monitoring
- Analytics and reports
- Role assignment interface

### Investor Dashboard Enhancements:

- Browse available startups
- Investment tracking
- Portfolio analytics
- Communication tools

### Startup Dashboard Enhancements:

- Pitch deck upload
- Funding campaigns
- Investor matching
- Progress tracking

### User Dashboard Enhancements:

- Profile customization
- Content browsing
- Notifications
- Activity history

## 🔐 Security Best Practices

✅ Implemented:

- JWT-based session management
- Password hashing with bcrypt
- Role validation on both client and server
- Protected API routes
- Middleware-based route protection

## 🎉 Success!

Your Role-Based Access Control system is fully functional and ready to use!

**Test it now:**

1. Sign up with different roles
2. Experience automatic dashboard routing
3. Try accessing unauthorized dashboards
4. See the access control in action

Enjoy your secure, role-based authentication system! 🚀
