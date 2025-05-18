
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthcare } from "@/contexts/HealthcareContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const { 
    getAppointmentsByDoctor, 
    getAppointmentsByPatient,
    scheduleAppointment
  } = useHealthcare();
  
  const isDoctor = user?.role === "doctor";
  
  const appointments = isDoctor 
    ? getAppointmentsByDoctor(user?.id || "")
    : getAppointmentsByPatient(user?.id || "");
    
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  
  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    doctorName: isDoctor ? user?.name || "" : "",
    doctorId: isDoctor ? user?.id || "" : "",
    time: "",
    notes: "",
  });
  
  const handleScheduleAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !date) return;
    
    const appointment = {
      doctorId: isDoctor ? user.id : newAppointment.doctorId,
      doctorName: isDoctor ? user.name : newAppointment.doctorName,
      patientId: isDoctor ? newAppointment.patientId : user.id,
      patientName: isDoctor ? newAppointment.patientName : user.name,
      date: format(date, "yyyy-MM-dd"),
      time: newAppointment.time,
      status: "scheduled" as const,
      notes: newAppointment.notes,
    };
    
    await scheduleAppointment(appointment);
    setDialogOpen(false);
    // Reset form
    setNewAppointment({
      patientName: "",
      patientId: "",
      doctorName: isDoctor ? user?.name || "" : "",
      doctorId: isDoctor ? user?.id || "" : "",
      time: "",
      notes: "",
    });
    setDate(undefined);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            {isDoctor 
              ? "View and manage your patient appointments"
              : "Schedule and track your medical appointments"
            }
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <CalendarIcon className="h-4 w-4 mr-2" /> Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <form onSubmit={handleScheduleAppointment}>
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Enter appointment details and select a date and time.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {isDoctor ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input 
                        id="patientName" 
                        name="patientName"
                        value={newAppointment.patientName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientId">Patient ID</Label>
                      <Input 
                        id="patientId" 
                        name="patientId"
                        value={newAppointment.patientId}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">Doctor Name</Label>
                      <Input 
                        id="doctorName" 
                        name="doctorName"
                        value={newAppointment.doctorName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorId">Doctor ID</Label>
                      <Input 
                        id="doctorId" 
                        name="doctorId"
                        value={newAppointment.doctorId}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    name="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleChange}
                    placeholder="Any specific details or reason for the appointment"
                    rows={3} 
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={!date}>Schedule Appointment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {appointments.length === 0 ? (
        <Card className="border-dashed border-2">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <CalendarIcon className="h-10 w-10 text-muted-foreground opacity-50" />
              <h3 className="font-medium text-lg">No Appointments</h3>
              <p className="text-sm text-muted-foreground">
                You don't have any scheduled appointments.
              </p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => setDialogOpen(true)}
              >
                Schedule Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="bg-health-50 pb-3">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-health-600" />
                        <CardTitle className="text-lg font-medium">
                          {appointment.date}
                        </CardTitle>
                      </div>
                      <div className="px-2.5 py-0.5 rounded-full bg-health-100 text-health-800 text-xs font-medium">
                        {appointment.status}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-health-100 p-2 rounded-full">
                        <Clock className="h-4 w-4 text-health-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-health-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-health-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isDoctor ? "Patient" : "Doctor"}
                        </p>
                        <p className="font-medium">
                          {isDoctor ? appointment.patientName : appointment.doctorName}
                        </p>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{appointment.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="default" className="flex-1">
                        {appointment.status === "scheduled" ? "Cancel" : "Details"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
