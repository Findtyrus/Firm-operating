# Quick Start - Get Running in 10 Minutes

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Clerk account created

## 1. Install (1 min)

```bash
npm install
```

## 2. Supabase Setup (3 min)

1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `magnolia-advisory-os`
3. Generate & save password
4. Wait for project to initialize
5. Go to Settings → API:
   - Copy **Project URL**
   - Copy **anon public key**
6. Go to Settings → Database:
   - Copy **Session mode connection string**
   - Replace `[YOUR-PASSWORD]` with your actual password

## 3. Clerk Setup (3 min)

1. Go to [clerk.com](https://clerk.com) → Add application
2. Name: `Magnolia Advisory OS`
3. Enable **Email** sign-in only
4. Go to API Keys:
   - Copy **Publishable key**
   - Copy **Secret key**
5. Go to Users → Create these 3 accounts:
   - `tyrus@magnoliadvisorygroup.com`
   - `hunter@magnoliadvisorygroup.com`
   - `christian@magnoliadvisorygroup.com`
6. Click each user and copy their **User ID** (starts with `user_`)

## 4. Configure Environment (1 min)

Edit `.env` file and add your real credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
CLERK_SECRET_KEY=sk_test_YOUR_KEY
DATABASE_URL=postgresql://postgres.[PROJECT]:[PASSWORD]@...
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...YOUR_KEY
```

## 5. Update Seed Data (1 min)

Edit `prisma/seed.ts` lines 8-10 and replace placeholder IDs:

```typescript
clerkId: "user_PASTE_TYRUS_ID_HERE",    // Line 9
clerkId: "user_PASTE_HUNTER_ID_HERE",   // Line 15
clerkId: "user_PASTE_CHRISTIAN_ID_HERE", // Line 21
```

## 6. Initialize Database (1 min)

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## 7. Run! (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Sign in with any partner email. Clerk will show you the magic link in the dashboard (Users → click user → Sessions).

## ✅ You Should See:

- **Firm Overview Dashboard** with 5 clients, MRR stats, tasks
- **My Dashboard** with your personalized metrics
- Working navigation between pages
- Standing Rules displayed
- Sample tasks and clients from seed data

## 🚨 Troubleshooting

**"Partner profile not found"**
→ The Clerk User ID in seed.ts doesn't match. Double-check you copied the right IDs.

**Database connection error**
→ Check your DATABASE_URL is correct and Supabase project isn't paused.

**Clerk auth not working**
→ Verify your API keys in .env are correct.

## Next Steps

Once the foundation works, proceed to build:
1. SOP Library (with Tiptap rich text editor)
2. Task Management (Kanban board + recurring tasks)
3. Financial Tracking (invoices + expenses + P&L)

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed status.
