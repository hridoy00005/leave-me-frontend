import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_EMAIL, FILE_UPLOAD, UPDATE_PROFILE } from "../graphql/modules";
import { getFile, successNotify, warnNotify } from "../util";
import { Input, Spin, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateProfileAction } from "../store/modules";
import { CustomButton } from "../components/Shared";
import { Link, useHistory } from "react-router-dom";
import { faculties, UserRole } from "../config";
import { useEffect } from "react";
// import { dept } from "../config";

export const UpdateProfile = () => {
  const [dept, setDept] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user)
  const [state, setState] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    phone: user?.phone,
    avater: user?.avater,
    dept: user?.dept,
    role: user?.role,
    faculty: user?.faculty,
  });

  useEffect(() => {
    setDept(faculties.find((item) => item.value === user?.faculty)?.dept || []);
  }, []);

  const [visible, setVisible] = useState(false);
  const [emailChange, setEmailChange] = useState({
    newEmail: "",
    password: "",
  });
  console.log(state);
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
  // update profile api
  const [updateProfileMutation, { loading }] = useMutation(UPDATE_PROFILE);

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { ProfileUpdate },
      } = await updateProfileMutation({
        variables: {
          userInput: {
            ...state,
          },
        },
      });
      if (ProfileUpdate.success) {
        successNotify(ProfileUpdate.message);
        dispatch(updateProfileAction(state));
      } else {
        warnNotify(ProfileUpdate.message);
      }
    } catch (error) {
      console.log(error.message);
      warnNotify(error.message);
    }
  };

  // handle basic info input
  const onChange = (e) => {
    console.log(e.target);
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onChangeFaculty = (e) => {
    const { value } = e.target;
    setState({ ...state, faculty: value, dept: "" });
    const faculty = faculties.find((item) => item.value === value);
    setDept(faculty.dept);
  };
  console.log(state);
  // handle email change
  const handleEmailChange = (e) =>
    setEmailChange({ ...emailChange, [e.target.name]: e.target.value });

  // control modal
  const closeModal = () => {
    setEmailChange({ newEmail: "", password: "" });
    setVisible(false);
  };

  // logout
  const onLogout = () => {
    dispatch(logoutUser());
  };

  // email change api
  const [ChangeEmailMutation, { loading: emailLoading }] = useMutation(
    CHANGE_EMAIL,
    {
      variables: {
        password: emailChange.password,
        newEmail: emailChange.newEmail,
      },
    }
  );
  const onChangeEmail = async () => {
    // e.preventDefault();
    const {
      data: { ChangeEmail },
    } = await ChangeEmailMutation();
    if (ChangeEmail.success) {
      onLogout();
      closeModal();
      successNotify(ChangeEmail.message);
    } else {
      warnNotify(ChangeEmail.message);
    }
  };

  const disable =
    !state.firstname ||
    !state.lastname ||
    !state.faculty ||
    (state.role !== UserRole.Dean && !state.dept) ||
    !state.role ||
    !state.phone;

  return (
    <Spin spinning={false}>
      <div>
        <div className="heading"></div>
        <h1 className="title">Update Profile</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="card">
            <div className="row">
              <div className="col-md-8">
                <div className="create-permit-details">
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>First name</label>
                      <input
                        type="name"
                        className="form-control"
                        placeholder="First name"
                        name="firstname"
                        value={state.firstname || ""}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Last name</label>
                      <input
                        type="name"
                        className="form-control"
                        placeholder="Last name"
                        name="lastname"
                        value={state.lastname || ""}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Phone</label>
                      <input
                        type="name"
                        className="form-control"
                        placeholder="Phone"
                        name="phone"
                        value={state.phone || ""}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={user?.email || ""}
                        onChange={onChange}
                        onClick={() => setVisible(true)}
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Designation</label>
                      <select
                        name="role"
                        onChange={onChange}
                        value={state.role}
                        className="form-control"
                      >
                        <option value="dean">Dean</option>
                        <option value="head">Head of Dept.</option>
                        <option value="lecturer">Professor/Lecturer</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Faculty</label>
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
                    {state?.role !== UserRole.Dean &&
                      state?.role !== UserRole.Register && (
                        <div className="form-group col-md-4">
                          <label>Department</label>
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
                </div>
              </div>
              <div className="col-md-4">
                <div className="avater_img_outer">
                  <Spin spinning={fileLoading}>
                    <img
                      alt=""
                      className="avater_img"
                      src={
                        state.avater
                          ? getFile(state.avater)
                          : "/assets/img/avatar.jpg"
                      }
                    />
                  </Spin>
                  <input type="file" onChange={handleAvatar} />
                </div>
              </div>
            </div>
          </div>
          <div className="account-details-btn">
            <Link to="/my-profile" className="btn btn-outline-primary mr-3">
              Back
            </Link>
            <CustomButton
              loading={loading}
              disabled={disable || loading}
              className="btn btn-primary"
              onClick={onUpdate}
            >
              Update
            </CustomButton>
          </div>
        </form>
      </div>
      <Modal
        visible={visible}
        title="Change Email"
        onOk={onChangeEmail}
        onCancel={closeModal}
        okButtonProps={{
          disabled: emailLoading,
          loading: emailLoading,
        }}
      >
        <div>
          <label>Password</label>
        </div>
        <Input
          size="large"
          placeholder="Password"
          name="password"
          value={emailChange.password || ""}
          onChange={handleEmailChange}
          className="mb-3"
        />
        <div>
          <label>New Email</label>
        </div>
        <Input
          size="large"
          value={emailChange.newEmail || ""}
          placeholder="New Email"
          name="newEmail"
          onChange={handleEmailChange}
        />
      </Modal>
    </Spin>
  );
};
