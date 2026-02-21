export const SOP_TEMPLATES = {
  "client-onboarding": {
    title: "Client Onboarding Checklist",
    division: "ACCOUNTING" as const,
    serviceType: "Onboarding",
    status: "LIVE" as const,
    content: `<h2>Client Onboarding Process - Accounting Division</h2>

<p><strong>Purpose:</strong> Ensure smooth, professional onboarding for all new accounting clients. This checklist guarantees we gather all necessary information, set up systems correctly, and set clear expectations from day one.</p>

<h2>Pre-Engagement Phase</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Conduct discovery call - assess fit against ICP (service business, &lt;200 tx/mo, no inventory)</li>
  <li data-type="taskItem" data-checked="false">Confirm scope of work and service package (Essential/Professional/Premium)</li>
  <li data-type="taskItem" data-checked="false">Send engagement letter and service agreement</li>
  <li data-type="taskItem" data-checked="false">Generate and send invoice (full payment required upfront)</li>
  <li data-type="taskItem" data-checked="false">Confirm agreement signed and invoice paid before proceeding</li>
</ul>

<h2>Information Gathering</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Request formation documents (LLC operating agreement, EIN letter, articles of incorporation)</li>
  <li data-type="taskItem" data-checked="false">Request prior year tax returns (at least 2 years)</li>
  <li data-type="taskItem" data-checked="false">Request current year financial statements (if available)</li>
  <li data-type="taskItem" data-checked="false">Collect bank account information (name, routing, account numbers for 1-3 accounts)</li>
  <li data-type="taskItem" data-checked="false">Collect credit card statements for last 3 months</li>
  <li data-type="taskItem" data-checked="false">Request existing chart of accounts (if they have one)</li>
  <li data-type="taskItem" data-checked="false">Document monthly transaction volume estimate</li>
</ul>

<h2>System Setup</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Verify client has active QuickBooks Online subscription (or set one up)</li>
  <li data-type="taskItem" data-checked="false">Request admin access to QuickBooks Online</li>
  <li data-type="taskItem" data-checked="false">Set up company file (if new) or review existing setup</li>
  <li data-type="taskItem" data-checked="false">Import/verify chart of accounts</li>
  <li data-type="taskItem" data-checked="false">Connect bank feeds for all accounts</li>
  <li data-type="taskItem" data-checked="false">Set up credit card connections</li>
  <li data-type="taskItem" data-checked="false">Configure opening balances (if new setup)</li>
  <li data-type="taskItem" data-checked="false">Set up classes or locations (if needed)</li>
</ul>

<h2>Communication Setup</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Create shared folder structure (Google Drive or Dropbox)</li>
  <li data-type="taskItem" data-checked="false">Set up monthly communication cadence (email + optional call)</li>
  <li data-type="taskItem" data-checked="false">Add client to monthly recurring task list</li>
  <li data-type="taskItem" data-checked="false">Send welcome email with: timeline, deliverable dates, communication process, and contact info</li>
</ul>

<h2>Deliverables & Expectations</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Confirm delivery dates (monthly reports by 5th-10th of following month)</li>
  <li data-type="taskItem" data-checked="false">Set Loom delivery expectation (video walkthrough of financials)</li>
  <li data-type="taskItem" data-checked="false">Document any special reporting requirements</li>
  <li data-type="taskItem" data-checked="false">Schedule first monthly close date</li>
</ul>

<h2>First Month Cleanup (If Needed)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Identify any backlog or catch-up work needed</li>
  <li data-type="taskItem" data-checked="false">If cleanup required: quote separate cleanup project before proceeding</li>
  <li data-type="taskItem" data-checked="false">Never perform cleanup as part of monthly service without separate agreement</li>
</ul>

<p><strong>Success Criteria:</strong> Client has working QuickBooks setup, understands deliverables and timeline, and first monthly close is scheduled. All systems are ready for ongoing monthly bookkeeping.</p>

<p><strong>Common Pitfalls:</strong></p>
<ul>
  <li>Starting work before invoice is paid</li>
  <li>Accepting clients with inventory or complex job costing</li>
  <li>Underestimating cleanup work needed</li>
  <li>Not setting clear deliverable expectations</li>
</ul>`,
  },

  "monthly-bookkeeping": {
    title: "Monthly Bookkeeping SOP",
    division: "ACCOUNTING" as const,
    serviceType: "Recurring Service",
    status: "LIVE" as const,
    content: `<h2>Monthly Bookkeeping Close Process</h2>

<p><strong>Purpose:</strong> Complete monthly bookkeeping for active clients by the 10th of the following month. This SOP ensures consistency, accuracy, and timely delivery of financial reports.</p>

<p><strong>Timing:</strong> Work begins on the 1st of the month and must be completed by the 10th. Aim for delivery by the 5th-7th when possible.</p>

<h2>Step 1: Preparation (Day 1-2)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Log into client's QuickBooks Online</li>
  <li data-type="taskItem" data-checked="false">Verify bank feeds are connected and updating</li>
  <li data-type="taskItem" data-checked="false">Download bank statements for the closed month (all accounts)</li>
  <li data-type="taskItem" data-checked="false">Download credit card statements for the closed month</li>
  <li data-type="taskItem" data-checked="false">Request any missing receipts or documentation via email</li>
</ul>

<h2>Step 2: Bank Reconciliation (Day 2-3)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Reconcile each bank account to statement ending balance</li>
  <li data-type="taskItem" data-checked="false">Investigate and resolve any discrepancies</li>
  <li data-type="taskItem" data-checked="false">Reconcile credit card accounts to statement ending balance</li>
  <li data-type="taskItem" data-checked="false">Confirm all reconciliations balance to $0.00 difference</li>
  <li data-type="taskItem" data-checked="false">Screenshot reconciliation summaries for records</li>
</ul>

<h2>Step 3: Transaction Categorization (Day 3-5)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Review and categorize all uncategorized bank transactions</li>
  <li data-type="taskItem" data-checked="false">Review and categorize all credit card transactions</li>
  <li data-type="taskItem" data-checked="false">Create vendors for new payees (standardize naming)</li>
  <li data-type="taskItem" data-checked="false">Apply consistent categorization rules (reference chart of accounts)</li>
  <li data-type="taskItem" data-checked="false">Flag any unusual or large transactions for client follow-up</li>
  <li data-type="taskItem" data-checked="false">Split transactions if needed (e.g., bulk purchases)</li>
</ul>

<h2>Step 4: Revenue Recognition (Day 4-5)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Verify all revenue is recorded correctly</li>
  <li data-type="taskItem" data-checked="false">Match deposits to invoices/sales receipts</li>
  <li data-type="taskItem" data-checked="false">Record any cash-basis revenue</li>
  <li data-type="taskItem" data-checked="false">Check for deferred revenue or prepayments</li>
</ul>

<h2>Step 5: Expense Review (Day 5-6)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Review all expense categories for reasonableness</li>
  <li data-type="taskItem" data-checked="false">Verify no personal expenses are coded to business</li>
  <li data-type="taskItem" data-checked="false">Check for duplicate transactions</li>
  <li data-type="taskItem" data-checked="false">Verify mileage and vehicle expenses are properly documented</li>
  <li data-type="taskItem" data-checked="false">Confirm meals & entertainment are at 50% (if applicable)</li>
</ul>

<h2>Step 6: Report Generation (Day 6-7)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Generate Profit & Loss report (monthly, compare to prior month and YTD)</li>
  <li data-type="taskItem" data-checked="false">Generate Balance Sheet (as of month end)</li>
  <li data-type="taskItem" data-checked="false">Generate Cash Flow Statement (if in service package)</li>
  <li data-type="taskItem" data-checked="false">Export reports to PDF</li>
  <li data-type="taskItem" data-checked="false">Review reports for any obvious errors or anomalies</li>
</ul>

<h2>Step 7: Loom Recording (Day 7-8)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Open client's financial reports</li>
  <li data-type="taskItem" data-checked="false">Record 5-10 minute Loom walkthrough covering:</li>
  <li data-type="taskItem" data-checked="false">→ Total revenue for the month (vs prior month)</li>
  <li data-type="taskItem" data-checked="false">→ Top 3-5 expense categories</li>
  <li data-type="taskItem" data-checked="false">→ Net income/loss</li>
  <li data-type="taskItem" data-checked="false">→ Cash position (bank balances)</li>
  <li data-type="taskItem" data-checked="false">→ Any notable items or recommendations</li>
  <li data-type="taskItem" data-checked="false">Copy Loom link</li>
</ul>

<h2>Step 8: Client Delivery (Day 8-10)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Upload reports to client's shared folder</li>
  <li data-type="taskItem" data-checked="false">Send delivery email with: P&L, Balance Sheet, Loom link, and any action items</li>
  <li data-type="taskItem" data-checked="false">Log time spent in time tracking system</li>
  <li data-type="taskItem" data-checked="false">Mark task as complete in task management system</li>
  <li data-type="taskItem" data-checked="false">Schedule next month's recurring task</li>
</ul>

<h2>Quality Control Checklist</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">All accounts reconciled with $0.00 difference</li>
  <li data-type="taskItem" data-checked="false">No uncategorized transactions remaining</li>
  <li data-type="taskItem" data-checked="false">No duplicate transactions</li>
  <li data-type="taskItem" data-checked="false">Revenue matches bank deposits</li>
  <li data-type="taskItem" data-checked="false">No personal expenses in business accounts</li>
  <li data-type="taskItem" data-checked="false">Reports exported and reviewed</li>
  <li data-type="taskItem" data-checked="false">Loom recorded and link tested</li>
  <li data-type="taskItem" data-checked="false">Delivery email sent before 10th of month</li>
</ul>

<p><strong>Standard Timeline:</strong></p>
<ul>
  <li>Essential Package: 2-3 hours per month</li>
  <li>Professional Package: 3-4 hours per month</li>
  <li>Premium Package: 4-6 hours per month</li>
</ul>

<p><strong>Red Flags to Watch:</strong></p>
<ul>
  <li>Transaction volume suddenly doubles</li>
  <li>New bank accounts appear</li>
  <li>Large unexplained transfers</li>
  <li>Personal expenses appearing frequently</li>
  <li>Revenue declining month over month</li>
</ul>`,
  },

  "cleanup-catchup": {
    title: "Cleanup / Catch-Up SOP",
    division: "ACCOUNTING" as const,
    serviceType: "Project Work",
    status: "LIVE" as const,
    content: `<h2>QuickBooks Cleanup & Catch-Up Process</h2>

<p><strong>Purpose:</strong> Bring a client's books from messy/behind to accurate and current. This is ALWAYS a separate project from monthly bookkeeping and must be quoted and invoiced separately.</p>

<p><strong>Critical Rule:</strong> Never start cleanup work without a signed cleanup agreement and paid invoice. Cleanup is never included in monthly service packages.</p>

<h2>Step 1: Discovery & Assessment (Before Quoting)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Request QuickBooks Online admin access</li>
  <li data-type="taskItem" data-checked="false">Log in and assess current state of books</li>
  <li data-type="taskItem" data-checked="false">Document period that needs cleanup (start date → end date)</li>
  <li data-type="taskItem" data-checked="false">Count approximate number of transactions per month</li>
  <li data-type="taskItem" data-checked="false">Check reconciliation status (when was last reconciliation?)</li>
  <li data-type="taskItem" data-checked="false">Identify issues: duplicates, uncategorized, unreconciled, missing transactions</li>
  <li data-type="taskItem" data-checked="false">Request all missing bank statements for cleanup period</li>
</ul>

<h2>Step 2: Scoping & Pricing</h2>

<p><strong>Complexity Levels:</strong></p>

<p><strong>Simple Cleanup</strong> ($500-$800):</p>
<ul>
  <li>3-6 months of backlog</li>
  <li>Less than 100 transactions/month</li>
  <li>Books partially maintained</li>
  <li>Bank feeds mostly connected</li>
</ul>

<p><strong>Moderate Cleanup</strong> ($800-$1,500):</p>
<ul>
  <li>6-12 months of backlog</li>
  <li>100-200 transactions/month</li>
  <li>Significant uncategorized items</li>
  <li>Missing reconciliations</li>
</ul>

<p><strong>Complex Cleanup</strong> ($1,500-$3,000):</p>
<ul>
  <li>12+ months of backlog</li>
  <li>High transaction volume</li>
  <li>Books never maintained properly</li>
  <li>Missing bank statements</li>
  <li>Multiple bank accounts not connected</li>
</ul>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Assess complexity level</li>
  <li data-type="taskItem" data-checked="false">Quote fixed price based on scope</li>
  <li data-type="taskItem" data-checked="false">Send cleanup proposal and agreement</li>
  <li data-type="taskItem" data-checked="false">Generate and send cleanup invoice</li>
  <li data-type="taskItem" data-checked="false">Confirm payment received before starting work</li>
</ul>

<h2>Step 3: Cleanup Execution</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Import or connect all bank accounts for cleanup period</li>
  <li data-type="taskItem" data-checked="false">Import all bank statements (use CSV if bank feeds don't go back far enough)</li>
  <li data-type="taskItem" data-checked="false">Delete duplicate transactions</li>
  <li data-type="taskItem" data-checked="false">Identify and void old checks that never cleared</li>
  <li data-type="taskItem" data-checked="false">Reconcile earliest month first, work forward chronologically</li>
  <li data-type="taskItem" data-checked="false">Categorize all transactions month by month</li>
  <li data-type="taskItem" data-checked="false">Create journal entries for missing transactions</li>
  <li data-type="taskItem" data-checked="false">Fix any opening balance issues</li>
  <li data-type="taskItem" data-checked="false">Clean up chart of accounts (consolidate unnecessary accounts)</li>
</ul>

<h2>Step 4: Revenue Verification</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Match all deposits to revenue sources</li>
  <li data-type="taskItem" data-checked="false">Create invoices or sales receipts for unrecorded revenue</li>
  <li data-type="taskItem" data-checked="false">Verify revenue totals match bank deposits for each month</li>
  <li data-type="taskItem" data-checked="false">Check for owner contributions vs revenue (common mistake)</li>
</ul>

<h2>Step 5: Final Reconciliation</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Reconcile all accounts for all months in cleanup period</li>
  <li data-type="taskItem" data-checked="false">Verify each reconciliation shows $0.00 difference</li>
  <li data-type="taskItem" data-checked="false">Lock closed periods to prevent future changes</li>
  <li data-type="taskItem" data-checked="false">Generate final cleanup reports (P&L and Balance Sheet for each month)</li>
</ul>

<h2>Step 6: Deliverables</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Export all monthly P&Ls for cleanup period</li>
  <li data-type="taskItem" data-checked="false">Export final Balance Sheet</li>
  <li data-type="taskItem" data-checked="false">Create summary document explaining what was fixed</li>
  <li data-type="taskItem" data-checked="false">Record Loom walkthrough (10-15 minutes) covering:</li>
  <li data-type="taskItem" data-checked="false">→ What state the books were in</li>
  <li data-type="taskItem" data-checked="false">→ What we fixed</li>
  <li data-type="taskItem" data-checked="false">→ Overview of current financial position</li>
  <li data-type="taskItem" data-checked="false">→ Recommendations going forward</li>
  <li data-type="taskItem" data-checked="false">Upload all deliverables to shared folder</li>
  <li data-type="taskItem" data-checked="false">Send completion email with Loom link</li>
</ul>

<h2>Step 7: Transition to Monthly Service</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Confirm client is ready for ongoing monthly bookkeeping</li>
  <li data-type="taskItem" data-checked="false">If yes: send monthly service agreement and first month invoice</li>
  <li data-type="taskItem" data-checked="false">Create recurring monthly task in task management system</li>
  <li data-type="taskItem" data-checked="false">Add client to active client list</li>
  <li data-type="taskItem" data-checked="false">Schedule first monthly close</li>
</ul>

<p><strong>Time Tracking:</strong> Log hours separately from monthly bookkeeping. Cleanup projects typically take 8-20 hours depending on complexity.</p>

<p><strong>Common Issues:</strong></p>
<ul>
  <li><strong>Missing bank statements:</strong> Request from client. If unavailable, download directly from bank with client permission.</li>
  <li><strong>Duplicate transactions:</strong> Usually from importing statements AND having bank feeds. Delete duplicates carefully.</li>
  <li><strong>Opening balance errors:</strong> Often caused by partial imports. Calculate correct opening balance from first bank statement.</li>
  <li><strong>Scope creep:</strong> If cleanup is more complex than quoted, pause and requote before continuing.</li>
</ul>

<p><strong>Never Do:</strong></p>
<ul>
  <li>Start cleanup without paid invoice</li>
  <li>Include cleanup in monthly service package</li>
  <li>Work beyond quoted scope without new agreement</li>
  <li>Lock periods before client reviews and approves</li>
</ul>`,
  },

  "revenue-dashboard": {
    title: "Revenue Performance Dashboard SOP",
    division: "BIZDEV" as const,
    serviceType: "Recurring Service",
    status: "LIVE" as const,
    content: `<h2>Revenue Performance Dashboard Setup & Maintenance</h2>

<p><strong>Purpose:</strong> Build and maintain a real-time revenue dashboard that helps clients track sales performance, pipeline health, and revenue trends. Typically built in Google Sheets or Airtable for easy client access.</p>

<p><strong>Who This Is For:</strong> Service businesses that need visibility into sales metrics, pipeline conversion, and revenue forecasting.</p>

<h2>Phase 1: Discovery & Planning</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule discovery call with client</li>
  <li data-type="taskItem" data-checked="false">Understand their revenue model (monthly recurring, project-based, mix)</li>
  <li data-type="taskItem" data-checked="false">Identify key metrics they want to track (MRR, deal pipeline, close rate, etc.)</li>
  <li data-type="taskItem" data-checked="false">Determine data sources (CRM, QuickBooks, spreadsheet, manual)</li>
  <li data-type="taskItem" data-checked="false">Define update frequency (weekly, bi-weekly, monthly)</li>
  <li data-type="taskItem" data-checked="false">Choose platform (Google Sheets for simple, Airtable for complex)</li>
</ul>

<h2>Phase 2: Dashboard Design</h2>

<p><strong>Standard Metrics to Include:</strong></p>

<ul>
  <li><strong>Revenue Metrics:</strong> Monthly revenue, YTD revenue, average deal size, revenue by service type</li>
  <li><strong>Pipeline Metrics:</strong> Total pipeline value, number of active deals, conversion rate, average sales cycle</li>
  <li><strong>Activity Metrics:</strong> New leads this month, proposals sent, deals closed, deals lost</li>
  <li><strong>Health Indicators:</strong> Month-over-month growth, goal vs actual, forecast vs actual</li>
</ul>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Create new Google Sheet or Airtable base</li>
  <li data-type="taskItem" data-checked="false">Set up data input tabs (Deals, Clients, Revenue)</li>
  <li data-type="taskItem" data-checked="false">Build calculations tab (metrics formulas)</li>
  <li data-type="taskItem" data-checked="false">Create dashboard tab with charts and key metrics</li>
  <li data-type="taskItem" data-checked="false">Apply formatting: brand colors, clear labels, legends</li>
  <li data-type="taskItem" data-checked="false">Add data validation and dropdown lists where applicable</li>
</ul>

<h2>Phase 3: Charts & Visualizations</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Create monthly revenue trend chart (last 12 months)</li>
  <li data-type="taskItem" data-checked="false">Create pipeline funnel visualization</li>
  <li data-type="taskItem" data-checked="false">Create revenue by service type pie chart</li>
  <li data-type="taskItem" data-checked="false">Create goal vs actual bar chart</li>
  <li data-type="taskItem" data-checked="false">Add conditional formatting for at-risk metrics (red/yellow/green)</li>
</ul>

<h2>Phase 4: Initial Data Population</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Import historical revenue data (at least 6 months)</li>
  <li data-type="taskItem" data-checked="false">Import current pipeline/deals</li>
  <li data-type="taskItem" data-checked="false">Set up current month tracking</li>
  <li data-type="taskItem" data-checked="false">Verify all formulas calculate correctly</li>
  <li data-type="taskItem" data-checked="false">Test dashboard with real data</li>
</ul>

<h2>Phase 5: Client Training</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Record Loom tutorial (15-20 minutes) covering:</li>
  <li data-type="taskItem" data-checked="false">→ How to read each metric</li>
  <li data-type="taskItem" data-checked="false">→ How to add new deals/revenue</li>
  <li data-type="taskItem" data-checked="false">→ How to update pipeline status</li>
  <li data-type="taskItem" data-checked="false">→ What each chart means</li>
  <li data-type="taskItem" data-checked="false">Share dashboard with client (edit or view-only based on package)</li>
  <li data-type="taskItem" data-checked="false">Schedule follow-up Q&A call</li>
</ul>

<h2>Ongoing Maintenance (Monthly/Bi-weekly)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Log into dashboard at agreed frequency</li>
  <li data-type="taskItem" data-checked="false">Review data entered by client (if they have edit access)</li>
  <li data-type="taskItem" data-checked="false">Add new revenue data from closed deals</li>
  <li data-type="taskItem" data-checked="false">Update pipeline with new prospects</li>
  <li data-type="taskItem" data-checked="false">Mark deals as won/lost/stalled</li>
  <li data-type="taskItem" data-checked="false">Calculate new metrics (conversion rate, average deal size)</li>
  <li data-type="taskItem" data-checked="false">Update monthly revenue totals</li>
  <li data-type="taskItem" data-checked="false">Refresh all charts and visualizations</li>
  <li data-type="taskItem" data-checked="false">Record brief Loom update (5 minutes) highlighting key changes</li>
  <li data-type="taskItem" data-checked="false">Send update email with Loom link and any insights</li>
</ul>

<h2>Monthly Review Call (Growth Systems Package)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule 30-minute call with client</li>
  <li data-type="taskItem" data-checked="false">Review dashboard together screen-share</li>
  <li data-type="taskItem" data-checked="false">Discuss trends: What's working? What's not?</li>
  <li data-type="taskItem" data-checked="false">Identify bottlenecks in sales process</li>
  <li data-type="taskItem" data-checked="false">Set goals for next month</li>
  <li data-type="taskItem" data-checked="false">Document action items</li>
  <li data-type="taskItem" data-checked="false">Send follow-up email with meeting notes</li>
</ul>

<p><strong>Pricing:</strong></p>
<ul>
  <li>Initial setup (one-time): $400-$900 depending on complexity</li>
  <li>Monthly maintenance: Included in Foundation ($400-$600/mo) or higher packages</li>
  <li>Standalone maintenance: $200-$300/month</li>
</ul>

<p><strong>Tools & Templates:</strong></p>
<ul>
  <li>Google Sheets Template: Use our standard revenue dashboard template</li>
  <li>Airtable Template: Use for clients needing CRM-like features</li>
  <li>Chart Library: Use consistent color scheme (client's brand colors)</li>
</ul>

<p><strong>Success Metrics:</strong></p>
<ul>
  <li>Client checks dashboard at least weekly</li>
  <li>Client reports dashboard is "helpful and clear"</li>
  <li>Client makes business decisions based on dashboard data</li>
  <li>Dashboard accurately reflects revenue within 5% margin</li>
</ul>`,
  },

  "website-build": {
    title: "Website Build SOP",
    division: "BIZDEV" as const,
    serviceType: "Project Work",
    status: "LIVE" as const,
    content: `<h2>Website Build Process (1-3 Pages)</h2>

<p><strong>Purpose:</strong> Deliver a professional, mobile-responsive website for service-based business clients. Typical project: Home, Services, Contact pages.</p>

<p><strong>Pricing:</strong> $500-$1,500 depending on page count, custom design needs, and copywriting scope.</p>

<h2>Phase 1: Discovery & Planning (Day 1-3)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule discovery call with client</li>
  <li data-type="taskItem" data-checked="false">Understand business, target audience, and goals</li>
  <li data-type="taskItem" data-checked="false">Confirm page count (1-3 pages for standard package)</li>
  <li data-type="taskItem" data-checked="false">Discuss desired functionality (contact form, calendar booking, etc.)</li>
  <li data-type="taskItem" data-checked="false">Collect brand assets: logo, colors, fonts, existing brand guidelines</li>
  <li data-type="taskItem" data-checked="false">Request content: existing copy, service descriptions, testimonials, photos</li>
  <li data-type="taskItem" data-checked="false">Identify competitor websites they like</li>
  <li data-type="taskItem" data-checked="false">Send proposal with scope, timeline (2-3 weeks), and price</li>
  <li data-type="taskItem" data-checked="false">Receive signed agreement and payment before proceeding</li>
</ul>

<h2>Phase 2: Wireframing & Content (Day 3-7)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Sketch rough wireframe for each page (Figma or paper)</li>
  <li data-type="taskItem" data-checked="false">Share wireframe with client for structural approval</li>
  <li data-type="taskItem" data-checked="false">Write/edit copy for each page (or work with client's provided copy)</li>
  <li data-type="taskItem" data-checked="false">Organize content into clear sections</li>
  <li data-type="taskItem" data-checked="false">Optimize copy for clarity and conversion</li>
  <li data-type="taskItem" data-checked="false">Collect/optimize images (compress, crop, size appropriately)</li>
</ul>

<h2>Phase 3: Design & Development (Day 7-14)</h2>

<p><strong>Recommended Stack:</strong></p>
<ul>
  <li>Simple sites: Webflow, Squarespace, Wix (fastest)</li>
  <li>Custom needs: Next.js + Vercel (most flexible)</li>
  <li>Budget-friendly: WordPress (easy for client to update later)</li>
</ul>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Set up development environment or website builder account</li>
  <li data-type="taskItem" data-checked="false">Build homepage with hero, services overview, social proof, CTA</li>
  <li data-type="taskItem" data-checked="false">Build services page with detailed service descriptions</li>
  <li data-type="taskItem" data-checked="false">Build contact page with form and business info</li>
  <li data-type="taskItem" data-checked="false">Apply brand colors and typography</li>
  <li data-type="taskItem" data-checked="false">Optimize for mobile (test on phone and tablet)</li>
  <li data-type="taskItem" data-checked="false">Add contact form with email notifications</li>
  <li data-type="taskItem" data-checked="false">Set up Google Analytics (if in scope)</li>
  <li data-type="taskItem" data-checked="false">Optimize images for web (WebP format, compressed)</li>
  <li data-type="taskItem" data-checked="false">Add meta tags for SEO (title, description)</li>
</ul>

<h2>Phase 4: Review & Revisions (Day 14-17)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Send staging link to client for review</li>
  <li data-type="taskItem" data-checked="false">Collect feedback via email or call</li>
  <li data-type="taskItem" data-checked="false">Make requested changes (within scope)</li>
  <li data-type="taskItem" data-checked="false">Test all links and forms</li>
  <li data-type="taskItem" data-checked="false">Test on multiple devices (desktop, tablet, phone)</li>
  <li data-type="taskItem" data-checked="false">Test on multiple browsers (Chrome, Safari, Firefox)</li>
  <li data-type="taskItem" data-checked="false">Get final approval from client</li>
</ul>

<h2>Phase 5: Domain & Launch (Day 17-21)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Purchase domain (if client doesn't have one) - add to invoice</li>
  <li data-type="taskItem" data-checked="false">Connect domain to hosting platform</li>
  <li data-type="taskItem" data-checked="false">Configure DNS settings (A record, CNAME)</li>
  <li data-type="taskItem" data-checked="false">Wait for DNS propagation (24-48 hours)</li>
  <li data-type="taskItem" data-checked="false">Set up SSL certificate (usually automatic)</li>
  <li data-type="taskItem" data-checked="false">Test live site at actual domain</li>
  <li data-type="taskItem" data-checked="false">Verify contact form sends emails correctly</li>
  <li data-type="taskItem" data-checked="false">Launch! Send client the live link</li>
</ul>

<h2>Phase 6: Training & Handoff (Day 21)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Record Loom tutorial (10-15 minutes) covering:</li>
  <li data-type="taskItem" data-checked="false">→ How to edit content (if they have access)</li>
  <li data-type="taskItem" data-checked="false">→ How to check contact form submissions</li>
  <li data-type="taskItem" data-checked="false">→ How to update images</li>
  <li data-type="taskItem" data-checked="false">→ Where to go for help</li>
  <li data-type="taskItem" data-checked="false">Provide login credentials to website platform</li>
  <li data-type="taskItem" data-checked="false">Provide domain registrar login (if we purchased)</li>
  <li data-type="taskItem" data-checked="false">Send final invoice for any add-ons (domain, additional revisions)</li>
  <li data-type="taskItem" data-checked="false">Add to ongoing maintenance list (if they purchased maintenance package)</li>
</ul>

<h2>Standard Page Structure</h2>

<p><strong>Homepage:</strong></p>
<ul>
  <li>Hero section (headline + CTA)</li>
  <li>Services overview (3-4 key services)</li>
  <li>Social proof (testimonials or client logos)</li>
  <li>About section (brief)</li>
  <li>Final CTA</li>
  <li>Footer (contact info, links)</li>
</ul>

<p><strong>Services Page:</strong></p>
<ul>
  <li>Service list with descriptions</li>
  <li>Pricing (if client wants it public)</li>
  <li>Process overview</li>
  <li>CTA to contact</li>
</ul>

<p><strong>Contact Page:</strong></p>
<ul>
  <li>Contact form (name, email, phone, message)</li>
  <li>Business address and phone</li>
  <li>Map embed (optional)</li>
  <li>Email and social links</li>
</ul>

<h2>Quality Checklist Before Launch</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">All text is spelled correctly (run spellcheck)</li>
  <li data-type="taskItem" data-checked="false">All images load properly and are optimized</li>
  <li data-type="taskItem" data-checked="false">Contact form works and sends to correct email</li>
  <li data-type="taskItem" data-checked="false">All links work (no broken links)</li>
  <li data-type="taskItem" data-checked="false">Site loads in under 3 seconds</li>
  <li data-type="taskItem" data-checked="false">Mobile responsive on all pages</li>
  <li data-type="taskItem" data-checked="false">Favicon is set</li>
  <li data-type="taskItem" data-checked="false">Page titles and meta descriptions are set</li>
  <li data-type="taskItem" data-checked="false">SSL certificate is active (https://)</li>
</ul>

<p><strong>Scope Management:</strong></p>
<ul>
  <li>Standard package includes 2 rounds of revisions</li>
  <li>Additional revisions: $100-$200 per round</li>
  <li>Additional pages: $150-$300 per page</li>
  <li>Custom functionality: Quote separately</li>
</ul>

<p><strong>Timeline:</strong> 2-3 weeks from kickoff to launch</p>

<p><strong>Maintenance Options:</strong></p>
<ul>
  <li>None: Client maintains their own site</li>
  <li>Basic: $50/month - minor updates, monitoring</li>
  <li>Full: $150/month - content updates, monitoring, quarterly refresh</li>
</ul>`,
  },

  "crm-setup": {
    title: "CRM Setup SOP",
    division: "BIZDEV" as const,
    serviceType: "Project Work",
    status: "LIVE" as const,
    content: `<h2>CRM Setup & Configuration</h2>

<p><strong>Purpose:</strong> Implement a Customer Relationship Management system for clients who need to organize leads, track deals, and manage sales pipeline. Most common for service businesses doing outbound sales.</p>

<p><strong>Pricing:</strong> $300-$600 depending on complexity and data migration needs.</p>

<h2>Phase 1: CRM Selection (Day 1-2)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule discovery call to understand needs</li>
  <li data-type="taskItem" data-checked="false">Assess deal volume (how many deals per month?)</li>
  <li data-type="taskItem" data-checked="false">Understand sales process (stages from lead to close)</li>
  <li data-type="taskItem" data-checked="false">Determine team size (solo founder vs sales team)</li>
  <li data-type="taskItem" data-checked="false">Check budget for CRM tool</li>
</ul>

<p><strong>Recommended CRMs by Use Case:</strong></p>

<ul>
  <li><strong>Solo founder, simple needs:</strong> Streak (Gmail-based, $15-49/mo)</li>
  <li><strong>Small team, moderate complexity:</strong> Pipedrive ($14-99/mo per user)</li>
  <li><strong>Growing team, advanced features:</strong> HubSpot (free to $50+/mo per user)</li>
  <li><strong>Very simple, low volume:</strong> Airtable or Google Sheets (custom build)</li>
</ul>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Recommend CRM based on client needs</li>
  <li data-type="taskItem" data-checked="false">Get client approval on tool selection</li>
  <li data-type="taskItem" data-checked="false">Client purchases CRM subscription (or we add to our bill)</li>
</ul>

<h2>Phase 2: CRM Configuration (Day 2-5)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Create account or access client's existing account</li>
  <li data-type="taskItem" data-checked="false">Set up user accounts for client's team</li>
  <li data-type="taskItem" data-checked="false">Configure company settings (name, timezone, currency)</li>
  <li data-type="taskItem" data-checked="false">Define deal stages based on client's sales process (typically 4-6 stages)</li>
  <li data-type="taskItem" data-checked="false">Example stages: Lead → Qualified → Proposal → Negotiation → Closed Won/Lost</li>
  <li data-type="taskItem" data-checked="false">Set up custom fields (service type, deal value, expected close date, source)</li>
  <li data-type="taskItem" data-checked="false">Configure pipeline view</li>
  <li data-type="taskItem" data-checked="false">Set up automation rules (if available): task reminders, follow-up notifications</li>
</ul>

<h2>Phase 3: Data Migration (Day 5-7)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Collect existing contact/lead data (spreadsheet, old CRM, email)</li>
  <li data-type="taskItem" data-checked="false">Clean data: remove duplicates, standardize formatting</li>
  <li data-type="taskItem" data-checked="false">Prepare CSV import file with all required fields</li>
  <li data-type="taskItem" data-checked="false">Import contacts into CRM</li>
  <li data-type="taskItem" data-checked="false">Import deals/opportunities (if applicable)</li>
  <li data-type="taskItem" data-checked="false">Verify import completed successfully</li>
  <li data-type="taskItem" data-checked="false">Spot-check 10-20 records for accuracy</li>
</ul>

<h2>Phase 4: Integration Setup (Day 7-8)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Connect email (Gmail or Outlook integration)</li>
  <li data-type="taskItem" data-checked="false">Set up calendar sync (for scheduling meetings)</li>
  <li data-type="taskItem" data-checked="false">Connect website contact form to CRM (if website exists)</li>
  <li data-type="taskItem" data-checked="false">Set up any third-party integrations (Zapier, etc.)</li>
  <li data-type="taskItem" data-checked="false">Test all integrations to ensure data flows correctly</li>
</ul>

<h2>Phase 5: Templates & Automation (Day 8-9)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Create email templates for common scenarios:</li>
  <li data-type="taskItem" data-checked="false">→ Initial outreach</li>
  <li data-type="taskItem" data-checked="false">→ Follow-up after meeting</li>
  <li data-type="taskItem" data-checked="false">→ Proposal delivery</li>
  <li data-type="taskItem" data-checked="false">→ Contract sent</li>
  <li data-type="taskItem" data-checked="false">Set up automated task creation (e.g., "Follow up in 3 days")</li>
  <li data-type="taskItem" data-checked="false">Configure deal stage automation if available</li>
  <li data-type="taskItem" data-checked="false">Set up reporting dashboards (pipeline value, conversion rate, deal velocity)</li>
</ul>

<h2>Phase 6: Training & Documentation (Day 9-10)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Record Loom training video (20-30 minutes) covering:</li>
  <li data-type="taskItem" data-checked="false">→ How to add new contacts/leads</li>
  <li data-type="taskItem" data-checked="false">→ How to create and move deals through pipeline</li>
  <li data-type="taskItem" data-checked="false">→ How to log activities (calls, emails, meetings)</li>
  <li data-type="taskItem" data-checked="false">→ How to use email templates</li>
  <li data-type="taskItem" data-checked="false">→ How to run reports</li>
  <li data-type="taskItem" data-checked="false">→ Best practices for keeping CRM updated</li>
  <li data-type="taskItem" data-checked="false">Create quick reference PDF with screenshots</li>
  <li data-type="taskItem" data-checked="false">Schedule live training call (30-45 minutes)</li>
  <li data-type="taskItem" data-checked="false">Walk through CRM together, answer questions</li>
  <li data-type="taskItem" data-checked="false">Have client practice adding a deal during call</li>
</ul>

<h2>Phase 7: Post-Launch Support (Week 2-3)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule check-in call 1 week after launch</li>
  <li data-type="taskItem" data-checked="false">Review how they're using it</li>
  <li data-type="taskItem" data-checked="false">Answer any questions</li>
  <li data-type="taskItem" data-checked="false">Make minor adjustments if needed</li>
  <li data-type="taskItem" data-checked="false">Deliver final training recording and documentation</li>
  <li data-type="taskItem" data-checked="false">Mark project complete</li>
</ul>

<h2>Standard Deal Stages</h2>

<p>Customize based on client, but start with:</p>

<ol>
  <li><strong>New Lead</strong> - Initial contact, not yet qualified</li>
  <li><strong>Qualified</strong> - Confirmed fit, needs identified</li>
  <li><strong>Proposal Sent</strong> - Pricing and scope delivered</li>
  <li><strong>Negotiation</strong> - Discussing terms, objections, pricing</li>
  <li><strong>Closed Won</strong> - Deal signed, payment received</li>
  <li><strong>Closed Lost</strong> - Decided not to proceed (note reason)</li>
</ol>

<h2>Custom Fields to Set Up</h2>

<ul>
  <li><strong>Deal Value:</strong> Expected revenue from deal</li>
  <li><strong>Expected Close Date:</strong> When we think it will close</li>
  <li><strong>Lead Source:</strong> Where they came from (referral, website, cold outreach)</li>
  <li><strong>Service Interest:</strong> Which service they're interested in</li>
  <li><strong>Priority:</strong> Hot/Warm/Cold</li>
  <li><strong>Next Action:</strong> What needs to happen next</li>
</ul>

<h2>Client Success Criteria</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Client adds at least 5 new contacts in first week</li>
  <li data-type="taskItem" data-checked="false">Client moves at least 2 deals through pipeline</li>
  <li data-type="taskItem" data-checked="false">Client reports CRM is "easy to use"</li>
  <li data-type="taskItem" data-checked="false">Client uses CRM daily or every other day</li>
  <li data-type="taskItem" data-checked="false">Client closes first deal tracked in CRM within 30 days</li>
</ul>

<p><strong>Common Mistakes to Avoid:</strong></p>
<ul>
  <li>Making pipeline too complex (keep it simple)</li>
  <li>Too many custom fields (5-8 is plenty)</li>
  <li>Migrating bad data (clean first!)</li>
  <li>Not training the team adequately</li>
  <li>Choosing a CRM that's too advanced for their needs</li>
</ul>

<p><strong>Ongoing Maintenance (Optional):</strong></p>
<ul>
  <li>Monthly check-in: $100-200/month</li>
  <li>Includes: data cleanup, report generation, optimization recommendations</li>
</ul>`,
  },

  "sales-scripting": {
    title: "Sales Script Development SOP",
    division: "BIZDEV" as const,
    serviceType: "Project Work",
    status: "LIVE" as const,
    content: `<h2>Sales Script Development Process</h2>

<p><strong>Purpose:</strong> Create effective sales scripts for service-based business owners who need structure and confidence in sales conversations. Typically includes discovery script, proposal delivery script, and objection handling framework.</p>

<p><strong>Pricing:</strong> $200-$400 per script set.</p>

<h2>Phase 1: Research & Discovery (Day 1-2)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Schedule discovery call with client</li>
  <li data-type="taskItem" data-checked="false">Understand their service offering deeply</li>
  <li data-type="taskItem" data-checked="false">Identify target customer profile</li>
  <li data-type="taskItem" data-checked="false">Understand typical customer pain points</li>
  <li data-type="taskItem" data-checked="false">Learn their current sales process (what's working/not working)</li>
  <li data-type="taskItem" data-checked="false">Record call to reference client's natural language</li>
  <li data-type="taskItem" data-checked="false">Ask about common objections they hear</li>
  <li data-type="taskItem" data-checked="false">Understand their pricing structure</li>
</ul>

<h2>Phase 2: Script Development (Day 2-4)</h2>

<p><strong>Discovery Call Script Components:</strong></p>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Opening: Introduction and agenda-setting (30 seconds)</li>
  <li data-type="taskItem" data-checked="false">Rapport building: Conversational ice-breaker (1 minute)</li>
  <li data-type="taskItem" data-checked="false">Qualification questions: Budget, timeline, decision-maker (3-5 minutes)</li>
  <li data-type="taskItem" data-checked="false">Problem exploration: Deep dive into their challenges (10-15 minutes)</li>
  <li data-type="taskItem" data-checked="false">Solution preview: How you can help (2-3 minutes)</li>
  <li data-type="taskItem" data-checked="false">Next steps: Schedule proposal call or send proposal (1 minute)</li>
  <li data-type="taskItem" data-checked="false">Closing: Thank you and confirm next action</li>
</ul>

<p><strong>Proposal Delivery Script Components:</strong></p>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Recap their challenges (what they told you)</li>
  <li data-type="taskItem" data-checked="false">Present solution (your service package)</li>
  <li data-type="taskItem" data-checked="false">Walk through pricing (confidently, no apologizing)</li>
  <li data-type="taskItem" data-checked="false">Explain process and timeline</li>
  <li data-type="taskItem" data-checked="false">Handle objections (see objection framework)</li>
  <li data-type="taskItem" data-checked="false">Close with clear next step (sign agreement + pay invoice)</li>
</ul>

<h2>Phase 3: Objection Handling Framework (Day 4-5)</h2>

<p>Develop responses for common objections:</p>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">"It's too expensive" → Reframe as investment, show ROI</li>
  <li data-type="taskItem" data-checked="false">"I need to think about it" → Uncover real objection</li>
  <li data-type="taskItem" data-checked="false">"I need to talk to my partner/spouse" → Offer to do 3-way call</li>
  <li data-type="taskItem" data-checked="false">"Can you do it for less?" → Offer phased approach or smaller scope</li>
  <li data-type="taskItem" data-checked="false">"I'm already working with someone" → Differentiate your approach</li>
  <li data-type="taskItem" data-checked="false">Create 2-3 responses per objection (natural language, not robotic)</li>
</ul>

<h2>Phase 4: Refinement (Day 5-6)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Write scripts in conversational tone (how client naturally speaks)</li>
  <li data-type="taskItem" data-checked="false">Include [pause] and [listen] cues</li>
  <li data-type="taskItem" data-checked="false">Add flexibility notes (when to deviate from script)</li>
  <li data-type="taskItem" data-checked="false">Format for easy reading (not walls of text)</li>
  <li data-type="taskItem" data-checked="false">Include sample phrases and word tracks</li>
</ul>

<h2>Phase 5: Delivery & Training (Day 6-7)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Send scripts in PDF format (easy to print and reference)</li>
  <li data-type="taskItem" data-checked="false">Record Loom training (15-20 minutes) covering:</li>
  <li data-type="taskItem" data-checked="false">→ How to use each script</li>
  <li data-type="taskItem" data-checked="false">→ When to follow it vs when to improvise</li>
  <li data-type="taskItem" data-checked="false">→ Role-play walkthrough of key sections</li>
  <li data-type="taskItem" data-checked="false">→ Tips for sounding natural, not scripted</li>
  <li data-type="taskItem" data-checked="false">Schedule optional role-play practice call</li>
  <li data-type="taskItem" data-checked="false">Offer to sit in on first 1-2 real sales calls (if client wants)</li>
</ul>

<h2>Phase 6: Iteration (Week 2-3)</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Follow up 1 week after delivery</li>
  <li data-type="taskItem" data-checked="false">Ask how scripts are working in real conversations</li>
  <li data-type="taskItem" data-checked="false">Collect feedback on what feels awkward or unnatural</li>
  <li data-type="taskItem" data-checked="false">Make 1 round of revisions (included in price)</li>
  <li data-type="taskItem" data-checked="false">Deliver final version</li>
</ul>

<h2>Script Best Practices</h2>

<p><strong>Do:</strong></p>
<ul>
  <li>Use client's actual language and phrases</li>
  <li>Keep sentences short and conversational</li>
  <li>Include open-ended questions</li>
  <li>Build in listening pauses</li>
  <li>Provide flexibility and alternatives</li>
  <li>Make it easy to scan and reference mid-call</li>
</ul>

<p><strong>Don't:</strong></p>
<ul>
  <li>Write long paragraphs (they won't read mid-call)</li>
  <li>Use jargon client doesn't naturally use</li>
  <li>Make it sound like a telemarketer</li>
  <li>Overscript (leave room for personality)</li>
  <li>Forget to address common objections</li>
</ul>

<h2>Deliverable Checklist</h2>

<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false">Discovery call script (1-2 pages)</li>
  <li data-type="taskItem" data-checked="false">Proposal delivery script (1-2 pages)</li>
  <li data-type="taskItem" data-checked="false">Objection handling guide (1 page)</li>
  <li data-type="taskItem" data-checked="false">Follow-up email templates (3-5 templates)</li>
  <li data-type="taskItem" data-checked="false">Quick reference card (1 page, key points only)</li>
  <li data-type="taskItem" data-checked="false">Loom training video</li>
</ul>

<p><strong>Success Metrics:</strong></p>
<ul>
  <li>Client uses scripts on at least 3 sales calls</li>
  <li>Client reports feeling more confident</li>
  <li>Client closes at least 1 deal using scripts within 30 days</li>
  <li>Client refers back to scripts regularly</li>
</ul>

<p><strong>Add-On Services:</strong></p>
<ul>
  <li>Role-play coaching calls: $100/hour</li>
  <li>Sit in on live sales calls: $150/call</li>
  <li>Additional script revisions: $100/round</li>
  <li>Cold email sequences: $200-300</li>
</ul>`,
  },
};
