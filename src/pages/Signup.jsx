import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Spin } from "antd";
import { FILE_UPLOAD, USER_SIGNUP } from "../graphql/modules";
import { CustomButton } from "../components/Shared";
import { Link } from "react-router-dom";
import { successNotify, warnNotify } from "../util/notification";
import { UploadOutlined } from "@ant-design/icons";
import { getFile } from "../util/helper";
import { faculties, UserRole } from "../config";

export const SignUp = ({ history, ...props }) => {
  //initial state
  const [state, setState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    cpassword: "",
    phone: "",
    faculty: "",
    role: "", //lecturer
    avater: "",
  });
  const [dept, setDept] = useState([]);
  const [error, setError] = useState(null);
  console.log(state);
  const onChangeFaculty = (e) => {
    const { value } = e.target;
    setState({ ...state, faculty: value, dept: "" });
    const faculty = faculties.find((item) => item.value === value);
    setDept(faculty.dept);
  };

  const onBlurPassword = () => {
    if (state.password.length < 6) {
      setError({
        ...error,
        password: "Password must be more than 6 character",
      });
    } else {
      setError({ ...error, password: "" });
    }
  };

  const onBlurCPassword = () => {
    if (state.password !== state.cpassword) {
      setError({
        ...error,
        cpassword: "Password and confirm password mismatch",
      });
    } else {
      setError({ ...error, cpassword: "" });
    }
  };

  // const { cpassword, ...regData } = state;
  //register api
  const [RegisterMutation, { loading }] = useMutation(USER_SIGNUP);

  const onRegister = async (e) => {
    e.preventDefault();

    const data = { ...state };
    delete data.cpassword;
    try {
      const {
        data: { Register },
      } = await RegisterMutation({
        variables: {
          userInput: {
            ...data,
          },
        },
      });
      if (Register.success) {
        successNotify(Register.message);
        history.push("/signin");
      } else {
        warnNotify(Register.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  // file upload
  const [FileUpload, { loading: fileLoading }] = useMutation(FILE_UPLOAD);
  const handleAvatar = async (e) => {
    try {
      const {
        data: { SingleUpload },
      } = await FileUpload({
        variables: {
          file: e.target.files[0],
        },
      });

      if (SingleUpload.success) {
        setState({ ...state, avater: SingleUpload.filename });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const disable =
    !state.email ||
    !state.password ||
    !state.firstname ||
    !state.lastname ||
    !state.faculty ||
    (state.role !== UserRole.Dean && !state.dept) ||
    !state.role ||
    !state.phone ||
    state.password.length < 6 ||
    state.password !== state.cpassword;

  return (
    <div className="col-md-6 m-auto">
      <div className="card" style={{ width: "100%", margin: "auto" }}>
        <Spin spinning={false}>
          <div className="login-form">
            <h1 className="title">Sing Up</h1>
            <form onSubmit={onRegister}>
              <div className="form-row justify-content-around">
                <div className="form-group col-md-6 text-center">
                  <div className="img-wrapper">
                    <Spin spinning={fileLoading}>
                      <img
                        className="user-avatar"
                        src={
                          state.avater
                            ? getFile(state.avater)
                            : "/assets/img/avatar.jpg"
                        }
                        alt="avatar"
                      />
                    </Spin>
                    <div className="middle">
                      <label
                        htmlFor="img-input"
                        style={{
                          padding: "5px 10px",
                          background: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        <UploadOutlined style={{ fontSize: "20px" }} />
                      </label>
                      <input
                        type="file"
                        id="img-input"
                        className="d-none"
                        accept="image/*"
                        onChange={handleAvatar}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstname"
                    value={state.firstname}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastname"
                    value={state.lastname}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    name="phone"
                    value={state.phone}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group col-md-12">
                  <select
                    name="role"
                    onChange={onChange}
                    value={state.role || ""}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    <option value="dean">Dean</option>
                    <option value="head">Head of Dept.</option>
                    <option value="lecturer">Professor/Lecturer</option>
                  </select>
                </div>
                <div className="form-group col-md-12">
                  <select
                    name="faculty"
                    onChange={onChangeFaculty}
                    value={state.faculty || ""}
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select faculty
                    </option>
                    {faculties.map(({ value, text }) => (
                      <option value={value}>{text}</option>
                    ))}
                  </select>
                </div>
                {state.role !== UserRole.Dean && (
                  <div className="form-group col-md-12">
                    <select
                      name="dept"
                      onChange={onChange}
                      value={state.dept || ""}
                      className="form-control"
                    >
                      <option value="" disabled>
                        Select dept.
                      </option>
                      {dept.map(({ value, text }) => (
                        <option value={value}>{text}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={onChange}
                    onBlur={onBlurPassword}
                  />
                  {error?.password && (
                    <small className="text-danger">{error?.password}</small>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={state.cpassword}
                    onChange={onChange}
                    onBlur={onBlurCPassword}
                  />
                  {error?.cpassword && (
                    <small className="text-danger">{error?.cpassword}</small>
                  )}
                </div>
              </div>
              <div className="form-group">
                <CustomButton
                  type="submit"
                  disabled={disable}
                  // loading={loading}
                  className="btn w-full btn-primary rounded-0"
                >
                  Sign Up
                </CustomButton>
              </div>
            </form>
            <Link
              to="/signin"
              style={{
                color: "#3876e3",
                textDecoration: "underline",
                fontWeight: "bold",
              }}
            >
              Already have account. Signin
            </Link>
          </div>
        </Spin>
      </div>
    </div>
  );
};
