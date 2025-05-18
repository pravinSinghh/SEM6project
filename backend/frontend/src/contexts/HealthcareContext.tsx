
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

interface Prescription {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  medications: Medication[];
  diagnosis: string;
  instructions: string;
  createdAt: string;
  signature: string;
  status: "pending" | "active" | "completed";
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface MedicalDocument {
  id: string;
  patientId: string;
  title: string;
  type: string;
  fileUrl: string;
  uploadedAt: string;
  notes?: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

interface HealthcareContextType {
  prescriptions: Prescription[];
  medicalDocuments: MedicalDocument[];
  appointments: Appointment[];
  createPrescription: (prescription: Omit<Prescription, "id" | "createdAt">) => Promise<boolean>;
  uploadDocument: (document: Omit<MedicalDocument, "id" | "uploadedAt">) => Promise<boolean>;
  scheduleAppointment: (appointment: Omit<Appointment, "id">) => Promise<boolean>;
  getPrescriptionsByPatient: (patientId: string) => Prescription[];
  getPrescriptionsByDoctor: (doctorId: string) => Prescription[];
  getDocumentsByPatient: (patientId: string) => MedicalDocument[];
  getAppointmentsByPatient: (patientId: string) => Appointment[];
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
}

// Sample data
const mockPrescriptions: Prescription[] = [
  {
    id: "p1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Johnson",
    patientId: "p1",
    patientName: "James Wilson",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "3 times daily",
        duration: "7 days",
      },
    ],
    diagnosis: "Acute Sinusitis",
    instructions: "Take with food. Complete the full course.",
    createdAt: "2025-05-10T09:30:00Z",
    signature: "Dr. S. Johnson",
    status: "active",
  },
  {
    id: "p2",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    patientId: "p2",
    patientName: "Emily Davis",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    diagnosis: "Hypertension",
    instructions: "Take in the morning. Avoid grapefruit juice.",
    createdAt: "2025-05-08T14:15:00Z",
    signature: "Dr. M. Chen",
    status: "active",
  },
];

const mockDocuments: MedicalDocument[] = [
  {
    id: "d1",
    patientId: "p1",
    title: "Chest X-Ray Results",
    type: "Imaging",
    fileUrl: "/placeholder.svg",
    uploadedAt: "2025-05-01T10:20:00Z",
    notes: "No significant findings",
  },
  {
    id: "d2",
    patientId: "p2",
    title: "Blood Test Results",
    type: "Laboratory",
    fileUrl: "/placeholder.svg",
    uploadedAt: "2025-05-03T15:45:00Z",
    notes: "Cholesterol levels slightly elevated",
  },
];

const mockAppointments: Appointment[] = [
  {
    id: "a1",
    doctorId: "d1",
    doctorName: "Dr. Sarah Johnson",
    patientId: "p1",
    patientName: "James Wilson",
    date: "2025-05-20",
    time: "09:00",
    status: "scheduled",
    notes: "Follow-up appointment",
  },
  {
    id: "a2",
    doctorId: "d2",
    doctorName: "Dr. Michael Chen",
    patientId: "p2",
    patientName: "Emily Davis",
    date: "2025-05-18",
    time: "14:30",
    status: "scheduled",
    notes: "Blood pressure check",
  },
];

const HealthcareContext = createContext<HealthcareContextType | undefined>(undefined);

export const HealthcareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [medicalDocuments, setMedicalDocuments] = useState<MedicalDocument[]>(mockDocuments);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const createPrescription = async (data: Omit<Prescription, "id" | "createdAt">): Promise<boolean> => {
    try {
      const newPrescription: Prescription = {
        ...data,
        id: `p${Math.random().toString(36).substring(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      setPrescriptions([...prescriptions, newPrescription]);
      toast.success("Prescription created successfully");
      return true;
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription");
      return false;
    }
  };

  const uploadDocument = async (data: Omit<MedicalDocument, "id" | "uploadedAt">): Promise<boolean> => {
    try {
      const newDocument: MedicalDocument = {
        ...data,
        id: `d${Math.random().toString(36).substring(2, 9)}`,
        uploadedAt: new Date().toISOString(),
      };

      setMedicalDocuments([...medicalDocuments, newDocument]);
      toast.success("Document uploaded successfully");
      return true;
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error("Failed to upload document");
      return false;
    }
  };

  const scheduleAppointment = async (data: Omit<Appointment, "id">): Promise<boolean> => {
    try {
      const newAppointment: Appointment = {
        ...data,
        id: `a${Math.random().toString(36).substring(2, 9)}`,
      };

      setAppointments([...appointments, newAppointment]);
      toast.success("Appointment scheduled successfully");
      return true;
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast.error("Failed to schedule appointment");
      return false;
    }
  };

  const getPrescriptionsByPatient = (patientId: string): Prescription[] => {
    return prescriptions.filter(p => p.patientId === patientId);
  };

  const getPrescriptionsByDoctor = (doctorId: string): Prescription[] => {
    return prescriptions.filter(p => p.doctorId === doctorId);
  };

  const getDocumentsByPatient = (patientId: string): MedicalDocument[] => {
    return medicalDocuments.filter(d => d.patientId === patientId);
  };

  const getAppointmentsByPatient = (patientId: string): Appointment[] => {
    return appointments.filter(a => a.patientId === patientId);
  };

  const getAppointmentsByDoctor = (doctorId: string): Appointment[] => {
    return appointments.filter(a => a.doctorId === doctorId);
  };

  return (
    <HealthcareContext.Provider
      value={{
        prescriptions,
        medicalDocuments,
        appointments,
        createPrescription,
        uploadDocument,
        scheduleAppointment,
        getPrescriptionsByPatient,
        getPrescriptionsByDoctor,
        getDocumentsByPatient,
        getAppointmentsByPatient,
        getAppointmentsByDoctor,
      }}
    >
      {children}
    </HealthcareContext.Provider>
  );
};

export const useHealthcare = () => {
  const context = useContext(HealthcareContext);
  if (context === undefined) {
    throw new Error("useHealthcare must be used within a HealthcareProvider");
  }
  return context;
};
