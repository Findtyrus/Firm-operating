# How to Get Your Credentials - Step by Step

This guide helps you collect all the API keys and credentials you need.

---

## Part 1: Supabase (Database & Storage)

### Create Account & Project (3 minutes)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" → Sign in with GitHub (recommended)
3. Create new organization: **"Magnolia Advisory Group"**
4. Click "New project"
5. Fill in details:
   - **Name:** `magnolia-advisory-os`
   - **Database Password:** Click "Generate a password" → **SAVE THIS!**
   - **Region:** `US East (Ohio)` or `US East (N. Virginia)`
   - **Pricing Plan:** Free (plenty for your needs)
6. Click "Create new project"
7. Wait 2-3 minutes while it sets up

### Collect Supabase Credentials (2 minutes)

Once your project is ready:

**Step 1: Get API Keys**
1. Click the **Settings** icon (gear) in the left sidebar
2. Click **API** in the settings menu
3. Find "Project API keys" section
4. Copy and save:
   ```
   Project URL: https://YOUR_PROJECT_REF.supabase.co
   anon/public key: eyJhbGc... (long key)
   ```

**Step 2: Get Database Connection String**
1. Still in Settings, click **Database** in the left menu
2. Scroll down to "Connection string" section
3. Select the **Session** tab (NOT Transaction or Direct)
4. Copy the connection string:
   ```
   postgresql://postgres.[PROJECT]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

**Save these 3 values:**
- ✅ Project URL
- ✅ Anon key
- ✅ Database URL (with password filled in)

---

## Part 2: Clerk (Authentication)

### Create Account & Application (2 minutes)

1. Go to [https://clerk.com](https://clerk.com)
2. Click "Start building for free"
3. Sign in with Google or GitHub
4. Click "+ Add application"
5. Fill in details:
   - **Application name:** `Magnolia Advisory OS`
   - **Sign-in options:** Check **Email address** only
   - Uncheck social providers (Google, GitHub, etc.) - we don't need them
6. Click "Create application"

### Collect Clerk API Keys (1 minute)

1. You'll be redirected to the dashboard automatically
2. Look for "API Keys" section (or click **API Keys** in the left sidebar)
3. Copy and save:
   ```
   Publishable key: pk_test_... (or pk_live_...)
   Secret key: sk_test_... (click "Show" to reveal, or sk_live_...)
   ```

**Save these 2 values:**
- ✅ Publishable key
- ✅ Secret key

### Create 3 Partner User Accounts (2 minutes)

1. In Clerk dashboard, click **Users** in the left sidebar
2. Click "Create user" button (top right)
3. Create **Partner 1:**
   - **Email address:** `tyrus@magnoliadvisorygroup.com`
   - **First name:** `Tyrus`
   - **Last name:** `Burton`
   - Leave password empty (they'll use magic links)
   - Click "Create"
4. Click on the newly created user
5. Copy their **User ID** (looks like `user_2a3b4c5d...`)
   - **Save this as:** Tyrus Clerk ID

6. Click "← Back to users"
7. Repeat for **Partner 2:**
   - **Email:** `hunter@magnoliadvisorygroup.com`
   - **First name:** `Hunter`
   - **Last name:** `Bass`
   - Copy User ID → Save as: Hunter Clerk ID

8. Repeat for **Partner 3:**
   - **Email:** `christian@magnoliadvisorygroup.com`
   - **First name:** `Christian`
   - **Last name:** `Camacho`
   - Copy User ID → Save as: Christian Clerk ID

**Save these 3 values:**
- ✅ Tyrus User ID (user_...)
- ✅ Hunter User ID (user_...)
- ✅ Christian User ID (user_...)

---

## Part 3: Configure Your Project

### Update .env File

Open `.env` in your project and replace:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_PASTE_HERE
CLERK_SECRET_KEY=sk_test_PASTE_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
DATABASE_URL=postgresql://postgres.PASTE_HERE
NEXT_PUBLIC_SUPABASE_URL=https://PASTE_HERE.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ_PASTE_HERE
```

### Update Seed File with Clerk User IDs

Open `prisma/seed.ts` and find lines 8-26. Replace:

```typescript
const partners = [
  {
    clerkId: "user_PASTE_TYRUS_ID_HERE",    // Line 9 - Replace this
    name: "Tyrus L. Burton Jr.",
    email: "tyrus@magnoliadvisorygroup.com",
    division: "ACCOUNTING" as const,
    role: "PARTNER" as const,
  },
  {
    clerkId: "user_PASTE_HUNTER_ID_HERE",   // Line 15 - Replace this
    name: "Hunter Bass",
    email: "hunter@magnoliadvisorygroup.com",
    division: "ACCOUNTING" as const,
    role: "PARTNER" as const,
  },
  {
    clerkId: "user_PASTE_CHRISTIAN_ID_HERE", // Line 21 - Replace this
    name: "Christian Camacho",
    email: "christian@magnoliadvisorygroup.com",
    division: "BIZDEV" as const,
    role: "PARTNER" as const,
  },
];
```

---

## Part 4: Initialize Database & Launch

Run these commands in order:

```bash
# 1. Generate Prisma client
npm run db:generate

# 2. Push schema to Supabase
npm run db:push

# 3. Seed sample data
npm run db:seed

# 4. Start dev server
npm run dev
```

Expected output:
```
✓ Generated Prisma Client
✓ Database schema pushed
🌱 Seeding database...
✅ Created 3 partners
✅ Created 5 clients
✅ Created 7 tasks
✅ Created 3 invoices

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## Part 5: Sign In & Test

1. Open [http://localhost:3000](http://localhost:3000)
2. You'll be redirected to `/sign-in`
3. Enter one of the partner emails:
   - `tyrus@magnoliadvisorygroup.com`
   - `hunter@magnoliadvisorygroup.com`
   - `christian@magnoliadvisorygroup.com`
4. Click "Continue"
5. Clerk sends a magic link (one-time code)
6. To get the link in development:
   - Open Clerk dashboard
   - Go to **Users**
   - Click the user you're signing in as
   - Click **Sessions** tab
   - You'll see the magic link URL - copy and paste it

7. After signing in, you should see:
   - ✅ Firm Overview Dashboard with metrics
   - ✅ Sample clients, tasks, and invoices
   - ✅ Navigation works
   - ✅ My Dashboard shows personalized data

---

## Credential Storage Tips

**For Development:**
Create a secure note (Apple Notes, 1Password, etc.) with:
```
Magnolia Advisory OS Credentials

Supabase:
- Project URL: https://...
- Anon Key: eyJ...
- Database URL: postgresql://...
- Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT

Clerk:
- Publishable Key: pk_test_...
- Secret Key: sk_test_...
- Dashboard: https://dashboard.clerk.com

Partner User IDs:
- Tyrus: user_...
- Hunter: user_...
- Christian: user_...
```

**For Production:**
- Never commit `.env` to git (already in .gitignore)
- Use Vercel environment variables for deployment
- Rotate keys if accidentally exposed

---

## Support Resources

- **Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **Clerk Docs:** [https://clerk.com/docs](https://clerk.com/docs)
- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs:** [https://www.prisma.io/docs](https://www.prisma.io/docs)

---

**Estimated Total Time:** 10-15 minutes from start to running app
