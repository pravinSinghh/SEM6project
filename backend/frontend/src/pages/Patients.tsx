
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Calendar, FileText, User } from "lucide-react";

const Patients: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock patient data for demo purposes
  const patients = [
    {
      id: "p1",
      name: "James Wilson",
      email: "james@example.com",
      avatar: "https://i.pravatar.cc/150?img=53",
      medicalId: "PAT-10032",
      lastVisit: "May 10, 2025",
      age: 42,
      conditions: ["Hypertension", "Type 2 Diabetes"],
    },
    {
      id: "p2",
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "https://i.pravatar.cc/150?img=23",
      medicalId: "PAT-10045",
      lastVisit: "May 8, 2025",
      age: 35,
      conditions: ["Asthma", "Allergies"],
    },
    {
      id: "p3",
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "https://i.pravatar.cc/150?img=13",
      medicalId: "PAT-10067",
      lastVisit: "May 2, 2025",
      age: 65,
      conditions: ["Arthritis", "Coronary Artery Disease"],
    },
    {
      id: "p4",
      name: "Maria Garcia",
      email: "maria@example.com",
      avatar: "https://i.pravatar.cc/150?img=47",
      medicalId: "PAT-10089",
      lastVisit: "Apr 28, 2025",
      age: 29,
      conditions: ["Migraines"],
    },
  ];
  
  const filteredPatients = searchQuery.trim() !== ""
    ? patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.medicalId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : patients;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Search</h1>
        <p className="text-muted-foreground">
          Find and manage your patients' medical records
        </p>
      </div>
      
      <div className="flex max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or patient ID" 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="ml-2">Search</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={patient.avatar} />
                  <AvatarFallback className="bg-health-100 text-health-800 text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {patient.medicalId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last visit:</span> {patient.lastVisit}
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Conditions:</span>{" "}
                      {patient.conditions.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-6">
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Write Rx</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="text-center py-6">
          <User className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No patients found</h3>
          <p className="text-muted-foreground mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
