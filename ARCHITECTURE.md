# Architecture Overview - Magnolia Advisory OS

## System Architecture

```mermaid
graph TB
    subgraph browser [Browser - Partner's Device]
        UI[Next.js UI<br/>React Components]
    end
    
    subgraph nextjs [Next.js Application - Vercel]
        ServerComponents[Server Components<br/>Dashboard Pages]
        API[API Routes<br/>Future Endpoints]
        Middleware[Clerk Middleware<br/>Auth Protection]
    end
    
    subgraph services [External Services]
        Clerk[Clerk Auth<br/>3 Partner Accounts]
        Supabase[(Supabase PostgreSQL<br/>All Firm Data)]
        Storage[Supabase Storage<br/>File Uploads]
    end
    
    UI --> ServerComponents
    UI --> Middleware
    Middleware --> Clerk
    ServerComponents --> Prisma[Prisma ORM<br/>Type-Safe Queries]
    API --> Prisma
    Prisma --> Supabase
    API --> Storage
    
    style ServerComponents fill:#2E5435,stroke:#C9A84C,color:#fff
    style Clerk fill:#6C47FF,stroke:#fff,color:#fff
    style Supabase fill:#3ECF8E,stroke:#fff,color:#000
```

## Data Flow: Partner Sign In

```mermaid
sequenceDiagram
    participant P as Partner
    participant B as Browser
    participant M as Middleware
    participant C as Clerk
    participant S as Server Component
    participant DB as Supabase via Prisma
    
    P->>B: Opens localhost:3000
    B->>M: Request /dashboard
    M->>C: Check authentication
    C-->>M: Not authenticated
    M->>B: Redirect to /sign-in
    B->>P: Show Clerk sign-in page
    P->>B: Enter email
    B->>C: Request magic link
    C->>P: Email magic link
    P->>C: Click magic link
    C->>B: Set auth cookie
    B->>M: Request /dashboard (with cookie)
    M->>C: Verify cookie
    C-->>M: Valid, User ID: user_abc123
    M->>S: Allow request
    S->>DB: Query dashboard data
    DB-->>S: Return metrics
    S->>B: Render dashboard HTML
    B->>P: Display dashboard
```

## Database Schema Relationships

```mermaid
erDiagram
    Partner ||--o{ Client : "manages"
    Partner ||--o{ Task : "assigned"
    Partner ||--o{ TimeEntry : "logs"
    Partner ||--o{ Expense : "incurs"
    Partner ||--o{ File : "uploads"
    Partner ||--o{ SOP : "creates"
    
    Client ||--o{ Task : "has"
    Client ||--o{ TimeEntry : "tracks"
    Client ||--o{ Invoice : "receives"
    Client ||--o{ File : "owns"
    
    Task ||--o{ TimeEntry : "records"
    
    Partner {
        string id PK
        string clerkId UK
        string name
        string email UK
        Division division
        Role role
        datetime createdAt
    }
    
    Client {
        string id PK
        string name
        Division division
        ClientStatus status
        float mrr
        string relationshipManagerId FK
        EngagementLevel engagementLevel
        datetime createdAt
    }
    
    Task {
        string id PK
        string title
        TaskStatus status
        TaskPriority priority
        string assignedToId FK
        string clientId FK
        datetime dueDate
        boolean isRecurring
        datetime createdAt
    }
```

## Component Hierarchy

```mermaid
graph TD
    RootLayout[Root Layout<br/>Fonts + ClerkProvider] --> Auth{Authenticated?}
    
    Auth -->|No| SignIn[Sign In Page<br/>Clerk Component]
    Auth -->|Yes| AuthLayout[Authenticated Layout<br/>Sidebar + Main]
    
    AuthLayout --> Sidebar[Sidebar Component<br/>Navigation + Logo + UserButton]
    AuthLayout --> MainArea[Main Content Area]
    
    MainArea --> Dashboard[Firm Overview Dashboard]
    MainArea --> MyDash[My Dashboard]
    MainArea --> Placeholders[Placeholder Pages<br/>Clients, Tasks, SOPs, etc.]
    
    Dashboard --> DashHeader1[Dashboard Header<br/>Title + Description]
    Dashboard --> Stats1[4x StatCard<br/>Clients, MRR, Division MRR]
    Dashboard --> Alert1[Overdue Alert<br/>Conditional Display]
    Dashboard --> Cards1[Task Cards + Activity Feed]
    Dashboard --> Rules[Standing Rules<br/>6 Firm Principles]
    
    MyDash --> DashHeader2[Dashboard Header<br/>Personalized Welcome]
    MyDash --> Stats2[3x StatCard<br/>My Clients, My MRR, Open Tasks]
    MyDash --> Alert2[My Overdue Alert]
    MyDash --> TodayTasks[Today's Tasks List]
    MyDash --> AllTasks[All My Tasks List]
    MyDash --> ClientGrid[My Client Grid]
    
    style Dashboard fill:#2E5435,color:#fff
    style MyDash fill:#2E5435,color:#fff
```

