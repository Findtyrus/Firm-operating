"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, User, DollarSign, FileText } from "lucide-react";
import Link from "next/link";
import { FileUpload } from "@/components/file-upload";
import { ClientActivity } from "@/components/client-activity";
import { useRouter } from "next/navigation";

interface ClientDetailViewProps {
  client: any;
}

export function ClientDetailView({ client }: ClientDetailViewProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "PROSPECT":
        return "secondary";
      case "ONBOARDING":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-8 max-w-6xl space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant={getStatusColor(client.status)}>{client.status}</Badge>
        <span className="text-sm text-muted-foreground">•</span>
        <span className="text-sm font-medium">{client.engagementLevel}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 shadow-sm border-0 rounded-xl">
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Information</h3>
            {client.contactName && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{client.contactName}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            {client.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{client.phone}</span>
              </div>
            )}
            {client.city && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{client.city}</span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-0 rounded-xl">
          <div className="space-y-4">
            <h3 className="font-semibold">Service Details</h3>
            {client.servicePackage && (
              <div className="text-sm">
                <p className="text-muted-foreground mb-1">Package</p>
                <p className="font-medium">{client.servicePackage}</p>
              </div>
            )}
            {client.mrr && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  ${client.mrr.toLocaleString()}/mo
                </span>
              </div>
            )}
            <div className="text-sm">
              <p className="text-muted-foreground mb-1">Relationship Manager</p>
              <p className="font-medium">{client.relationshipManager.name}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-0 rounded-xl">
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open Tasks</span>
                <span className="font-semibold">{client.tasks.filter((t: any) => t.status !== "COMPLETE").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invoices</span>
                <span className="font-semibold">{client.invoices.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Files</span>
                <span className="font-semibold">{client.files.length}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-6">
          <ClientActivity clientId={client.id} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FileUpload clientId={client.id} onUploadComplete={() => router.refresh()} />
            
            <Card className="p-6 border-0 shadow-sm rounded-xl">
              <h3 className="font-semibold mb-4">Recent Files</h3>
              <div className="space-y-3">
                {client.files.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No files uploaded yet</p>
                ) : (
                  client.files.slice(0, 5).map((file: any) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{file.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(file.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Badge variant="outline" className="cursor-pointer">View</Badge>
                      </a>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card className="p-6 border-0 shadow-sm rounded-xl">
            <h3 className="font-semibold mb-4">Client Tasks</h3>
            {client.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tasks for this client</p>
            ) : (
              <div className="space-y-2">
                {client.tasks.map((task: any) => (
                  <Link key={task.id} href={`/tasks/${task.id}`}>
                    <div className="p-4 border rounded-xl hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <Badge>{task.status}</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card className="p-6 border-0 shadow-sm rounded-xl">
            <h3 className="font-semibold mb-4">Invoices</h3>
            {client.invoices.length === 0 ? (
              <p className="text-sm text-muted-foreground">No invoices yet</p>
            ) : (
              <div className="space-y-3">
                {client.invoices.map((invoice: any) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-200">
                    <div>
                      <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{invoice.servicePackage}</p>
                    </div>
                    <Badge>{invoice.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
