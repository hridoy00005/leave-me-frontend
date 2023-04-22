import React from "react";

const NotFound = () => {
  return (
    <div className="card" style={{ height: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="m-0 text-info text-center">
        <h1 className="m-0 text-danger">404!</h1>
        <br />
        <h4>Not found</h4>
      </div>
    </div>
  );
};

export default NotFound;
