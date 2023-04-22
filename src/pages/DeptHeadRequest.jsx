import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Input, Modal, Pagination, Popconfirm, Spin, Tag } from "antd";
import { LeaveType, UserRole } from "../config";
import { UPDATE_REQUEST_STATUS, FETCH_ALL_REQUEST } from "../graphql/modules";
import moment from "moment";
import { successNotify, warnNotify } from "../util";
import { useSelector } from "react-redux";

export const DeptHeadRequest = () => {
  const [cancelationModalVisible, setCancelationModalVisible] = useState(false);
  const [cancelationNote, setCancelationNote] = useState("");
  const user = useSelector((state) => state?.auth?.user || {});
  const [limit] = useState(6);
  const [page, setPage] = useState(1);

  const { data, loading, refetch } = useQuery(FETCH_ALL_REQUEST, {
    variables: {
      limit,
      offset: page - 1,
      filterData: {
        status: "Pending",
        userId: user._id,
        isOther: true,
        dept: user.role !== UserRole.Dean ? user.dept : "",
        faculty: user.faculty,
      },
    },
  });
  const allLeavingData = data?.FetchRequest?.result || [];
  const count = data?.FetchRequest?.count || 0;

  // updating request
  const [updateRequestMutation, { loading: updateLoading }] = useMutation(
    UPDATE_REQUEST_STATUS
  );
  const onUpdateStatus = async (id, status) => {
    try {
      const {
        data: { UpdateRequestStatus },
      } = await updateRequestMutation({
        variables: {
          id,
          status:
            user.role === UserRole.Head
              ? `${status} by Dept. Head`
              : `${status} by Dean`,
          cancellationNote: cancelationNote,
        },
      });
      if (UpdateRequestStatus.success) {
        successNotify(UpdateRequestStatus.message);
        setCancelationModalVisible();
        setCancelationNote("");
        refetch();
      } else {
        warnNotify(UpdateRequestStatus.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangePagination = (p) => {
    setPage(p);
  };

  return (
    <div className="container-fluid" id="dashboard">
      <Modal
        title="Cancelation note"
        visible={cancelationModalVisible}
        okButtonProps={{ loading: updateLoading }}
        onCancel={() => {
          setCancelationModalVisible(false);
          setCancelationNote("");
        }}
        onOk={() => onUpdateStatus(cancelationModalVisible, "Cancelled")}
        okText="Update"
      >
        <label>Note</label>
        <Input.TextArea
          size="large"
          style={{ width: "100%" }}
          value={cancelationNote}
          onChange={(e) => setCancelationNote(e.target.value)}
          className="price-control w-100"
        />
      </Modal>
      <Spin spinning={loading || updateLoading}>
        <div className="card">
          <div
            className="title text-left"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4>
              <i className="fal fa-history"></i> Dept Teachers Requests
            </h4>
          </div>
          <div className="row" style={{ minHeight: "50vh" }}>
            {allLeavingData.length === 0 && <p>No request to show.</p>}
            {allLeavingData?.map((item, idx) => (
              <div
                className="col-md-6 col-sm-12 col-lg-4 col-xl-4 mb-4"
                key={`${idx}`}
              >
                <Card>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    {/* <Popconfirm
                      title="Are you sure?"
                      // okType="danger"
                      onConfirm={() => onUpdateStatus(item._id, "")}
                    > */}
                    <Tag
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCancelationModalVisible(item._id)}
                    >
                      Cancel
                    </Tag>
                    {/* </Popconfirm> */}
                    <Popconfirm
                      title="Are you sure?"
                      // okType="danger"
                      onConfirm={() => onUpdateStatus(item._id, "Approved")}
                    >
                      <Tag color="green" style={{ cursor: "pointer" }}>
                        Forword
                      </Tag>
                    </Popconfirm>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <h6>Category</h6>
                    <p>
                      <b>{getFormatType(item.leaveType)}</b>
                    </p>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <h6>From</h6>
                    <p>
                      {moment(Number(item?.startDate)).format("MMM  D,  YYYY")}
                    </p>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <h6>To</h6>
                    <p>
                      {moment(Number(item?.endDate)).format("MMM  D,  YYYY")}
                    </p>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <h6>Status</h6>
                    <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                  </div>
                  <div className="mb-3">
                    <h6>Description</h6>
                    {item.description}
                  </div>
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
