import React from "react";
import { Button } from "antd";

const YellowButton = ({ shape = "", size = "small", bgColor = "#71ACD7", ...props }) => {
  const style = {
    background: bgColor,
    color: "#fff",
    border: "1px solid #71acd859",
    display: "flex",
    alignItems: "center",
  };

  return (
    <Button shape={shape} style={style} {...props}>
      {props.text || "No text"}
    </Button>
  );
};

export default YellowButton;
