import React from "react";

export const AuthLayout = (props) => {
  return (
    <section className="main-section sing-up-page">
      <div
        className="right-main-content"
        style={{
          background: "url(/assets/img/corporate.jpg)",
          minHeight: "100vh",
        }}
      >
        {props.children}
      </div>
    </section>
  );
};
