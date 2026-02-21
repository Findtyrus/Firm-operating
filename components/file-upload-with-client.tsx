"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, File, X, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/supabase";

interface Client {
  id: string;
  name: string;
}

interface FileUploadWithClientProps {
  onUploadComplete: () => void;
}

export function FileUploadWithClient({ onUploadComplete }: FileUploadWithClientProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("OTHER");
  const [clientId, setClientId] = useState("loading");
  const [clients, setClients] = useState<Client[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch("/api/clients");
    const data = await response.json();
    setClients(data);
    if (data.length > 0) {
      setClientId(data[0].id);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || clientId === "loading") return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const { url, error } = await uploadFile(selectedFile, "client-files");

      if (error) {
        alert(`Upload failed: ${error}`);
        setUploading(false);
        return;
      }

      const response = await fetch("/api/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          fileName: selectedFile.name,
          fileUrl: url,
          fileType: selectedFile.type,
          category,
        }),
      });

      if (response.ok) {
        setSelectedFile(null);
        setCategory("OTHER");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onUploadComplete();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-8 border-0 shadow-lg rounded-2xl bg-gradient-to-br from-white to-gray-50">
      <h3 className="text-xl font-bold mb-2">Upload New File</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Upload documents, PDFs, and files for your clients
      </p>

      <div className="space-y-5">
        <div>
          <Label htmlFor="client" className="text-sm font-semibold">Assign to Client *</Label>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {clients.length === 0 ? (
                <SelectItem value="loading">Loading clients...</SelectItem>
              ) : (
                clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category" className="text-sm font-semibold">File Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CONTRACT">Contract</SelectItem>
              <SelectItem value="TAX_RETURN">Tax Return</SelectItem>
              <SelectItem value="FINANCIAL_STATEMENT">Financial Statement</SelectItem>
              <SelectItem value="BANK_STATEMENT">Bank Statement</SelectItem>
              <SelectItem value="INVOICE">Invoice</SelectItem>
              <SelectItem value="RECEIPT">Receipt</SelectItem>
              <SelectItem value="CORRESPONDENCE">Correspondence</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="file" className="text-sm font-semibold">Select File</Label>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.txt,.csv"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-12"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File (PDF, Images, Documents)
            </Button>
          </div>
        </div>

        {selectedFile && (
          <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  {selectedFile.type && ` • ${selectedFile.type}`}
                </p>
                <div className="flex gap-2 mt-1">
                  {selectedFile.type === "application/pdf" && (
                    <span className="inline-block px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      PDF
                    </span>
                  )}
                  {selectedFile.type?.startsWith("image/") && (
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      IMAGE
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading || clientId === "loading"}
          className="w-full h-12 text-base"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Upload File
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
