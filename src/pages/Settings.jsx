import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_LEAVE_DAYS, UPDATE_LEAVE_REQUEST } from "../graphql/modules";
import { successNotify, warnNotify } from "../util";
import { Spin } from "antd";
import { CustomButton } from "../components/Shared";

export const Settings = () => {
  const [state, setState] = useState({});

  const { data, loading: fetchLoading, refetch } = useQuery(FETCH_LEAVE_DAYS);
  useEffect(() => {
    if (data?.FetchLeavesDays?.result) {
      setState(data.FetchLeavesDays.result);
    }
  }, [data]);
  // update profile api
  const [UpdateLeaveDaysMutation, { loading }] =
    useMutation(UPDATE_LEAVE_REQUEST);

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { UpdateLeavesDays },
      } = await UpdateLeaveDaysMutation({
        variables: { inputData: state },
      });
      if (UpdateLeavesDays.success) {
        successNotify(UpdateLeavesDays.message);
        refetch();
      } else {
        warnNotify(UpdateLeavesDays.message);
      }
    } catch (error) {
      warnNotify(error.message);
    }
  };

  // handle basic info input
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: Number(e.target.value) });

  const inputs = [
    { name: "casualLeave", text: "Casual leave" },
    { name: "privilegedLeave", text: "Privileged leave" },
    { name: "medicalLeave", text: "Medical leave" },
    { name: "maternityLeave", text: "Maternity leave" },
    { name: "paternityLeave", text: "Paternity leave" },
    { name: "studyLeave", text: "Study leave" },
  ];

  return (
    <Spin spinning={fetchLoading || loading}>
      <div>
        <div className="heading"></div>
        <h1 className="title">App Settings</h1>
        <form onSubmit={onUpdate}>
          <div className="card">
            <div className="create-permit-details">
              <h3>Leave specifications</h3>
              <div className="form-row">
                {inputs.map(({ name, text }) => (
                  <div className="form-group col-md-4">
                    <label htmlFor={name}>{text}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={text}
                      name={name}
                      value={state[name] || ""}
                      onChange={onChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="account-details-btn">
            <CustomButton
              type="submit"
              loading={loading}
              disabled={loading}
              className="btn btn-primary"
            >
              Update
            </CustomButton>
          </div>
        </form>
      </div>
    </Spin>
  );
};
