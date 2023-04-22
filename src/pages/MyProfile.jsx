import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserProfile } from "../components/AdminProfile";

export const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <UserProfile
        user={user}
        actions={
          <div className="account-details-btn">
            <Link
              to="/update-profile"
              className="btn btn-primary mr-3 rounded-0"
            >
              Edit Profile
            </Link>
            <Link
              to="/change-password"
              className="btn btn-outline-primary rounded-0"
            >
              Change Password
            </Link>
          </div>
        }
      />
    </div>
  );
};
