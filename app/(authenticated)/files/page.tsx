"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploadWithClient } from "@/components/file-upload-with-client";
import { File, Download, Trash2, Calendar, User } from "lucide-react";

interface FileRecord {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  category: string;
  createdAt: string;
  client: {
    id: string;
    name: string;
  };
  uploadedBy: {
    id: string;
    name: string;
  };
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  useEffect(() => {
    fetchFiles();
  }, [categoryFilter]);

  const fetchFiles = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryFilter !== "ALL") params.set("category", categoryFilter);

    const response = await fetch(`/api/files?${params}`);
    const data = await response.json();
    setFiles(data);
    setLoading(false);
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const response = await fetch(`/api/files?id=${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFiles();
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "CONTRACT":
        return "default";
      case "TAX_RETURN":
        return "destructive";
      case "FINANCIAL_STATEMENT":
        return "default";
      case "BANK_STATEMENT":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <DashboardHeader
        title="Files"
        description="Client documents and firm files"
      />

      <div className="p-8 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FileUploadWithClient onUploadComplete={fetchFiles} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">All Files</h2>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  <SelectItem value="CONTRACT">Contracts</SelectItem>
                  <SelectItem value="TAX_RETURN">Tax Returns</SelectItem>
                  <SelectItem value="FINANCIAL_STATEMENT">Financial Statements</SelectItem>
                  <SelectItem value="BANK_STATEMENT">Bank Statements</SelectItem>
                  <SelectItem value="INVOICE">Invoices</SelectItem>
                  <SelectItem value="RECEIPT">Receipts</SelectItem>
                  <SelectItem value="CORRESPONDENCE">Correspondence</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading files...</p>
              </div>
            ) : files.length === 0 ? (
              <Card className="p-12 text-center border-0 shadow-sm">
                <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No files found</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your first file using the form on the left.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {files.map((file) => (
                  <Card key={file.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-inner">
                          <File className="h-7 w-7 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold truncate text-lg">{file.fileName}</h3>
                            <Badge variant={getCategoryColor(file.category)} className="shadow-sm">
                              {file.category.replace("_", " ")}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-gray-700">{file.client.name}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{file.uploadedBy.name}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(file.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
