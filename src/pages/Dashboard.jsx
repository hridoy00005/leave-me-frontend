import React from "react";
import { useSelector } from "react-redux";
import { RegisterDashboard } from "../components";
import { TeachersDashboard } from "../components";

export const Dashboard = () => {

  const {user } = useSelector(state=>state.auth)

  return (
    user?.role==='register' ? <RegisterDashboard/>: <TeachersDashboard/>
  );
};
