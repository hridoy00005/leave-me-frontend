import React from "react";
import { Table } from "antd";

export const DynamicList = ({
  title = "",
  actions,
  tableFilter,
  pagination,
  data = [],
  columns = [],
  loading,
  showSearch = false,
  onChangeSearch = () => {},
  tableHide = false,
  children,
  headerBorderHide = false,
  ...props
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="heading">
            <div className="create-user-btn d-flex">{actions}</div>
          </div>
          <div className="card">
            <div className="list-user-part">
              <div
                className="card-title"
                style={!headerBorderHide ? { borderBottom: "2px solid" } : {}}
              >
                <h1>{title}</h1>
              </div>
              {tableFilter && (
                <div
                  style={{
                    marginTop: "5px",
                    padding: "15px",
                    border: "1px solid #e8d7d7",
                  }}
                >
                  {tableFilter}
                </div>
              )}
              <div className="table-responsive">
                {!tableHide && (
                  <Table
                    rowKey={(row) => row._id}
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    loading={loading}
                    {...props}
                  />
                )}
              </div>
              {children}
            </div>
          </div>
          {pagination}
        </div>
      </div>
    </div>
  );
};
