import { useMutation } from "@apollo/react-hooks";
import { Button, DatePicker, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { FETCH_REQUEST_FOR_DOC } from "../../graphql/modules";
import generatePDF from "./pdfGenerator";

export const DownloadPdf = ({ status }) => {
  const [visible, setVisible] = useState(false);
  const [leaveData, setLeaveData] = useState({});

  const onChangeDate = (date) => {
    if (date?.length === 0 || !date) {
      setLeaveData({
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
  // doc data
  const [getDocData, { loading }] = useMutation(FETCH_REQUEST_FOR_DOC);
  const onGetDocData = async () => {
    try {
      const {
        data: { FetchRequestForDoc },
      } = await getDocData({
        variables: {
          status,
          ...leaveData,
        },
      });
      if (FetchRequestForDoc.success) {
        generatePDF(FetchRequestForDoc?.result || []);

        setVisible(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        title="Statement duration"
        visible={visible}
        okButtonProps={{
          loading,
          disabled: !leaveData?.startDate || !leaveData?.endDate,
        }}
        onCancel={() => {
          setVisible(false);
          setLeaveData({});
        }}
        onOk={onGetDocData}
        okText="Downlod"
      >
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
            className="price-control w-100"
          />
        </div>
      </Modal>
      <Button
        className="mr-2"
        onClick={() => {
          setVisible(true);
        }}
      >
        Download statement
      </Button>
    </>
  );
};
