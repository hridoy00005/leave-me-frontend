import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Card,
  DatePicker,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Spin,
  Tag,
} from "antd";
import { LeaveType, UserRole } from "../../config";
import {
  DELETE_REQUEST,
  FETCH_ALL_REQUEST,
  FETCH_LEAVE_DAYS,
  FETCH_USER_BY_ID,
  UPDATE_REQUEST,
} from "../../graphql/modules";
import { useSelector } from "react-redux";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { successNotify, warnNotify } from "../../util";
import { leaveCategory } from "../../pages/LeaveRequest";
import { DownloadPdf } from "./DownloadPdf";

export const TeachersDashboard = () => {
  const [limit] = useState(6);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStaus] = useState(null);
  const [leaveData, setLeaveData] = useState({});
  const { user } = useSelector((state) => state?.auth);
  const { data, loading, refetch } = useQuery(FETCH_ALL_REQUEST, {
    variables: {
      limit,
      offset: page - 1,
      filterData: { status, userId: user._id },
    },
  });
  const allLeavingData = data?.FetchRequest?.result || [];
  const count = data?.FetchRequest?.count || 0;

  // updating request
  const [updateRequestMutation, { loading: updateLoading }] =
    useMutation(UPDATE_REQUEST);
  const onUpdateRequest = async () => {
    try {
      const {
        data: { UpdateRequest },
      } = await updateRequestMutation({
        variables: { ...leaveData, id: leaveData._id },
      });
      if (UpdateRequest.success) {
        successNotify(UpdateRequest.message);
        setVisible(false);
        refetch();
      } else {
        warnNotify(UpdateRequest.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete request
  const [deleteRequestMutation, { loading: deleteLoading }] =
    useMutation(DELETE_REQUEST);

  const onDeleteRequest = async (id) => {
    try {
      const {
        data: { DeleteRequest },
      } = await deleteRequestMutation({
        variables: {
          id,
        },
      });
      if (DeleteRequest.success) {
        successNotify(DeleteRequest.message);
        refetch();
      } else {
        warnNotify(DeleteRequest.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangePagination = (p) => {
    setPage(p);
  };

  const onSelectCategory = (leaveType) => {
    setLeaveData({ ...leaveData, leaveType });
  };
  const disabledDate = (current) =>
    current && moment().add(-1, "days") >= current;
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

  const { Option } = Select;

  const { data: leaveDaysData } = useQuery(FETCH_LEAVE_DAYS);
  const basicLeaveDays = leaveDaysData?.FetchLeavesDays?.result;

  const { data: userData, loading: userLoading } = useQuery(FETCH_USER_BY_ID, {
    variables: {
      id: user._id,
    },
  });
  const userLeave = userData?.FetchUserById?.user || {};
  const getUserLeave = (key) => {
    try {
      const data = userLeave[LeaveType[key]];
      const takenDays = data < 0 ? 0 : data; //how many days alredy taken
      const totalDays = basicLeaveDays[LeaveType[key]];
      const remainDays = totalDays - takenDays;
      return { remainDays, takenDays, totalDays };
    } catch (error) {
      return {};
    }
  };

  return (
    <div className="container-fluid" id="dashboard">
      <Modal
        title="Update leave request"
        visible={visible}
        okButtonProps={{ loading: updateLoading }}
        onCancel={() => {
          setVisible(false);
          setLeaveData({});
        }}
        onOk={onUpdateRequest}
        okText="Update"
      >
        <div className="mb-3">
          <label>Select category</label>
          <Select
            placeholder="Category"
            style={{ width: "100%" }}
            onChange={onSelectCategory}
            value={leaveData.leaveType}
          >
            {leaveCategory.map(({ label, value }, key) => (
              <Select.Option key={key} value={value}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="mb-3">
          <label>Duration</label>
          <DatePicker.RangePicker
            format="DD-MM-YYYY"
            size="large"
            style={{ width: "100%" }}
            value={[
              leaveData.startDate
                ? moment(leaveData.startDate, "x")
                : moment(Date.now(), "x"),
              leaveData.endDate
                ? moment(leaveData.endDate, "x")
                : moment(Date.now(), "x"),
            ]}
            onChange={onChangeDate}
            disabledDate={disabledDate}
            className="price-control w-100"
          />
        </div>
        <label>Description</label>
        <Input.TextArea
          size="large"
          style={{ width: "100%" }}
          value={leaveData?.description}
          onChange={(e) =>
            setLeaveData({
              ...leaveData,
              description: e.target.value,
            })
          }
          className="price-control w-100"
        />
      </Modal>
      <Spin spinning={loading || deleteLoading}>
        <div className="card">
          <div className="mb-5">
            <h4>
              <i className="fas fa-binoculars"></i> Leaving days left
            </h4>
            <div className="row">
              {Object.keys(LeaveType).map((key) => (
                <div
                  className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4"
                  key={key}
                >
                  <Card>
                    <div className="text mb-1">
                      <h6>{key}</h6>
                      <p>
                        <>Total days: </> {getUserLeave(key).totalDays}
                      </p>
                      <p>
                        <>Taken days: </>
                        {getUserLeave(key).takenDays}
                      </p>
                      <p>
                        <>Remain days: </>
                        {getUserLeave(key).remainDays}
                      </p>
                      {/* {key}: {getUserLeave(key).remainDays} */}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div
            className="title text-left"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>
              <i className="fal fa-history"></i> Your history
            </h4>
            <div>
              <DownloadPdf status={status} />
              <Select
                showSearch
                placeholder="Filter by status"
                onChange={(value) => setStaus(value)}
                allowClear
                style={{ width: "180px" }}
              >
                <Option value="Pending">Pending</Option>
                {(user?.role === UserRole.Head ||
                  user?.role === UserRole.Lecturar) && (
                  <>
                    <Option value="Approved by Dean">Approved by Dean</Option>
                    <Option value="Cancelled by Dean">Cancelled by Dean</Option>
                  </>
                )}
                {user?.role === UserRole.Lecturar && (
                  <>
                    <Option value="Approved by Dept. Head">
                      Approved by Dept. Head
                    </Option>
                    <Option value="Cancelled by Dept. Head">
                      Cancelled by Dept. Head
                    </Option>
                  </>
                )}
                <Option value="Approved">Approved</Option>
              </Select>
            </div>
          </div>
          <div className="row" style={{ minHeight: "50vh" }}>
            {allLeavingData.length === 0 && <p>No history to show.</p>}
            {allLeavingData?.map((item, idx) => (
              <div
                className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4"
                key={`${idx}`}
              >
                <Card style={{ height: "100%" }}>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                    <div
                      style={{
                        visibility:
                          item.status === "Pending" ? "visible" : "hidden",
                      }}
                    >
                      <EditOutlined
                        className="mr-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setVisible(true);
                          setLeaveData(item);
                        }}
                      />
                      <Popconfirm
                        title="Are you sure?"
                        okType="danger"
                        onConfirm={() => onDeleteRequest(item._id)}
                      >
                        <DeleteOutlined style={{ color: "red" }} />
                      </Popconfirm>
                    </div>
                  </div>
                  <div className="mb-1 d-flex justify-content-between">
                    <h6>Category</h6>
                    <p>
                      <b>{getFormatType(item.leaveType)}</b>
                    </p>
                  </div>
                  <div className="mb-1 d-flex justify-content-between">
                    <h6>From</h6>
                    <p>
                      {moment(Number(item?.startDate)).format("MMM  D,  YYYY")}
                    </p>
                  </div>
                  <div className="mb-1 d-flex justify-content-between">
                    <h6>To</h6>
                    <p>
                      {moment(Number(item?.endDate)).format("MMM  D,  YYYY")}
                    </p>
                  </div>
                  <div>
                    <h6>Description</h6>
                    <p className="mb-0">
                      {item?.description ? (
                        item.description
                      ) : (
                        <b>No description provided.</b>
                      )}
                    </p>
                  </div>
                  {item.cancellationNote && (
                    <div className="mt-3">
                      <h6>Cancellation note</h6>
                      <p className="mb-0">{item.cancellationNote}</p>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <Pagination
                className="pagination"
                total={count}
                pageSize={limit}
                current={page}
                showSizeChanger={false}
                onChange={onChangePagination}
              />
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

const getFormatType = (type) => {
  switch (type) {
    case LeaveType.Casual:
      return "Casual";
    case LeaveType.Maternity:
      return "Maternity";
    case LeaveType.Paternity:
      return "Paternity";
    case LeaveType.Medical:
      return "Medical";
    case LeaveType.Previlged:
      return "Privileged";
    case LeaveType.Study:
      return "Study";
    default:
      break;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "magenta";
    case "Accepted":
      return "green";
    case "Approved":
      return "green";
    case "Approved by Dean":
      return "cyan";
    case "Approved by Dept. Head":
      return "cyan";
    default:
      return "red";
  }
};