## Authentication Flow

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    Unauthenticated --> SignInPage: Navigate to app
    SignInPage --> EmailSent: Enter email
    EmailSent --> Authenticated: Click magic link
    Authenticated --> Dashboard: Redirect
    Dashboard --> [*]
    
    note right of Authenticated
        Clerk sets httpOnly cookie
        Middleware verifies on each request
        Partner linked via Clerk User ID
    end note
```

## Dashboard Data Flow

```mermaid
graph LR
    subgraph page [Dashboard Page Server Component]
        GetData[getDashboardData Function]
    end
    
    subgraph queries [Parallel Prisma Queries]
        Q1[Count Total Clients]
        Q2[Count Active Clients]
        Q3[Sum Active MRR]
        Q4[Sum Accounting MRR]
        Q5[Sum BizDev MRR]
        Q6[Count Overdue Tasks]
        Q7[Find Tasks This Week]
        Q8[Find Recent Activity]
    end
    
    subgraph db [(Supabase)]
        Tables[Partners<br/>Clients<br/>Tasks<br/>Invoices]
    end
    
    GetData --> Q1 & Q2 & Q3 & Q4 & Q5 & Q6 & Q7 & Q8
    Q1 & Q2 & Q3 & Q4 & Q5 & Q6 & Q7 & Q8 --> Tables
    Tables --> GetData
    GetData --> Render[Render Dashboard<br/>with Data]
    
    style GetData fill:#2E5435,color:#fff
    style Render fill:#C9A84C,color:#000
```

## Tech Stack Layers

```mermaid
graph TB
    subgraph presentation [Presentation Layer]
        React[React 18<br/>Server + Client Components]
        Tailwind[Tailwind CSS<br/>Custom Design System]
        Shadcn[Shadcn/ui<br/>11 Components]
    end
    
    subgraph application [Application Layer]
        NextJS[Next.js 14<br/>App Router]
        Routing[File-based Routing<br/>Route Groups]
        Middleware[Clerk Middleware<br/>Auth Protection]
    end
    
    subgraph data [Data Layer]
        Prisma[Prisma ORM<br/>Type-Safe Queries]
        Schema[Schema Definition<br/>8 Models + Relations]
    end
    
    subgraph infrastructure [Infrastructure Layer]
        Vercel[Vercel<br/>Deployment Platform]
        SupaDB[(Supabase PostgreSQL<br/>Database)]
        SupaStore[Supabase Storage<br/>File Storage]
        ClerkService[Clerk Service<br/>Authentication]
    end
    
    React --> NextJS
    Tailwind --> React
    Shadcn --> React
    
    NextJS --> Routing
    NextJS --> Middleware
    
    Routing --> Prisma
    Middleware --> ClerkService
    
    Prisma --> Schema
    Schema --> SupaDB
    
    NextJS -.deployed to.-> Vercel
    Prisma -.connects to.-> SupaDB
    NextJS -.stores files in.-> SupaStore
    
    style NextJS fill:#2E5435,color:#fff
    style Prisma fill:#C9A84C,color:#000
```

## Request Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant Browser
    participant Middleware
    participant Clerk
    participant Page
    participant Prisma
    participant Supabase
    
    Browser->>Middleware: GET /dashboard
    Middleware->>Clerk: Verify auth cookie
    Clerk-->>Middleware: Valid, userId: user_abc
    Middleware->>Page: Forward request
    
    Note over Page: Server Component<br/>getDashboardData()
    
    Page->>Prisma: Promise.all([8 queries])
    Prisma->>Supabase: Execute queries
    Supabase-->>Prisma: Return results
    Prisma-->>Page: Aggregated data
    
    Note over Page: Render React<br/>to HTML
    
    Page-->>Browser: HTML response
    Browser->>Browser: Hydrate React
```

## Folder Structure

```
/app
  /(authenticated)         ← Route group with layout
    /dashboard
      page.tsx            ← Firm overview
      /my-dashboard
        page.tsx          ← Personal view
    /clients
    /tasks
    /sops
    /financials
    /files
    /settings
    layout.tsx            ← Sidebar wrapper
  /sign-in/[[...]]        ← Catch-all Clerk route
  /sign-up/[[...]]        ← Catch-all Clerk route
  layout.tsx              ← Root layout
  globals.css             ← Global styles
  page.tsx                ← Redirects to /dashboard

/components
  /ui                     ← Shadcn components
  sidebar.tsx             ← Navigation
  dashboard-header.tsx    ← Page headers
  stat-card.tsx           ← Metric cards

/lib
  prisma.ts               ← DB client
  utils.ts                ← Utilities

/prisma
  schema.prisma           ← Schema definition
  seed.ts                 ← Sample data
```

## Environment Variables

```
Clerk:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY  (public, frontend)
- CLERK_SECRET_KEY                    (private, backend)
- NEXT_PUBLIC_CLERK_SIGN_IN_URL      (routing)
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL (routing)

Supabase:
- DATABASE_URL                        (private, backend)
- NEXT_PUBLIC_SUPABASE_URL           (public, frontend)
- NEXT_PUBLIC_SUPABASE_ANON_KEY      (public, frontend)
```

