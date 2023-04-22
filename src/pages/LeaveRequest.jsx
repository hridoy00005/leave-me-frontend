import { useMutation } from "@apollo/react-hooks";
import { Button, Radio, Modal, Input, DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LeaveType } from "../config";
import { SEND_LEAVE_REQUEST } from "../graphql/modules";
import { successNotify, warnNotify } from "../util";

export const LeaveRequest = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const [leaveData, setLeaveData] = useState({
    dept: user.dept,
    faculty: user.faculty,
  });

  const onSelectCategory = (e) => {
    setLeaveData({ ...leaveData, leaveType: e.target.value });
  };

  const onChangeDate = (date) => {
    if (date?.length === 0 || !date) {
      setLeaveData({
        ...leaveData,
        startDate: "",
        endDate: "",
      });
      return;
    }
    const start = date[0];
    const end = date[1];
    setLeaveData({
      ...leaveData,
      startDate: moment(start).format("x"),
      endDate: moment(end).format("x"),
    });
  };

  const [SendRequestMutation, { loading }] = useMutation(SEND_LEAVE_REQUEST);
  const handleSubmit = async () => {
    try {
      const {
        data: { SendLeaveRequest },
      } = await SendRequestMutation({
        variables: leaveData,
      });
      if (SendLeaveRequest.success) {
        successNotify(SendLeaveRequest.message);
        setVisible(false);
        props.history.push("/dashboard");
      } else {
        warnNotify(SendLeaveRequest.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const disabledDate = (current) =>
    current && moment().add(-1, "days") >= current;
  return (
    <div className="container-fluid" id="request-leave">
      <div className="card">
        <div className="title">
          <h4>Select Category</h4>
        </div>
        <Radio.Group
          onChange={onSelectCategory}
          value={leaveData.leaveType}
          optionType="button"
          buttonStyle="solid"
        >
          <div className="row">
            {leaveCategory?.map((item) => (
              <div
                className="col-md-3 col-sm-6 col-lg-3 col-xl-3"
                key={item.value}
              >
                <Radio
                  value={item.value}
                  className={item.value === leaveData?.leaveType && "selected"}
                >
                  <img src={item.imgSrc} alt={item.label} /> <p>{item.label}</p>
                </Radio>
              </div>
            ))}
          </div>
        </Radio.Group>
        <div className="row">
          <div className="col-md-12">
            <div className="text-right">
              <Button
                type="primary"
                disabled={!leaveData?.leaveType}
                onClick={() => setVisible(true)}
              >
                <i className="fas fa-arrow-alt-right mr-2"></i> Go Next
              </Button>
            </div>
            <Modal
              visible={visible}
              title="Send leaving request"
              okText="Send Request"
              okButtonProps={{
                disabled: !leaveData?.startDate || !leaveData?.endDate,
                loading: loading,
              }}
              onCancel={() => setVisible(false)}
              onOk={handleSubmit}
            >
              <div className="">
                <label>Duration</label>
                <DatePicker.RangePicker
                  format="DD/MM/YYYY"
                  size="large"
                  style={{ width: "100%" }}
                  onChange={onChangeDate}
                  disabledDate={disabledDate}
                  className="price-control w-100 mb-2"
                />
                <label>Description</label>
                <Input.TextArea
                  size="large"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setLeaveData({
                      ...leaveData,
                      description: e.target.value,
                    })
                  }
                  className="price-control w-100"
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export const leaveCategory = [
  {
    label: "Casual leave",
    value: LeaveType.Casual,
    imgSrc: "/assets/img/vacation.jpg",
  },
  {
    label: "Medical leave",
    value: LeaveType.Medical,
    imgSrc: "/assets/img/medical.jpg",
  },
  {
    label: "Privileged leave",
    value: LeaveType.Previlged,
    imgSrc: "/assets/img/privileged.jpg",
  },
  {
    label: "Maternity leave",
    value: LeaveType.Maternity,
    imgSrc: "/assets/img/maternity.jpg",
  },
  {
    label: "Paternity leave",
    value: LeaveType.Paternity,
    imgSrc: "/assets/img/per.cms",
  },
  {
    label: "Study leave",
    value: LeaveType.Study,
    imgSrc: "/assets/img/study.jpg",
  },
];
