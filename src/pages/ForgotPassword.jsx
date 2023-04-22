import { useMutation } from "@apollo/react-hooks";
import { Spin } from "antd";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ADMIN_FORGOT_PASSWORD } from "../graphql/modules";
import { errorNotify, successNotify, warnNotify } from "../util";

export const ForgotPassword = () => {
  //initial state
  const [email, setEmail] = useState("");

  // login api
  const [ForgotEmailMutation, { loading }] = useMutation(ADMIN_FORGOT_PASSWORD);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { ForgetPassword },
      } = await ForgotEmailMutation({
        variables: {
          email,
        },
      });
      if (ForgetPassword.success) {
        successNotify(ForgetPassword.message);
      } else {
        warnNotify(ForgetPassword.message);
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };

  const disable = !email;

  return (
    <div className="col-md-5 m-auto">
      <div className="card">
        <Spin spinning={loading}>
          <div className="login-form">
            <h1 className="title">Forgot Password</h1>
            <Form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <Button
                onClick={onSubmit}
                disabled={disable}
                className="w-full btn-signin mt-2"
                type="submit"
              >
                Forgot password
              </Button>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};
