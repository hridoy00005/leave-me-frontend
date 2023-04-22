import { UserRole } from "../config";

export const sidebar = [
  {
    path: "/dashboard",
    label: "Dashbaord",
    icon: "fas fa-columns",
    role: [UserRole.Lecturar, UserRole.Register, UserRole.Head, UserRole.Dean],
  },
  {
    path: "/request",
    label: "Request Leave",
    icon: "fas fa-share",
    role: [UserRole.Lecturar, UserRole.Head, UserRole.Dean],
  },
  {
    path: "/dept-request",
    label: "Teachers Request",
    icon: "fas fa-share",
    role: [UserRole.Head, UserRole.Dean],
  },
  {
    path: "/leave-setting",
    label: "Settings",
    icon: "fas fa-wrench",
    role: [UserRole.Register],
  },
  {
    path: "/my-profile",
    label: "Account",
    icon: "far fa-user",
    role: [UserRole.Head, UserRole.Lecturar, UserRole.Register, UserRole.Dean],
  },
];
