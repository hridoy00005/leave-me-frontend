import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Input, Modal, Popconfirm, Spin, Table, Tag } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { LeaveType } from "../../config";
import {
  UPDATE_REQUEST_STATUS,
  FETCH_ALL_REQUEST,
} from "../../graphql/modules";
import { successNotify, warnNotify } from "../../util/notification";

export const RegisterDashboard = () => {
  const [cancelationModalVisible, setCancelationModalVisible] = useState(false);
  const [cancelationNote, setCancelationNote] = useState("");
  // fetch requests
  const { data, loading, refetch } = useQuery(FETCH_ALL_REQUEST, {
    variables: {
      filterData: {},
    },
  });
  const allLeavingData = data?.FetchRequest?.result || [];

  // status
  const [UpdateStatus, { loading: updateLoading }] = useMutation(
    UPDATE_REQUEST_STATUS
  );
  const onUpdateStatus = async (status, id) => {
    try {
      const {
        data: { UpdateRequestStatus },
      } = await UpdateStatus({
        variables: {
          id,
          status,
          cancellationNote: cancelationNote,
        },
      });
      if (UpdateRequestStatus.success) {
        successNotify(UpdateRequestStatus.message);
        setCancelationModalVisible("");
        refetch();
      } else {
        warnNotify(UpdateRequestStatus.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      render: (_, { user }) => user?.firstname + " " + user?.lastname,
      dataIndex: "user",
    },
    {
      title: "Leaving Type",
      dataIndex: "leaveType",
      render: (_, record) => getFormatType(record.leaveType),
      key: "leaveType",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(Number(text)).format("MMM  D,  YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => moment(Number(text)).format("MMM  D,  YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="d-flex">
          <Button
            className="mr-2"
            type="danger"
            onClick={() => setCancelationModalVisible(record._id)}
          >
            Cancel
          </Button>
          <Popconfirm
            onConfirm={() => onUpdateStatus("Approved", record?._id)}
            title="Are you sure?"
          >
            <Button type="primary">Approve</Button>
          </Popconfirm>
        </div>
      ),
      key: "action",
    },
  ];

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
        onOk={() => onUpdateStatus("Cancelled by VC", cancelationModalVisible)}
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
      <Spin spinning={loading}>
        <div className="card">
          <div className="title">
            <h4>All Request</h4>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                columns={columns}
                dataSource={allLeavingData}
                rowKey={(row) => row?._id}
                expandable={{
                  expandedRowRender: ({ description }) => (
                    <div>
                      <p className="mb-0">
                        <b>Description</b>
                      </p>
                      <p>
                        {description ? description : "No description provided."}
                      </p>
                    </div>
                  ),
                }}
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
