import React from "react";

export const UserDetails = ({ userData }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex justify-content-between">
            <label>First Name</label>
            <h6>{userData?.firstname}</h6>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-between">
            <label>Last Name</label>
            <h6>{userData?.lastname}</h6>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-between">
            <label>Email</label>
            <h6>{userData?.email}</h6>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-between">
            <label>Phone</label>
            <h6>{userData?.phone}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
