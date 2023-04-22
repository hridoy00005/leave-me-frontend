import React from "react";

export const CustomButton = ({ loading, ...props }) => {
  return (
    <button
      {...props}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...props?.style }}
    >
      {loading && (
        <div className="spinner-border spinner-border-sm mr-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <span>{props.children}</span>
    </button>
  );
};
