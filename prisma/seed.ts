import { PrismaClient } from "@prisma/client";
import { SOP_TEMPLATES } from "../lib/sop-content";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const partners = [
    {
      clerkId: "user_39zby8qk3gAVnQyaKG2nYy0KZVw",
      name: "Tyrus L. Burton Jr.",
      email: "tyrus@magnoliadvisorygroup.com",
      division: "ACCOUNTING" as const,
      role: "PARTNER" as const,
    },
    {
      clerkId: "user_39zcLq9UHegkiPMzDgFcbiyI0rE",
      name: "Hunter Bass",
      email: "hunter@magnoliadvisorygroup.com",
      division: "ACCOUNTING" as const,
      role: "PARTNER" as const,
    },
    {
      clerkId: "user_39zc49kLIJ5zBZY6WDze56fmoKs",
      name: "Christian Camacho",
      email: "christian@magnoliadvisorygroup.com",
      division: "BIZDEV" as const,
      role: "PARTNER" as const,
    },
  ];

  console.log("Creating partners...");
  const createdPartners = await Promise.all(
    partners.map((partner) =>
      prisma.partner.upsert({
        where: { email: partner.email },
        update: {},
        create: partner,
      })
    )
  );

  const [tyrus, hunter, christian] = createdPartners;

  console.log("Creating sample clients...");
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: "River City Consulting",
        contactName: "Sarah Mitchell",
        email: "sarah@rivercityconsulting.com",
        phone: "(601) 555-0101",
        city: "Jackson",
        division: "ACCOUNTING",
        status: "ACTIVE",
        servicePackage: "Professional Bookkeeping",
        mrr: 425,
        contractStartDate: new Date("2025-09-01"),
        monthlyTransactionVolume: 145,
        bankAccountCount: 2,
        relationshipManagerId: tyrus.id,
        engagementLevel: "ACTIVE",
        notes: "Great client, very responsive. Needs monthly P&L by 7th.",
      },
    }),
    prisma.client.create({
      data: {
        name: "Delta Digital Marketing",
        contactName: "Marcus Johnson",
        email: "marcus@deltadigital.com",
        phone: "(662) 555-0202",
        city: "Oxford",
        division: "BIZDEV",
        status: "ACTIVE",
        servicePackage: "Growth Systems",
        mrr: 1100,
        contractStartDate: new Date("2025-10-15"),
        relationshipManagerId: christian.id,
        engagementLevel: "ACTIVE",
        notes: "Running revenue dashboard + CRM. Monthly strategy call scheduled.",
      },
    }),
    prisma.client.create({
      data: {
        name: "Pine Belt Physical Therapy",
        contactName: "Dr. Jennifer Hayes",
        email: "jennifer@pinebeltpt.com",
        phone: "(601) 555-0303",
        city: "Hattiesburg",
        division: "BOTH",
        status: "ACTIVE",
        servicePackage: "Professional Bookkeeping + Foundation BizDev",
        mrr: 850,
        contractStartDate: new Date("2025-11-01"),
        monthlyTransactionVolume: 180,
        bankAccountCount: 1,
        relationshipManagerId: tyrus.id,
        engagementLevel: "ACTIVE",
        notes: "Dual service client. Books + website rebuild in progress.",
      },
    }),
    prisma.client.create({
      data: {
        name: "Coastal Insurance Agency",
        contactName: "Robert Chen",
        email: "robert@coastalins.com",
        phone: "(228) 555-0404",
        city: "Biloxi",
        division: "ACCOUNTING",
        status: "ONBOARDING",
        servicePackage: "Essential Bookkeeping",
        mrr: 325,
        contractStartDate: new Date("2026-02-01"),
        monthlyTransactionVolume: 95,
        bankAccountCount: 1,
        relationshipManagerId: hunter.id,
        engagementLevel: "WARM",
        notes: "New client, completing QBO setup this week.",
      },
    }),
    prisma.client.create({
      data: {
        name: "Magnolia Law Group",
        contactName: "Amanda Price",
        email: "amanda@magnolialaw.com",
        phone: "(601) 555-0505",
        city: "Jackson",
        division: "ACCOUNTING",
        status: "PROSPECT",
        servicePackage: null,
        mrr: null,
        relationshipManagerId: hunter.id,
        engagementLevel: "COLD",
        notes: "Discovery call scheduled for next week. Looking for cleanup + monthly.",
      },
    }),
  ]);

  console.log("Creating sample tasks...");
  await Promise.all([
    prisma.task.create({
      data: {
        title: "Monthly Close - River City Consulting",
        description:
          "Complete January 2026 bookkeeping close. Reconcile accounts, categorize expenses, generate P&L and Balance Sheet.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        assignedToId: tyrus.id,
        clientId: clients[0].id,
        dueDate: new Date("2026-02-07"),
        sopReference: "monthly-bookkeeping",
      },
    }),
    prisma.task.create({
      data: {
        title: "QBO Setup - Coastal Insurance",
        description: "Complete QuickBooks Online setup for new client. Import chart of accounts, connect bank feeds.",
        status: "TODO",
        priority: "HIGH",
        assignedToId: hunter.id,
        clientId: clients[3].id,
        dueDate: new Date("2026-02-24"),
        sopReference: "client-onboarding",
      },
    }),
    prisma.task.create({
      data: {
        title: "Revenue Dashboard Update - Delta Digital",
        description: "Update sales metrics in client's revenue performance dashboard. Add February pipeline data.",
        status: "TODO",
        priority: "MEDIUM",
        assignedToId: christian.id,
        clientId: clients[1].id,
        dueDate: new Date("2026-02-25"),
        sopReference: "revenue-dashboard",
      },
    }),
    prisma.task.create({
      data: {
        title: "Monthly Close - Pine Belt PT",
        description: "Complete January close for Pine Belt Physical Therapy.",
        status: "COMPLETE",
        priority: "HIGH",
        assignedToId: tyrus.id,
        clientId: clients[2].id,
        dueDate: new Date("2026-02-05"),
        completedAt: new Date("2026-02-05"),
        sopReference: "monthly-bookkeeping",
      },
    }),
    prisma.task.create({
      data: {
        title: "Website Rebuild - Pine Belt PT",
        description: "Complete 3-page website rebuild: Home, Services, Contact. Launch by end of month.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        assignedToId: christian.id,
        clientId: clients[2].id,
        dueDate: new Date("2026-02-28"),
        sopReference: "website-build",
      },
    }),
    prisma.task.create({
      data: {
        title: "Review January P&L",
        description: "Review firm's January P&L and prepare for partner meeting.",
        status: "TODO",
        priority: "MEDIUM",
        assignedToId: tyrus.id,
        dueDate: new Date("2026-02-23"),
      },
    }),
    prisma.task.create({
      data: {
        title: "Discovery Call - Magnolia Law",
        description: "Initial discovery call with Amanda Price. Assess fit for cleanup + monthly bookkeeping package.",
        status: "TODO",
        priority: "MEDIUM",
        assignedToId: hunter.id,
        clientId: clients[4].id,
        dueDate: new Date("2026-02-26"),
      },
    }),
  ]);

  console.log("Creating sample invoices...");
  await Promise.all([
    prisma.invoice.create({
      data: {
        clientId: clients[0].id,
        amount: 425,
        status: "PAID",
        servicePackage: "Professional Bookkeeping - February 2026",
        issuedDate: new Date("2026-02-01"),
        dueDate: new Date("2026-02-01"),
        paidDate: new Date("2026-02-01"),
      },
    }),
    prisma.invoice.create({
      data: {
        clientId: clients[1].id,
        amount: 1100,
        status: "SENT",
        servicePackage: "Growth Systems - February 2026",
        issuedDate: new Date("2026-02-01"),
        dueDate: new Date("2026-02-01"),
        notes: "Sent via email on 2/1. Follow up scheduled for 2/8.",
      },
    }),
    prisma.invoice.create({
      data: {
        clientId: clients[2].id,
        amount: 850,
        status: "PAID",
        servicePackage: "Professional Bookkeeping + Foundation BizDev - February 2026",
        issuedDate: new Date("2026-02-01"),
        dueDate: new Date("2026-02-01"),
        paidDate: new Date("2026-02-02"),
      },
    }),
  ]);

  console.log("Creating SOPs with full content...");
  await Promise.all([
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["client-onboarding"],
        tags: ["onboarding", "setup", "quickbooks", "client-facing"],
        lastReviewedAt: new Date("2026-01-15"),
        createdById: tyrus.id,
      },
    }),
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["monthly-bookkeeping"],
        tags: ["monthly", "bookkeeping", "recurring", "close-process"],
        lastReviewedAt: new Date("2026-01-15"),
        createdById: tyrus.id,
      },
    }),
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["cleanup-catchup"],
        tags: ["cleanup", "catch-up", "project", "quickbooks"],
        lastReviewedAt: new Date("2026-01-10"),
        createdById: hunter.id,
      },
    }),
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["revenue-dashboard"],
        tags: ["dashboard", "sales", "metrics", "recurring"],
        lastReviewedAt: new Date("2026-02-01"),
        createdById: christian.id,
      },
    }),
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["website-build"],
        tags: ["website", "project", "design", "client-facing"],
        lastReviewedAt: new Date("2026-01-20"),
        createdById: christian.id,
      },
    }),
    prisma.sOP.create({
      data: {
        ...SOP_TEMPLATES["crm-setup"],
        tags: ["crm", "setup", "sales", "project"],
        lastReviewedAt: new Date("2026-01-25"),
        createdById: christian.id,
      },
    }),
  ]);

  console.log("✅ Seeding complete!");
  console.log(`Created ${createdPartners.length} partners`);
  console.log(`Created ${clients.length} clients`);
  console.log("Created 7 tasks");
  console.log("Created 3 invoices");
  console.log("Created 6 SOPs with full content");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
