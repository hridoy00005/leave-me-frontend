import { useMutation } from "@apollo/react-hooks";
import { Button, Input, Modal, Spin } from "antd";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { USER_LOGIN, VERIFFICATION_CODE } from "../graphql/modules";
import { loginUser } from "../store/modules/auth";
import { errorNotify, successNotify, warnNotify } from "../util";

export const SignIn = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [verificaionCode, setVerificationCode] = useState("");
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [LoginMutation, { loading }] = useMutation(USER_LOGIN, {
    variables: {
      email: state.email.toLowerCase(),
      password: state.password,
    },
  });

  // login request

  const onLogin = async (e) => {
    try {
      const {
        data: { Login },
      } = await LoginMutation();

      if (Login.success) {
        successNotify(Login.message);
        dispatch(loginUser(Login));
        // setVisible(true);
        // successNotify(Login.message);
      } else {
        warnNotify(Login.message);
      }
    } catch (error) {
      errorNotify(error.message);
      console.log("M ", error.message);
    }
  };

  // verification
  const [VerifyCode, { loading: verifyLoading }] =
    useMutation(VERIFFICATION_CODE);
  const userVerification = async () => {
    try {
      const {
        data: { Verify2FCode },
      } = await VerifyCode({
        variables: {
          code: verificaionCode,
        },
      });
      if (Verify2FCode.success) {
        successNotify(Verify2FCode.message);
        dispatch(loginUser(Verify2FCode));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const disable = !state.email || !state.password;

  return (
    <div className="col-md-5 m-auto">
      <div className="card" style={{ margin: "auto" }}>
        <Spin spinning={loading}>
          <div className="login-form">
            <h1 className="title m-0">Sign In</h1>
            <div className="text-center mt-2 mb-3">
              <img
                style={{ width: "75px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSSPhmVShMPrH5IM5U3T9NBkXXRAevq3AYUyolgl26gzsw2Z89pyfXxCCPfHBhpEYmmw&usqp=CAU"
                alt=""
              />
              <p className="mt-2">
                Directed by <b>Prof. Dr. AS. Sikder</b>
              </p>
            </div>
            {/* <form onSubmit={onLogin}> */}
            <div className="form-row">
              <div className="form-group col-md-12">
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group col-md-12">
                <Form.Control
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onChange}
                  placeholder="Password"
                />
              </div>
              <Link
                to="forgot-password"
                style={{ textDecoration: "underline", marginLeft: "2%" }}
              >
                Forgot Password?
              </Link>
            </div>

            <div className="form-group">
              <button
                className="btn w-full btn-primary rounded-0 d-flex justify-content-between"
                style={{ marginTop: "2%", fontSize: "18px" }}
                disabled={disable}
                // type="submit"
                onClick={onLogin}
              >
                <span
                  style={{
                    textAlign: "left",
                    display: "block",
                    float: "left",
                  }}
                >
                  Sign In
                </span>{" "}
                <i className="fad fa-arrow-circle-right"></i>
              </button>
            </div>
            <Link
              to="/signup"
              style={{
                color: "#3876e3",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Create account?
            </Link>
            {/* </form> */}
          </div>
        </Spin>
        <Modal
          visible={visible}
          title="Conirmation code"
          onCancel={() => setVisible(false)}
          maskClosable={false}
          okText="Submit"
          onOk={userVerification}
          okButtonProps={{
            loading: verifyLoading,
            disabled: !verificaionCode,
          }}
        >
          <div>
            <label>Verification code</label>
          </div>
          <Input
            size="large"
            onChange={(e) => setVerificationCode(e.target.value)}
            value={verificaionCode}
            placeholder="Verification code"
          />

          <div className="mt-4">
            <Button onClick={onLogin} loading={loading}>
              {" "}
              Resend code
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
