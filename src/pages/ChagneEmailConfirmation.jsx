import { useMutation } from "@apollo/react-hooks";
import { Result, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthLayout } from "../containers";
import { logoutUser } from "../store/modules";
import { CONFIRM_EMAIL_CHANGE, USER_VERIFY_EMAIL } from "../graphql/modules";
import { Link, Redirect } from "react-router-dom";

export const ChagneEmailConfirmation = ({ location, history }) => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const params = Object.fromEntries(query);

  const [VerifyEmailChnageCodeMutation, { loading, data }] =
    useMutation(CONFIRM_EMAIL_CHANGE);
  useEffect(() => {
    dispatch(logoutUser());
    VerifyEmailChnageCodeMutation({
      variables: {
        securityCode: params.security_code || "",
      },
    });
  }, []);

  // const [VerifyEmailChnageCodeMutation, { loading, data }] =
  //   useMutation(CONFIRM_EMAIL_CHANGE);
  // const deleteFaq = async () => {
  //   try {
  //     const {
  //       data: { ConfirmChangeEmailAdmin },
  //     } = await VerifyEmailChnageCodeMutation({
  //       variables: {
  //         securityCode: params.security_code || "",
  //       },
  //     });
  //     if (ConfirmChangeEmailAdmin.success) {
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  let status = "403";
  let msg = "Security code verifing...";
  
  if (data?.ConfirmChangeEmail?.success) {
    status = "success";
    msg = data?.ConfirmChangeEmail?.message;
  } else if (data?.ConfirmChangeEmail?.success === false) {
    status = "error";
    msg = data?.ConfirmChangeEmail?.message;
  }

  return (
    <AuthLayout>
      <div
        className="card d-block text-center"
        style={{ width: "50%", margin: "auto" }}
      >
        <Spin spinning={loading}>
          <Result
            className="d-flock"
            status={status}
            title={msg}
            // subTitle={
            //   status === "success"
            //     ? "Now you can login using your credentials"
            //     : "Something went wrong"
            // }
          />
          <Link to="/signin" className="d-block">
            Signin
          </Link>
        </Spin>
      </div>
    </AuthLayout>
  );
};
