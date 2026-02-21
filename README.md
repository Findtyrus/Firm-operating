# Magnolia Advisory OS

Internal operating system for Magnolia Advisory Group - a partner-led advisory firm specializing in accounting and business development services.

## Features

### Client Management
- Complete client profiles with contact information
- Status tracking (Prospect → Onboarding → Active)
- Engagement level monitoring
- Service package and MRR tracking
- Client activity logs for all interactions

### Work Management
- **Tasks**: Kanban board and list views with priorities
- **SOPs**: Interactive checklist library for standardized processes
- **Time Tracking**: Log billable hours against clients and tasks
- **Team Capacity**: Monitor partner workload and distribution

### Financial Tracking
- Invoice management linked to clients
- MRR tracking by division (Accounting/BizDev)
- Integration-ready with QuickBooks Online

### File Management
- Client-specific file storage
- Categories: Contracts, Tax Returns, Invoices, Receipts, etc.
- PDF and document upload support
- Supabase-powered storage

### Dashboards
- **Firm Dashboard**: Company-wide metrics and activity
- **Personal Dashboard**: Individual partner's clients, tasks, and workload
- Real-time overdue task alerts

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **UI**: Shadcn/ui components with Apple-inspired design
- **Authentication**: Clerk
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **Storage**: Supabase Storage
- **Editor**: Tiptap (for SOPs)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account with PostgreSQL database
- Clerk account for authentication

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Fill in your Supabase, Clerk, and database credentials
```

4. Initialize database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

The app will automatically build and deploy.

## Project Structure

```
app/
├── (authenticated)/      # Protected routes
│   ├── clients/         # Client management
│   ├── tasks/           # Task management
│   ├── sops/            # SOP library
│   ├── time-tracking/   # Time entry logging
│   ├── team/            # Team capacity
│   ├── financials/      # Invoices and MRR
│   └── files/           # File management
├── api/                 # API routes
└── sign-in/            # Authentication

components/              # Reusable UI components
prisma/                 # Database schema and seed
lib/                    # Utility functions
```

## Key Features by Role

### Partners
- Personal dashboard with assigned clients and tasks
- Time tracking for billable hours
- Client activity logging
- File uploads

### Firm Leadership
- Firm-wide dashboard with all metrics
- Team capacity and workload distribution
- MRR tracking by division
- Standing rules enforcement

## Standing Rules

The system enforces Magnolia Advisory's key operating principles:
- Never start work until: Agreement signed + Invoice paid + Access confirmed
- Never accept clients outside ICP
- Never do out-of-scope work without change order
- Always deliver reports by 5th-10th of month
- Always require full payment upfront
- Always match price to value

## Support

For issues or questions:
1. Check [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Contact your system administrator

## License

Internal use only - Magnolia Advisory Group

## Version

1.0.0 - Production Ready
