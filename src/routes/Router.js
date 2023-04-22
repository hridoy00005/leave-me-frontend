import { UserRole } from "../config";
import {
  ForgotPassword,
  ResetPassword,
  ChagneEmailConfirmation,
  SignIn,
  SignUp,
  // EmailVerification,
  MyProfile,
  UpdateProfile,
  Dashboard,
  ChangePassword,
  LeaveRequest,
  Settings,
  Department,
  DeptHeadRequest,
} from "../pages";

// Login or Sign in Routes
export const Auth = [
  { path: "/", exact: true, component: SignIn },
  { path: "/signup", exact: true, component: SignUp },
  { path: "/forgot-password", exact: true, component: ForgotPassword },
  { path: "/reset-password/:id", component: ResetPassword },
  { path: "/change-email", exact: true, component: ChagneEmailConfirmation },
];

// Public Routes
export const Public = [
  // { path: "/email-verification", exact: true, component: EmailVerification }
  // { path: "/test", exact: true, component: Test },
  // { path: "/all-test", exact: true, component: AllTestUser }
];

// Private Routes
export const Private = [
  {
    path: "/dashboard",
    component: Dashboard,
    role: [UserRole.Register, UserRole.Lecturar, UserRole.Head, UserRole.Dean],
    exact: true,
  },
  // {
  //   path: "/departments",
  //   component: Department,
  //   role: [UserRole.Register, UserRole.Dean],
  //   exact: true,
  // },
  {
    path: "/request",
    component: LeaveRequest,
    role: [UserRole.Lecturar, UserRole.Head, UserRole.Dean],
    exact: true,
  },
  {
    path: "/my-profile",
    role: [UserRole.Register, UserRole.Lecturar, UserRole.Head, UserRole.Dean],
    component: MyProfile,
    exact: true,
  },
  {
    path: "/change-password",
    component: ChangePassword,
    role: [UserRole.Register, UserRole.Lecturar, UserRole.Head, UserRole.Dean],
    exact: true,
  },
  {
    path: "/update-profile",
    component: UpdateProfile,
    role: [UserRole.Register, UserRole.Lecturar, UserRole.Head, UserRole.Dean],
    exact: true,
  },
  {
    path: "/leave-setting",
    component: Settings,
    role: [UserRole.Register],
    exact: true,
  },
  {
    path: "/dept-request",
    component: DeptHeadRequest,
    role: [UserRole.Head, UserRole.Dean],
    exact: true,
  },
];
