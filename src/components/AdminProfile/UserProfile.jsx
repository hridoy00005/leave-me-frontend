import React from "react";
import { Spin } from "antd";
import { getFile } from "../../util/helper";
import { faculties, UserRole } from "../../config";

export const UserProfile = ({ loading = false, user, actions = "" }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="row">
              <div className="col-md-4">
                <div className="account-details-colum pt-0">
                  <img
                    src={
                      user.avater
                        ? getFile(user.avater)
                        : "/assets/img/avatar.jpg"
                    }
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <div className="account-details">
                      <div className="account-details-colum">
                        <h6>Full name</h6>
                        <p>
                          {user?.firstname} {user?.lastname}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account-details">
                      <div className="account-details-colum">
                        <h6>Email</h6>
                        <p>{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account-details">
                      <div className="account-details-colum">
                        <h6>Phone</h6>
                        <p>{user?.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="account-details text-capitalize">
                      <div className="account-details-colum">
                        <h6>Designation</h6>
                        <p>{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="account-details text-capitalize">
                      <div className="account-details-colum">
                        <h6>Faculty</h6>
                        <p>
                          {
                            faculties.find(
                              (item) => item.value === user?.faculty
                            )?.text
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  {user.role !== UserRole.Dean &&
                    user.role !== UserRole.Register && (
                      <div className="col-md-6">
                        <div className="account-details">
                          <div className="account-details-colum">
                            <h6>Department</h6>
                            <p>{user?.dept}</p>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
};
