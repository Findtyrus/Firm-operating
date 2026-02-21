# 🚀 Deployment Checklist - Magnolia Advisory OS

Use this checklist to deploy the system to production.

---

## Pre-Deployment Checklist

### Local Development ✅ Complete
- [x] All features implemented
- [x] TypeScript compiles with 0 errors
- [x] All dependencies installed
- [x] Environment variables documented
- [x] Seed script ready
- [x] Documentation complete

---

## Step 1: Set Up External Services

### Supabase (5 minutes)
- [ ] Create project at [supabase.com](https://supabase.com)
- [ ] Name: `magnolia-advisory-os`
- [ ] Region: US East
- [ ] Save database password
- [ ] Get Project URL from Settings → API
- [ ] Get anon/public key from Settings → API
- [ ] Get DATABASE_URL from Settings → Database (Session mode)
- [ ] Create storage bucket named `magnolia-files`
  - Go to Storage → Create bucket
  - Name: `magnolia-files`
  - Public: Yes (for file downloads)
- [ ] Enable Row Level Security (optional, for added security)

### Clerk (5 minutes)
- [ ] Create application at [clerk.com](https://clerk.com)
- [ ] Name: `Magnolia Advisory OS`
- [ ] Enable: Email sign-in only
- [ ] Get Publishable Key from Dashboard → API Keys
- [ ] Get Secret Key from Dashboard → API Keys
- [ ] Create 3 partner accounts in Dashboard → Users:
  - [ ] `tyrus@magnoliadvisorygroup.com`
  - [ ] `hunter@magnoliadvisorygroup.com`
  - [ ] `christian@magnoliadvisorygroup.com`
- [ ] Copy User ID from each partner profile

---

## Step 2: Configure Local Environment

### Update .env (2 minutes)
- [ ] Open `.env` file
- [ ] Add Clerk Publishable Key
- [ ] Add Clerk Secret Key
- [ ] Add Supabase DATABASE_URL (with password)
- [ ] Add Supabase Project URL
- [ ] Add Supabase anon key
- [ ] Save file

### Update Seed Script (1 minute)
- [ ] Open `prisma/seed.ts`
- [ ] Line 10: Replace `"user_tyrus"` with Tyrus's actual Clerk User ID
- [ ] Line 17: Replace `"user_hunter"` with Hunter's actual Clerk User ID
- [ ] Line 24: Replace `"user_christian"` with Christian's actual Clerk User ID
- [ ] Save file

---

## Step 3: Initialize Database

### Run Setup Commands (2 minutes)
```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase
npm run db:push

# Seed initial data (partners, clients, tasks, invoices, SOPs)
npm run db:seed
```

### Verify Database
- [ ] No errors in terminal
- [ ] Open Supabase dashboard → Table Editor
- [ ] Verify tables exist: partners, clients, tasks, sops, invoices, expenses, time_entries, files
- [ ] Verify data seeded (5 clients, 7 tasks, 6 SOPs, 3 invoices)

---

## Step 4: Test Locally

### Run Development Server
```bash
npm run dev
```

### Test Features (15 minutes)
- [ ] Open http://localhost:3000
- [ ] Redirects to sign-in
- [ ] Sign in with `tyrus@magnoliadvisorygroup.com`
- [ ] Get magic link from Clerk dashboard (Users → Tyrus → Sessions)
- [ ] Verify Firm Overview Dashboard loads
  - [ ] Shows 5 active clients
  - [ ] Shows $2,700 total MRR
  - [ ] Shows division breakdown
  - [ ] Shows tasks and activity
  - [ ] Standing Rules display
- [ ] Click "My Dashboard"
  - [ ] Shows personalized welcome
  - [ ] Shows Tyrus's 2 clients
  - [ ] Shows his $1,275 MRR
  - [ ] Shows his tasks
- [ ] Navigate to Clients
  - [ ] 5 clients appear
  - [ ] Search works
  - [ ] Filters work
- [ ] Navigate to Tasks
  - [ ] Kanban board shows 4 columns
  - [ ] 7 tasks distributed across columns
  - [ ] Drag and drop works (try moving a task)
- [ ] Navigate to SOPs
  - [ ] 6 SOPs appear
  - [ ] Click one → Content displays
  - [ ] Checklists are interactive
  - [ ] Search works
- [ ] Navigate to Financials
  - [ ] MRR metrics display
  - [ ] 3 invoices appear
  - [ ] MRR breakdown shows all clients
- [ ] Navigate to Files
  - [ ] Empty state (no files yet)
- [ ] Press **Cmd+K**
  - [ ] Command palette opens
  - [ ] Type and search works
  - [ ] Navigation works
- [ ] Press **Cmd+T**
  - [ ] New task form opens
- [ ] Sign out and sign in as Hunter
  - [ ] Different data on "My Dashboard"
- [ ] Sign out and sign in as Christian
  - [ ] Different data on "My Dashboard"

---

## Step 5: Deploy to Vercel

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Magnolia Advisory OS complete"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/magnolia-advisory-os.git
git push -u origin main
```

### Connect to Vercel
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project:
  - [ ] Framework Preset: Next.js (auto-detected)
  - [ ] Build Command: `npm run build` (default)
  - [ ] Output Directory: `.next` (default)
- [ ] Add Environment Variables:
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  CLERK_SECRET_KEY
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
  DATABASE_URL (use Direct connection, not pgBouncer)
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  ```
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes for build

### Update Clerk Settings
- [ ] In Clerk dashboard, go to your app
- [ ] Go to Domains
- [ ] Add your Vercel domain (e.g., `magnolia-advisory.vercel.app`)
- [ ] Update allowed redirect URLs to include production domain

---

## Step 6: Test Production

### Smoke Test Production Site
- [ ] Open your Vercel deployment URL
- [ ] Sign in with partner account
- [ ] Verify dashboard loads
- [ ] Check that all data appears
- [ ] Test navigation
- [ ] Test Cmd+K command palette
- [ ] Create a test task
- [ ] Create a test SOP
- [ ] Upload a test file

### Performance Check
- [ ] Dashboard loads in < 3 seconds
- [ ] Navigation is instant (< 500ms)
- [ ] No console errors
- [ ] Mobile responsive (test on phone)

---

## Step 7: Partner Onboarding

### Internal Launch
- [ ] Send Vercel URL to all 3 partners
- [ ] Each partner signs in and sets up account
- [ ] Give quick 10-minute demo:
  - [ ] Show Firm Overview vs My Dashboard
  - [ ] Demonstrate Kanban board
  - [ ] Show how to search SOPs
  - [ ] Teach Cmd+K shortcuts
  - [ ] Show how to create tasks
  - [ ] Explain Standing Rules importance
- [ ] Share `KEYBOARD_SHORTCUTS.md` with team
- [ ] Schedule weekly check-in to gather feedback

---

## Step 8: Ongoing Maintenance

### Weekly
- [ ] Check for overdue tasks
- [ ] Review outstanding invoices
- [ ] Update any SOPs that changed
- [ ] Clean up completed tasks (archive old ones)

### Monthly
- [ ] Review MRR trends
- [ ] Generate monthly P&L (in system)
- [ ] Review SOP library (mark last reviewed dates)
- [ ] Check Supabase usage (storage, database size)
- [ ] Check Vercel analytics

### Quarterly
- [ ] Review and update all SOPs
- [ ] Add new SOPs as processes evolve
- [ ] Export data backup (Supabase dashboard)
- [ ] Review user feedback, plan enhancements

---

## 🔧 Production Settings

### Supabase
- [ ] Enable database backups (Settings → Database → Point-in-time Recovery)
- [ ] Set up RLS policies if needed (for multi-user security)
- [ ] Monitor connection pooling (should be automatic)

### Clerk
- [ ] Enable MFA for partner accounts (optional)
- [ ] Set up password policy (if using passwords)
- [ ] Monitor sign-in activity

### Vercel
- [ ] Enable Vercel Analytics (free)
- [ ] Set up custom domain (optional)
- [ ] Configure preview deployments for testing

---

## 🐛 Troubleshooting Production

### Build Fails
- Check: All environment variables are set in Vercel
- Check: DATABASE_URL is the direct connection string (not pooler URL for build)
- Solution: Add `?connection_limit=1` to DATABASE_URL

### Database Connection Issues
- Check: Supabase project isn't paused
- Check: DATABASE_URL includes password
- Solution: Use Session mode connection string

### Authentication Fails
- Check: Clerk domain is added to allowed domains
- Check: CLERK_SECRET_KEY is set in Vercel
- Solution: Verify API keys are from correct Clerk application

### Files Don't Upload
- Check: Supabase storage bucket `magnolia-files` exists
- Check: Bucket is public
- Check: NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
- Solution: Recreate bucket with public access

---

## 📊 Success Metrics

After 1 week of use, you should see:
- [ ] All 3 partners signed in and active
- [ ] At least 10 tasks created and managed
- [ ] At least 2 SOPs referenced in tasks
- [ ] All invoices tracked and statuses updated
- [ ] Command palette used daily (Cmd+K)
- [ ] Partners report system is "helpful and intuitive"

After 1 month of use:
- [ ] 10+ clients in system
- [ ] 50+ tasks created
- [ ] SOPs updated with real-world learnings
- [ ] Partners can't imagine working without it

---

## 🎉 Deployment Complete Criteria

You're done when:
- ✅ Production site is live on Vercel
- ✅ All 3 partners can sign in
- ✅ Sample data appears correctly
- ✅ All features work in production
- ✅ Mobile responsive
- ✅ No errors in console
- ✅ Partners are trained and using it

---

**Estimated deployment time:** 30-45 minutes total

**Difficulty:** Easy (well-documented, step-by-step)

**Cost:** $0/month (all free tiers)

---

Ready to deploy? Start with Step 1! 🚀
