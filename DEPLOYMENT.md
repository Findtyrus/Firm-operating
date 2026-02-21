# Deployment Guide - Magnolia Advisory OS

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **Supabase Project** - Already configured
3. **Clerk Account** - Already configured
4. **GitHub Repository** - Push code to GitHub

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Magnolia Advisory OS"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next`

## Step 3: Add Environment Variables

In Vercel dashboard, add these environment variables:

### Database
```
DATABASE_URL=<your-supabase-pooler-url>?pgbouncer=true&sslmode=disable
DIRECT_URL=<your-supabase-direct-url>?sslmode=disable
```

### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from-clerk-dashboard>
CLERK_SECRET_KEY=<from-clerk-dashboard>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Supabase Storage
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## Step 4: Update Clerk Settings

In Clerk Dashboard:
1. Go to **Paths** settings
2. Set Authorized Redirect URLs:
   - `https://your-app.vercel.app/dashboard`
3. Set Application URLs:
   - Home URL: `https://your-app.vercel.app`

## Step 5: Database Migration

After first deployment:
```bash
# From your local machine
npx prisma db push --accept-data-loss
npx prisma db seed
```

## Step 6: Verify Deployment

1. Visit your Vercel URL
2. Sign in with Clerk
3. Verify all pages load correctly
4. Test file uploads
5. Create test data

## Production Checklist

- [ ] Environment variables configured
- [ ] Clerk redirect URLs updated
- [ ] Database schema pushed
- [ ] Seed data loaded
- [ ] File uploads working
- [ ] All pages accessible
- [ ] Mobile responsive tested
- [ ] Error handling verified

## Monitoring

### Vercel Analytics
Enable in Vercel dashboard for:
- Page load times
- Error tracking
- User analytics

### Database Performance
Monitor in Supabase dashboard:
- Query performance
- Connection pooling
- Storage usage

## Ongoing Maintenance

### Weekly
- Review error logs in Vercel
- Check database performance
- Monitor storage usage

### Monthly
- Review and archive old files
- Database backup verification
- Security updates

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Clerk Docs: https://clerk.com/docs
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify `prisma generate` runs successfully
- Check build logs for missing dependencies

### 404 Errors
- Verify Clerk configuration
- Check middleware.ts public routes
- Confirm all routes in app directory

### Database Connection Issues
- Verify connection strings
- Check Supabase project is active
- Test with `prisma db push`

### File Upload Fails
- Check Supabase bucket permissions
- Verify service role key
- Test storage access

## Custom Domain Setup (Optional)

1. In Vercel, go to project Settings → Domains
2. Add your custom domain (e.g., app.magnoliaadvisory.com)
3. Update DNS records as instructed
4. Update Clerk authorized domains
5. Test SSL certificate
