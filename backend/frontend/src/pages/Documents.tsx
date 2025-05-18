
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthcare } from "@/contexts/HealthcareContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, FileText, Image, FileCheck } from "lucide-react";

const Documents: React.FC = () => {
  const { user } = useAuth();
  const { medicalDocuments, getDocumentsByPatient, uploadDocument } = useHealthcare();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<typeof medicalDocuments[0] | null>(null);
  
  // New document form state
  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "",
    notes: "",
    fileUrl: "/placeholder.svg", // For demo purposes
  });
  
  const userDocuments = getDocumentsByPatient(user?.id || "");
  
  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const document = {
      patientId: user.id,
      title: newDocument.title,
      type: newDocument.type,
      fileUrl: newDocument.fileUrl,
      notes: newDocument.notes,
    };
    
    await uploadDocument(document);
    setDialogOpen(false);
    // Reset form
    setNewDocument({
      title: "",
      type: "",
      notes: "",
      fileUrl: "/placeholder.svg",
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDocument((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setNewDocument((prev) => ({
      ...prev,
      type: value,
    }));
  };
  
  const documentTypeIcon = (type: string) => {
    switch (type) {
      case "Imaging":
        return <Image className="h-4 w-4" />;
      case "Laboratory":
        return <FileCheck className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Documents</h1>
          <p className="text-muted-foreground">
            View and manage your medical records and test results
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <FileUp className="h-4 w-4 mr-2" /> Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <form onSubmit={handleUploadDocument}>
              <DialogHeader>
                <DialogTitle>Upload Medical Document</DialogTitle>
                <DialogDescription>
                  Add details about your medical document or test result.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newDocument.title}
                    onChange={handleChange}
                    placeholder="e.g., Blood Test Results"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select 
                    value={newDocument.type} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laboratory">Laboratory Results</SelectItem>
                      <SelectItem value="Imaging">Imaging (X-Ray, MRI, etc.)</SelectItem>
                      <SelectItem value="Report">Medical Report</SelectItem>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                    <FileUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG (max 10MB)
                    </p>
                    <Input 
                      type="file" 
                      id="file" 
                      className="hidden" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    name="notes"
                    value={newDocument.notes}
                    onChange={handleChange}
                    placeholder="Add any additional information about this document"
                    rows={3} 
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="w-full">Upload Document</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {userDocuments.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
              <h3 className="font-medium text-lg">No Documents</h3>
              <p className="text-sm text-muted-foreground">
                You haven't uploaded any medical documents yet.
              </p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => setDialogOpen(true)}
              >
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userDocuments.map((document) => (
            <Card key={document.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <img 
                    src={document.fileUrl} 
                    alt={document.title} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                  <div className="bg-health-100 rounded-full p-1.5">
                    {documentTypeIcon(document.type)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Document Type</span>
                    <span className="text-sm text-muted-foreground">{document.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uploaded On</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {document.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm font-medium">Notes</span>
                    <p className="text-sm text-muted-foreground mt-1">{document.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 py-4 border-t bg-gray-50">
                <div className="w-full flex justify-between">
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;
