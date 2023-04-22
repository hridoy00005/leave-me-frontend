import { BarsOutlined, CaretRightOutlined } from "@ant-design/icons";

const ExpandedIcon = ({ isActive, size = "", dragHandleProps }) => {
  const fontSize = size === "small" ? "" : "17px";
  // console.log(isActive)
  return (
    <div className="d-flex align-items-center" style={{ marginLeft: "-12px" }}>
      <BarsOutlined style={{ fontSize }} {...dragHandleProps} />
      <CaretRightOutlined
        rotate={isActive ? 90 : 0}
        style={{ ...iconStyle, fontSize }}
      />
    </div>
  );
};

export default ExpandedIcon;

const iconStyle = {
  backgroundColor: "rgb(113, 172, 215)",
  color: "#fff",
  borderRadius: "50%",
  padding: "3px",
  marginLeft: "5px",
};
