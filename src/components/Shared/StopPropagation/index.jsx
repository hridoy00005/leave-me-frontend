import React from "react";

const StopPropagation = ({ children }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default StopPropagation;
