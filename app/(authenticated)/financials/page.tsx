"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  FileText,
  Plus,
  Calendar,
} from "lucide-react";
import { StatCard } from "@/components/stat-card";

interface Invoice {
  id: string;
  amount: number;
  status: string;
  servicePackage: string;
  issuedDate: string | null;
  dueDate: string | null;
  paidDate: string | null;
  client: {
    id: string;
    name: string;
  };
}

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  partner: {
    name: string;
  };
}

interface Client {
  id: string;
  name: string;
  mrr: number | null;
  division: string;
  status: string;
}

export default function FinancialsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState("current");

  useEffect(() => {
    fetchData();
  }, [monthFilter]);

  const fetchData = async () => {
    setLoading(true);
    const [invoicesRes, expensesRes, clientsRes] = await Promise.all([
      fetch("/api/invoices"),
      fetch("/api/expenses"),
      fetch("/api/clients?status=ACTIVE"),
    ]);

    const [invoicesData, expensesData, clientsData] = await Promise.all([
      invoicesRes.json(),
      expensesRes.json(),
      clientsRes.json(),
    ]);

    setInvoices(invoicesData);
    setExpenses(expensesData);
    setClients(clientsData);
    setLoading(false);
  };

  const totalMRR = clients.reduce((sum, c) => sum + (c.mrr || 0), 0);
  const accountingMRR = clients
    .filter((c) => c.division === "ACCOUNTING" || c.division === "BOTH")
    .reduce((sum, c) => sum + (c.mrr || 0), 0);
  const bizdevMRR = clients
    .filter((c) => c.division === "BIZDEV" || c.division === "BOTH")
    .reduce((sum, c) => sum + (c.mrr || 0), 0);

  const paidInvoices = invoices.filter((i) => i.status === "PAID");
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + i.amount, 0);

  const outstandingInvoices = invoices.filter((i) => i.status === "SENT" || i.status === "OVERDUE");
  const outstandingAmount = outstandingInvoices.reduce((sum, i) => sum + i.amount, 0);

  const overdueInvoices = invoices.filter((i) => {
    if (i.status !== "SENT") return false;
    if (!i.dueDate) return false;
    return new Date(i.dueDate) < new Date();
  });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "default";
      case "SENT":
        return "outline";
      case "OVERDUE":
        return "destructive";
      case "DRAFT":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Financials"
        description="Revenue tracking, invoices, and expenses"
      />

      <div className="p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total MRR"
            value={`$${totalMRR.toLocaleString()}`}
            icon={DollarSign}
          />
          <StatCard
            title="Accounting MRR"
            value={`$${accountingMRR.toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatCard
            title="BizDev MRR"
            value={`$${bizdevMRR.toLocaleString()}`}
            icon={TrendingUp}
          />
          <StatCard
            title="Revenue MTD"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={FileText}
            description={`${paidInvoices.length} paid invoices`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Receipt className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold">Expenses MTD</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ${totalExpenses.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {expenses.length} expense{expenses.length !== 1 ? "s" : ""} this month
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-bold">Outstanding</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              ${outstandingAmount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {outstandingInvoices.length} unpaid invoice{outstandingInvoices.length !== 1 ? "s" : ""}
            </p>
            {overdueInvoices.length > 0 && (
              <p className="text-sm text-red-600 font-semibold mt-2">
                {overdueInvoices.length} overdue
              </p>
            )}
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="w-full">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="mrr">MRR Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="mt-6">
            <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Invoices</h2>
                <Link href="/financials/new-invoice">
                  <Button size="sm" className="shadow-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Invoice
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {invoices.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No invoices found
                  </p>
                ) : (
                  invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-start justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{invoice.client.name}</h4>
                          <Badge variant={getInvoiceStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {invoice.servicePackage}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {invoice.issuedDate && (
                            <span>
                              Issued: {new Date(invoice.issuedDate).toLocaleDateString()}
                            </span>
                          )}
                          {invoice.dueDate && (
                            <span>
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {invoice.paidDate && (
                            <span className="text-green-600 font-semibold">
                              Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-primary">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={async () => {
                            if (confirm("Delete this invoice?")) {
                              await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
                              fetchData();
                            }
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Expenses</h2>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Log Expense
                </Button>
              </div>

              <div className="space-y-3">
                {expenses.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No expenses found
                  </p>
                ) : (
                  expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-start justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{expense.description}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-medium">{expense.partner.name}</span>
                          <span>•</span>
                          <span>{expense.category.replace("_", " ")}</span>
                          <span>•</span>
                          <span>{new Date(expense.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${expense.amount.toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mrr" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-display font-bold mb-6">
                MRR Breakdown by Client
              </h2>

              <div className="space-y-3">
                {clients
                  .filter((c) => c.mrr && c.mrr > 0)
                  .sort((a, b) => (b.mrr || 0) - (a.mrr || 0))
                  .map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{client.name}</h4>
                        <span
                          className={`text-xs font-medium ${
                            client.division === "ACCOUNTING"
                              ? "text-blue-700"
                              : client.division === "BIZDEV"
                              ? "text-green-700"
                              : "text-purple-700"
                          }`}
                        >
                          {client.division === "BIZDEV" ? "BizDev" : client.division}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${client.mrr?.toLocaleString()}/mo
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${((client.mrr || 0) * 12).toLocaleString()}/year
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total MRR</p>
                    <p className="text-2xl font-bold text-primary">
                      ${totalMRR.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${(totalMRR * 12).toLocaleString()}/year
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Accounting</p>
                    <p className="text-2xl font-bold text-blue-700">
                      ${accountingMRR.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((accountingMRR / totalMRR) * 100).toFixed(0)}% of total
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">BizDev</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${bizdevMRR.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((bizdevMRR / totalMRR) * 100).toFixed(0)}% of total
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