## Deployment Flow

```mermaid
graph LR
    Local[Local Development<br/>npm run dev] --> Git[Push to GitHub]
    Git --> Vercel[Vercel Deployment<br/>Automatic]
    Vercel --> Prod[Production Site<br/>magnolia.vercel.app]
    
    Prod -.connects to.-> Clerk[Clerk Auth Service]
    Prod -.connects to.-> Supabase[Supabase Database]
    
    style Local fill:#F8F9FA,color:#000
    style Prod fill:#2E5435,color:#fff
```

## API Routes (Ready to Build)

Future API structure:

```
/api
  /clients
    GET     - List all clients (with filters)
    POST    - Create new client
    /[id]
      GET   - Get single client
      PUT   - Update client
      DELETE - Archive client
  
  /tasks
    GET     - List tasks (with filters)
    POST    - Create task
    /[id]
      GET   - Get single task
      PUT   - Update task
      DELETE - Delete task
  
  /sops
    GET     - List SOPs
    POST    - Create SOP
    /[id]
      GET   - Get SOP with content
      PUT   - Update SOP
      DELETE - Archive SOP
  
  /invoices
    GET     - List invoices
    POST    - Generate invoice
    /[id]
      PUT   - Update status
  
  /upload
    POST    - Upload file to Supabase Storage
```

## Security Model

### Current (Foundation)
```
┌──────────────┐
│   Partner    │
│  (Any email) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Clerk Auth  │
│  (Verified)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Middleware  │
│  (Protects)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dashboard   │
│  (Full Access)│
└──────────────┘
```

### Future (With Staff)
```
Partner Role → Full access to everything
Staff Role → Limited access (no financials)
Read-Only Role → View only, no edits
```

## Performance Targets

Based on current architecture:

| Metric | Target | Notes |
|--------|--------|-------|
| Dashboard Load | < 300ms | Server-side render + DB query |
| Navigation | < 100ms | Client-side routing |
| Task Update | < 200ms | API call + revalidation |
| Search/Filter | < 150ms | Client-side or API |
| File Upload | < 2s | Depends on file size |

## Scalability

Current design supports:
- ✅ 50+ clients without performance issues
- ✅ 500+ tasks without performance issues
- ✅ 10+ partners (when you grow)
- ✅ 1000+ files in Supabase Storage
- ✅ Multiple concurrent users

## Browser Compatibility

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

(All modern browsers with ES2020+ support)

## Mobile Responsiveness

```
Desktop (1024px+)      Tablet (768-1023px)    Mobile (< 768px)
┌──────┬─────────┐    ┌──────┬─────────┐     ┌──────────────┐
│      │         │    │      │         │     │              │
│ Side │ Content │    │ Side │ Content │     │   Content    │
│ bar  │  Area   │    │ bar  │  Area   │     │   (Sidebar   │
│      │         │    │      │         │     │   collapses) │
│      │         │    │      │         │     │              │
└──────┴─────────┘    └──────┴─────────┘     └──────────────┘
  4 columns             2 columns              1 column
```

## Tech Choices Explained

### Why Next.js?
- Server-side rendering for fast dashboards
- API routes for backend logic
- File-based routing (no config needed)
- Vercel deployment (one click)
- Best-in-class React framework

### Why Clerk?
- Magic link authentication (no password management)
- User management UI built-in
- Middleware for easy route protection
- Supports multi-tenancy (if you expand)
- Free tier supports 10,000 users

### Why Supabase?
- Full PostgreSQL (not limited NoSQL)
- Built-in file storage
- Real-time subscriptions (future feature)
- Row Level Security support
- Free tier: 500 MB database, 1 GB storage

### Why Prisma?
- Type-safe database queries
- Auto-generated types
- Migration management
- Introspection of existing databases
- Great DX with autocomplete

### Why Shadcn/ui?
- Copy-paste (you own the code)
- Fully customizable
- Built on Radix UI (accessible)
- Tailwind-based (consistent with project)
- No bloated component library

## Cost Breakdown (Monthly)

Current architecture costs:

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| Vercel | Hobby | $0 | Plenty for 3 partners |
| Supabase | Free | $0 | 500 MB DB, 1 GB storage |
| Clerk | Free | $0 | Up to 10K MAU |
| **Total** | | **$0/month** | Can scale to Pro plans later |

## Monitoring & Observability

Ready for:
- Vercel Analytics (built-in)
- Sentry (error tracking)
- Supabase Dashboard (query performance)
- Clerk Dashboard (auth metrics)

## Future Enhancements

The foundation supports:
- Real-time updates (Supabase Realtime)
- Webhooks (Clerk + Stripe)
- Email notifications (Resend)
- PDF generation (invoices, reports)
- Export to Excel
- Calendar integration
- Slack notifications

---

**Foundation Status:** ✅ Architecture is solid, scalable, and production-ready
