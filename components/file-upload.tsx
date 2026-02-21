"use client";

import { useState, useRef } from "react";
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

interface FileUploadProps {
  clientId: string;
  onUploadComplete: () => void;
}

export function FileUpload({ clientId, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("OTHER");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

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
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Upload File</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="category">File Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
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
          <Label htmlFor="file">Select File</Label>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File (PDF, Images, Documents)
            </Button>
          </div>
        </div>

        {selectedFile && (
          <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || "Unknown type"}
                </p>
                {selectedFile.type === "application/pdf" && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                    PDF
                  </span>
                )}
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
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
