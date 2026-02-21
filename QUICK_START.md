# Quick Start Guide - Magnolia Advisory OS

## 🚀 Your System is Production Ready!

The app is running at: **http://localhost:3010**

## First Steps

### 1. Sign In
Visit http://localhost:3010 and sign in with Clerk

### 2. Verify Your Data
- Check your seeded clients, tasks, and SOPs
- Confirm all partners are set up correctly

### 3. Start Using Daily

#### Morning Routine
1. Open **My Dashboard** - See today's tasks and overdue items
2. Review **Team Capacity** - Check partner workloads
3. Check **Firm Dashboard** - Review MRR and client status

#### During Work
1. Log time: **Time Tracking** → Log hours as you work
2. Update tasks: **Tasks** → Move cards through Kanban
3. Add notes: Open any client → **Activity** tab → Add interaction notes
4. Follow SOPs: **SOPs** → Open checklist → Click off steps as you complete them

#### Client Work
1. **Clients** → Select client → See all info in one place
2. **Files** tab → Upload contracts, docs, tax returns
3. **Activity** tab → Log calls, meetings, emails
4. **Tasks** tab → See all work for this client
5. **Invoices** tab → Track billing

## Key Features

### 🔍 Global Search (Cmd+K or Ctrl+K)
Search everything instantly: clients, tasks, SOPs, files

### 📱 Mobile Ready
Works on phones and tablets with mobile-optimized navigation

### 📊 Dashboards
- **Firm Dashboard**: All metrics, MRR, overdue tasks
- **My Dashboard**: Your clients, your tasks, your workload

### ✅ Interactive SOPs
Click through checklists, track progress automatically

### 👥 Team Coordination
**Team Capacity** page shows who's at capacity and who can take more work

## Common Tasks

### Add a New Client
1. Clients → New Client button
2. Fill in required fields (name, email, relationship manager)
3. Save → Client profile created

### Create a Task
1. Tasks → New Task button
2. Assign to partner, link to client (optional)
3. Set priority and due date
4. Task appears on assignee's dashboard

### Upload Client Files
Two ways:
- **Files page**: Upload button → Choose client → Upload
- **Client detail page**: Files tab → Upload directly

### Log Billable Hours
1. Time Tracking → Fill in date, hours, client
2. Optional: Link to specific task
3. View weekly/daily totals in real-time

### Track SOP Progress
1. SOPs → Open any SOP
2. Check off steps as you complete them
3. Progress saves automatically
4. See completion % on SOP list

## Keyboard Shortcuts

- **Cmd+K** (Mac) or **Ctrl+K** (Windows): Open global search
- Navigate results with arrow keys, Enter to open

## Mobile Usage

### On Phone
- Tap menu icon (☰) in top left to open navigation
- All features work on mobile
- Optimized for portrait and landscape

## Standing Rules (Built In)

The system displays your firm's standing rules on the Firm Dashboard:
- Never start work without: Agreement + Payment + Access
- Never accept clients outside ICP
- Always deliver reports by 5th-10th
- Always require full payment upfront

## When You're Ready to Deploy

See **DEPLOYMENT.md** for complete Vercel deployment instructions.

Quick version:
```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Production ready"

# 2. Deploy to Vercel
# Go to vercel.com → Import from GitHub

# 3. Add environment variables (from your .env)

# 4. Done! Your team can access it anywhere
```

## Daily Workflow Example

**Start of Day:**
1. Open My Dashboard
2. See today's tasks
3. Note any overdue items

**During Work:**
1. Click task to mark in progress
2. Log time as you go
3. Add client notes after calls
4. Upload documents as received

**End of Day:**
5. Mark completed tasks
6. Review tomorrow's schedule
7. Log final hours

## Getting Help

- **Technical Issues**: Check DEPLOYMENT.md
- **Feature Questions**: See README.md
- **Production Checklist**: See PRODUCTION_CHECKLIST.md

## What's Next

### Immediate
- [ ] Set up team Clerk accounts
- [ ] Import existing client data
- [ ] Create your custom SOPs
- [ ] Configure file categories for your workflow

### Future Enhancements
- Email notifications for deadlines
- Calendar integration
- Client self-service portal
- Automated reporting

## Support

Your system includes:
- Error recovery on all pages
- Automatic retry for failed operations
- Mobile-optimized interface
- Real-time search
- Secure authentication
- File upload validation

## Tips

1. **Use SOPs religiously** - This ensures consistency across all client work
2. **Log time daily** - Don't wait until end of week
3. **Update task status** - Keep Kanban board current
4. **Add client notes** - Document every interaction
5. **Check Team Capacity** - Distribute work evenly

---

**You're ready to run your business with this system!** 🎉
