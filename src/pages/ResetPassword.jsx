import { useMutation } from "@apollo/react-hooks";
import { Spin } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ADMIN_RESET_PASSWORD } from "../graphql/modules";
import { errorNotify, successNotify, warnNotify } from "../util";

export const ResetPassword = ({ history, match }) => {
  //initial state
  const [newPassword, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  // const [securityCode, setSecurityCode] = useState("");

  // get security code form
  // useEffect(() => {
  //   const query = new URLSearchParams(location.search);
  //   const token = query.get("security_code");
  //   setSecurityCode(token);
  // }, [location]);

  // reset password api
  const [resetPassword, { loading }] = useMutation(ADMIN_RESET_PASSWORD);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { ResetPassowrd },
      } = await resetPassword({
        variables: {
          securityCode: match.params.id,
          newPassword,
        },
      });
      if (ResetPassowrd.success) {
        successNotify(ResetPassowrd.message);
        history.push("/");
      } else {
        warnNotify(ResetPassowrd.message);
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };

  const disable = !newPassword || newPassword !== cpassword;

  return (
    <div className="col-md-5 m-auto">
      <div className="card">
        <Spin spinning={loading}>
          <div className="login-form">
            <h1 className="title">Reset Password</h1>
            <Form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <Form.Control
                    type="password"
                    name="password"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                  />
                </div>
                <div className="form-group col-md-12">
                  <Form.Control
                    type="password"
                    name="cpassword"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="form-group">
                <button
                  className="btn w-full btn-primary rounded-0"
                  style={{ marginTop: "2%", fontSize: "18px" }}
                  onClick={onSubmit}
                  disabled={disable}
                  type="submit"
                >
                  <span
                    style={{
                      textAlign: "left",
                      display: "block",
                      width: "93%",
                      float: "left",
                    }}
                  >
                    Reset Password
                  </span>{" "}
                  <i className="fad fa-arrow-circle-right"></i>
                </button>
              </div>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};
