
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthcare } from "@/contexts/HealthcareContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus } from "lucide-react";

const Prescriptions: React.FC = () => {
  const { user } = useAuth();
  const { 
    prescriptions,
    getPrescriptionsByDoctor,
    getPrescriptionsByPatient,
    createPrescription
  } = useHealthcare();
  
  const isDoctor = user?.role === "doctor";
  
  const userPrescriptions = isDoctor 
    ? getPrescriptionsByDoctor(user?.id || "")
    : getPrescriptionsByPatient(user?.id || "");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<typeof prescriptions[0] | null>(null);
  
  // New prescription form state
  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    patientId: "",
    diagnosis: "",
    instructions: "",
    medicationName: "",
    medicationDosage: "",
    medicationFrequency: "",
    medicationDuration: "",
  });
  
  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const prescription = {
      doctorId: user.id,
      doctorName: user.name,
      patientId: newPrescription.patientId,
      patientName: newPrescription.patientName,
      medications: [
        {
          name: newPrescription.medicationName,
          dosage: newPrescription.medicationDosage,
          frequency: newPrescription.medicationFrequency,
          duration: newPrescription.medicationDuration,
        },
      ],
      diagnosis: newPrescription.diagnosis,
      instructions: newPrescription.instructions,
      signature: `Dr. ${user.name}`,
      status: "active" as const,
    };
    
    await createPrescription(prescription);
    setDialogOpen(false);
    // Reset form fields
    setNewPrescription({
      patientName: "",
      patientId: "",
      diagnosis: "",
      instructions: "",
      medicationName: "",
      medicationDosage: "",
      medicationFrequency: "",
      medicationDuration: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
          <p className="text-muted-foreground">
            {isDoctor 
              ? "Manage and create new prescriptions for your patients"
              : "View your current and past prescriptions"
            }
          </p>
        </div>
        
        {isDoctor && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> New Prescription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleCreatePrescription}>
                <DialogHeader>
                  <DialogTitle>Create New Prescription</DialogTitle>
                  <DialogDescription>
                    Enter the patient information and prescription details.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input 
                        id="patientName" 
                        name="patientName"
                        value={newPrescription.patientName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input 
                        id="patientId" 
                        name="patientId"
                        value={newPrescription.patientId}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis</Label>
                    <Input 
                      id="diagnosis" 
                      name="diagnosis"
                      value={newPrescription.diagnosis}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicationName">Medication Name</Label>
                      <Input 
                        id="medicationName" 
                        name="medicationName"
                        value={newPrescription.medicationName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicationDosage">Dosage</Label>
                      <Input 
                        id="medicationDosage" 
                        name="medicationDosage"
                        value={newPrescription.medicationDosage}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicationFrequency">Frequency</Label>
                      <Input 
                        id="medicationFrequency" 
                        name="medicationFrequency"
                        value={newPrescription.medicationFrequency}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicationDuration">Duration</Label>
                      <Input 
                        id="medicationDuration" 
                        name="medicationDuration"
                        value={newPrescription.medicationDuration}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea 
                      id="instructions" 
                      name="instructions"
                      value={newPrescription.instructions}
                      onChange={handleChange}
                      rows={3} 
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" className="w-full">Create Prescription</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {userPrescriptions.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
              <h3 className="font-medium text-lg">No Prescriptions</h3>
              <p className="text-sm text-muted-foreground">
                {isDoctor 
                  ? "You haven't created any prescriptions yet."
                  : "You don't have any active prescriptions."
                }
              </p>
              
              {isDoctor && (
                <Button 
                  variant="outline" 
                  className="mt-2" 
                  onClick={() => setDialogOpen(true)}
                >
                  Create Prescription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {userPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="overflow-hidden">
              <CardHeader className="bg-health-50 border-b-2 border-health-100 space-y-0 py-3">
                <div className="flex flex-col space-y-1.5">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    {prescription.diagnosis}
                    <div className="flex h-6 w-6 rounded-full bg-health-200 items-center justify-center">
                      <FileText className="h-3 w-3 text-health-700" />
                    </div>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {isDoctor ? "Patient" : "Doctor"}
                    </h3>
                    <p>
                      {isDoctor ? prescription.patientName : prescription.doctorName}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Medications</h3>
                    <ul className="space-y-2 mt-1">
                      {prescription.medications.map((med, i) => (
                        <li key={i} className="flex flex-col">
                          <span className="font-medium">{med.name} ({med.dosage})</span>
                          <span className="text-sm text-muted-foreground">
                            {med.frequency} for {med.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {prescription.instructions && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Instructions</h3>
                      <p className="text-sm mt-1">{prescription.instructions}</p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-health-600 font-medium">
                      {prescription.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
