import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { DynamicList } from "../components/Shared";
import { FETCH_ALL_USER } from "../graphql/modules";
import moment from "moment";
import { FullName } from "../util/helper";
import { Pagination, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../store/modules";
// import pckagejson from "../../package.json";

export const Department = () => {
  // state inititlization
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});

  const { data, loading } = useQuery(FETCH_ALL_USER, {
    variables: {
      limit,
      offset: page - 1,
      ...filter,
    },
  });
  const allUser = data?.FetchUsersAdmin?.result || [];
  const total = data?.FetchUsersAdmin?.count || 0;

  // check web version
  // const dispatch = useDispatch();

  // const actionUpdateApp = async () => {
  //  await dispatch(logoutUser());
  //   localStorage.setItem(VERSION, pckagejson.version);
  // };
  // useEffect(() => {
  //   const prevVersion = localStorage.getItem(VERSION);
  //   if (pckagejson.version !== prevVersion) {
  //     actionUpdateApp();
  //   }
  // }, []);

  // page handler
  const onChangePagination = (p) => {
    setPage(p);
  };

  // table column
  const column = [
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(Number(record.createdAt)).format("MM/DD/YYYY hh:mm A"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      render: (text, record) => (FullName(record) ? FullName(record) : "---"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (record.phone ? record.phone : "---"),
    },
    {
      title: "BoD",
      dataIndex: "birthDate",
      render: (text, record) =>
        record.birthDate
          ? moment(Number(record.birthDate)).format("DD/MM/YYYY")
          : "---",
    },
    {
      title: "User Type",
      render: (text, record) => (record?.isGuestUser ? "Guest" : "Register"),
    },
  ];

  // user type filter
  const handleUserType = (value) => {
    if (value === "all") {
      setFilter({});
    } else {
      setFilter({ isGuestUser: value });
    }
  };

  const searchComponent = (
    <div className="text-right">
      <label className="mr-3">Select User type:</label>
      <Select
        style={{ width: "250px" }}
        className="mr-2"
        value={filter.isGuestUser === undefined ? "all" : filter.isGuestUser}
        size="large"
        onChange={handleUserType}
      >
        <Select.Option value="all">All</Select.Option>
        <Select.Option value={false}>Register User</Select.Option>
        <Select.Option value={true}>Guest User</Select.Option>
      </Select>
    </div>
  );

  let createBtn = (
    <React.Fragment>
      <Link
        to="/customers/subscriber"
        style={{ minWidth: "110px", fontSize: "18px" }}
      >
        Subscriber User <ArrowRightOutlined className="ml-3" />
      </Link>
    </React.Fragment>
  );

  return (
    <DynamicList
      title="All users"
      data={allUser}
      actions={createBtn}
      columns={column}
      loading={loading}
      tableFilter={searchComponent}
      pagination={
        <Pagination
          className="pagination"
          total={total}
          pageSize={limit}
          current={page}
          showSizeChanger={false}
          onChange={onChangePagination}
        />
      }
    />
  );
};
