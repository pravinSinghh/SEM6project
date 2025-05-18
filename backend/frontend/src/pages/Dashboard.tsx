
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthcare } from "@/contexts/HealthcareContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, MessageCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    getAppointmentsByDoctor, 
    getPrescriptionsByDoctor,
    getAppointmentsByPatient,
    getPrescriptionsByPatient
  } = useHealthcare();

  const isDoctor = user?.role === "doctor";
  
  const appointments = isDoctor 
    ? getAppointmentsByDoctor(user?.id || "")
    : getAppointmentsByPatient(user?.id || "");
  
  const prescriptions = isDoctor
    ? getPrescriptionsByDoctor(user?.id || "")
    : getPrescriptionsByPatient(user?.id || "");
  
  const upcomingAppointments = appointments.filter(a => a.status === "scheduled");
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          {isDoctor 
            ? `${user?.specialization} | Dashboard Overview`
            : `Patient ID: ${user?.medicalId} | Dashboard Overview`
          }
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              Your next appointment is on {upcomingAppointments[0]?.date || "N/A"}
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/appointments">
              <Button variant="ghost" size="sm" className="text-health-600">View all appointments</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isDoctor ? "Written Prescriptions" : "Active Prescriptions"}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              {isDoctor 
                ? `Total prescriptions written for patients`
                : `Medications currently active`
              }
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/prescriptions">
              <Button variant="ghost" size="sm" className="text-health-600">View all prescriptions</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Assistant</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AI Support</div>
            <p className="text-xs text-muted-foreground">
              Ask questions about your health or get assistance
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/chat">
              <Button variant="ghost" size="sm" className="text-health-600">Chat with assistant</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {upcomingAppointments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Next Appointment</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-health-50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-health-500" />
                </div>
                <div className="flex-1">
                  <div className="grid gap-1">
                    <h3 className="font-medium">
                      {isDoctor 
                        ? `Appointment with ${upcomingAppointments[0].patientName}`
                        : `Appointment with ${upcomingAppointments[0].doctorName}`
                      }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {upcomingAppointments[0].date} at {upcomingAppointments[0].time}
                    </p>
                    {upcomingAppointments[0].notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Notes: {upcomingAppointments[0].notes}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">Reschedule</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isDoctor && (
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Patients</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-health-100 flex items-center justify-center">
                    <span className="font-medium">JW</span>
                  </div>
                  <div>
                    <h3 className="font-medium">James Wilson</h3>
                    <p className="text-sm text-muted-foreground">Last visit: May 10, 2025</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="mr-2">View Records</Button>
                  <Button size="sm">Schedule</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-health-100 flex items-center justify-center">
                    <span className="font-medium">ED</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Emily Davis</h3>
                    <p className="text-sm text-muted-foreground">Last visit: May 8, 2025</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="mr-2">View Records</Button>
                  <Button size="sm">Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!isDoctor && (
        <div>
          <h2 className="text-xl font-bold mb-4">Active Medications</h2>
          {prescriptions.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {prescriptions[0].medications.map((med, i) => (
                    <li key={i} className="pb-4 border-b last:border-none">
                      <div className="font-medium">{med.name} {med.dosage}</div>
                      <p className="text-sm text-muted-foreground">
                        {med.frequency} for {med.duration}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Prescription by {prescriptions[0].doctorName} • {new Date(prescriptions[0].createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No active prescriptions</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
