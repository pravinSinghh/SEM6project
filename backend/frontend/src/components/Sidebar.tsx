
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  FileText, 
  User, 
  MessageCircle, 
  FileCheck,
  Image,
  Search
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();

  const PatientLinks = () => (
    <ul className="space-y-1">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
          end
        >
          <User size={16} /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/prescriptions"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <FileCheck size={16} /> Prescriptions
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <Calendar size={16} /> Appointments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <Image size={16} /> Documents
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <MessageCircle size={16} /> Health Assistant
        </NavLink>
      </li>
    </ul>
  );

  const DoctorLinks = () => (
    <ul className="space-y-1">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
          end
        >
          <User size={16} /> My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appointments"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <Calendar size={16} /> Appointments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/patients"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <Search size={16} /> Patient Search
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/prescriptions"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <FileText size={16} /> Prescriptions
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent"
            )
          }
        >
          <MessageCircle size={16} /> AI Assistant
        </NavLink>
      </li>
    </ul>
  );

  if (!user) return null;

  return (
    <div className={cn("pb-12 bg-sidebar", className)}>
      <div className="py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {user.role === "doctor" ? "Doctor Portal" : "Patient Portal"}
          </h2>
          <div className="space-y-1">
            {user.role === "doctor" ? <DoctorLinks /> : <PatientLinks />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
