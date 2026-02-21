# Setup Guide - Magnolia Advisory OS

This guide walks you through setting up the Magnolia Advisory Group Operating System from scratch.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account (free tier works)
- A Clerk account (free tier works)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Set project details:
   - **Name:** magnolia-advisory-os
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to Mississippi (US East)
5. Click "Create new project" and wait 2-3 minutes for setup

#### Get Your Supabase Credentials

1. In your Supabase project, go to **Project Settings** (gear icon)
2. Go to **API** tab
3. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
4. Go to **Database** tab
5. Scroll down to "Connection string" section
6. Select **Session mode** (not Transaction mode)
7. Copy the connection string (it looks like `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@...`)
8. Replace `[YOUR-PASSWORD]` in the connection string with your database password

### 3. Set Up Clerk Authentication

#### Create a Clerk Application

1. Go to [clerk.com](https://clerk.com) and sign in
2. Click "Add application"
3. Application name: **Magnolia Advisory OS**
4. Sign-in options: Select **Email** only (no social providers needed)
5. Click "Create application"

#### Get Your Clerk Keys

1. In your Clerk dashboard, go to **API Keys**
2. Copy these values:
   - **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret key** (starts with `sk_test_...` or `sk_live_...`)

#### Create Partner Accounts

You need to create 3 user accounts in Clerk for the partners:

1. In Clerk dashboard, go to **Users**
2. Click "Create user"
3. Create these three accounts:

   **Partner 1: Tyrus L. Burton Jr.**
   - Email: `tyrus@magnoliadvisorygroup.com`
   - First name: Tyrus
   - Last name: Burton

   **Partner 2: Hunter Bass**
   - Email: `hunter@magnoliadvisorygroup.com`
   - First name: Hunter
   - Last name: Bass

   **Partner 3: Christian Camacho**
   - Email: `christian@magnoliadvisorygroup.com`
   - First name: Christian
   - Last name: Camacho

4. After creating each user, click on them and copy their **User ID** (starts with `user_...`)

### 4. Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace the placeholder values:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...YOUR_ANON_KEY
```

### 5. Update Seed Data with Clerk IDs

1. Open `prisma/seed.ts`
2. Find the `partners` array (around line 8)
3. Replace the placeholder Clerk IDs with the actual User IDs you copied:

```typescript
const partners = [
  {
    clerkId: "user_ACTUAL_TYRUS_ID_HERE",  // Replace this
    name: "Tyrus L. Burton Jr.",
    email: "tyrus@magnoliadvisorygroup.com",
    // ...
  },
  {
    clerkId: "user_ACTUAL_HUNTER_ID_HERE",  // Replace this
    name: "Hunter Bass",
    // ...
  },
  {
    clerkId: "user_ACTUAL_CHRISTIAN_ID_HERE",  // Replace this
    name: "Christian Camacho",
    // ...
  },
];
```

### 6. Set Up Database Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push
```

When prompted, confirm you want to push the schema.

### 7. Seed Initial Data

```bash
npm run db:seed
```

This will create:
- 3 partner profiles
- 5 sample clients
- 7 sample tasks
- 3 sample invoices

### 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 9. Sign In

1. Click "Sign in"
2. Use one of the partner email addresses:
   - `tyrus@magnoliadvisorygroup.com`
   - `hunter@magnoliadvisorygroup.com`
   - `christian@magnoliadvisorygroup.com`
3. Clerk will send a magic link to the email
4. Check the email and click the link to sign in

**Note:** In development, you can view magic links in the Clerk dashboard under **Users** > click the user > **Sessions** tab.

## Troubleshooting

### "Partner profile not found"

This means the Clerk User ID in the database doesn't match your actual Clerk account ID.

**Fix:**
1. Sign in to Clerk dashboard
2. Go to Users and find your account
3. Copy the User ID
4. Update `prisma/seed.ts` with the correct Clerk ID
5. Run `npm run db:seed` again

### Database connection errors

Make sure:
- Your DATABASE_URL in `.env` is correct
- Your Supabase project is running (not paused)
- You've replaced `[YOUR-PASSWORD]` with your actual database password
- You're using the Session mode connection string (not Transaction mode)

### Clerk authentication not working

Make sure:
- Your Clerk keys in `.env` are correct
- You've created user accounts in Clerk dashboard
- The email addresses match exactly

## Next Steps

Once the foundation is working:
1. Test both dashboards (Firm Overview and My Dashboard)
2. Verify navigation works
3. Check that seed data appears correctly
4. Then proceed to build SOPs and Financial Tracking features

## Need Help?

Check the main [README.md](./README.md) for more information about the project structure and features.
