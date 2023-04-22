import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Spin } from "antd";
import { Form } from "react-bootstrap";
import { LoadingButton } from "../components/Shared";
import { CHANGE_PASSWORD } from "../graphql/modules";
import { errorNotify, successNotify, warnNotify } from "../util";
import { logoutUser } from "../store/modules";
import { useDispatch } from "react-redux";

export const ChangePassword = ({ location, history, ...props }) => {
  //declare dispatch
  const dispatch = useDispatch();

  //initial state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  // reset password api
  const [ChangePasswordMutation, { loading }] = useMutation(CHANGE_PASSWORD, {
    variables: {
      oldPassword,
      newPassword,
    },
  });

  // logout
  const onLogout = () => {
    dispatch(logoutUser());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { PassowrdUpdate },
      } = await ChangePasswordMutation();
      if (PassowrdUpdate.success) {
        successNotify(PassowrdUpdate.message);
        onLogout();
      } else {
        warnNotify(PassowrdUpdate.message);
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };

  const disable =
    !oldPassword ||
    !newPassword ||
    newPassword !== cpassword ||
    (oldPassword && newPassword).length < 6;

  return (
    <Spin spinning={loading}>
      <div className="card" style={{ width: "50%", margin: "auto" }}>
        <div className="login-form">
          <h1 className="title">Change Password</h1>
          <Form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <Form.Control
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old password"
                />
              </div>
              <div className="form-group col-md-12">
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                />
                {newPassword.length > 0 && newPassword.length < 6 && (
                  <small className="text-danger">
                    Password must be more than 6 characters
                  </small>
                )}
              </div>
              <div className="form-group col-md-12">
                <Form.Control
                  type="password"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  placeholder="Confirm password"
                />
                {cpassword.length > 0 && cpassword !== newPassword && (
                  <small className="text-danger">
                    New password and confirm password mismatch
                  </small>
                )}
              </div>
            </div>

            <div className="form-group">
              <LoadingButton
                className="btn w-full btn-primary rounded-0"
                style={{ marginTop: "2%", fontSize: "18px" }}
                onClick={onSubmit}
                disabled={disable}
                type="submit"
                // loading={loading}
              >
                Change Password
              </LoadingButton>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};
