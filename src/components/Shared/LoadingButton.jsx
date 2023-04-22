import React from "react";

export const LoadingButton = ({ loading, ...props }) => {
  return (
    <button {...props}>
      <span style={{ textAlign: "left", display: "block", width: "93%", float: "left" }}>{props.children}</span>
      {loading ? (
        <div className="spinner-border spinner-border-sm" role="status" style={{ verticalAlign: "middle" }}>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <i className="fad fa-arrow-circle-right"></i>
      )}
    </button>
  );
};
