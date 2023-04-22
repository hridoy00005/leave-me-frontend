import React, { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logoutUser } from "../store/modules/auth";
import { sidebar } from "./sidebar";

const Layout = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const role = useSelector((state) => state.auth?.user?.role);
  const [expand, setExpand] = useState(false);
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  // const sidebar = getSidebar(role) || [];

  const onClickToggleMenu = () => {
    document.querySelector(".sidebar-menu").classList.add("open");
    document.body.classList.add("open");
  };

  const onClickCloseMenu = () => {
    document.querySelector(".sidebar-menu").classList.remove("open");
    document.body.classList.remove("open");
  };

  // call api for create category

  return (
    <section className="main-section">
      <div className="sidebar-menu">
        <div className="left-menu-wrapper">
          <div className="close-menu" onClick={onClickCloseMenu}>
            <a href="#/">
              <i className="fal fa-times"></i>
            </a>
          </div>
          <div className="left-logo">
            <Link to="/">
              <img
                style={{ width: "75px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSSPhmVShMPrH5IM5U3T9NBkXXRAevq3AYUyolgl26gzsw2Z89pyfXxCCPfHBhpEYmmw&usqp=CAU"
                alt=""
              />
            </Link>
          </div>
          <ul className="left-menu">
            {sidebar.map((item) => {
              if (item.role.includes(role) && item.submenu?.length > 0) {
                return (
                  <li key={item.path}>
                    <Accordion>
                      <Card>
                        <Accordion.Toggle
                          eventKey="0"
                          onClick={() => setExpand(!expand)}
                        >
                          <i className={item.icon}></i> {item.label}
                          <i
                            style={{
                              fontSize: "10px",
                              marginLeft: "60px",
                              fontWeight: "inherit",
                            }}
                            className={`text-right fas fa-arrow-${
                              expand ? "up" : "down"
                            }`}
                          ></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse
                          eventKey="0"
                          className="sub-category"
                        >
                          <Card.Body>
                            {item.submenu.map((subItem) => (
                              <li key={subItem.path}>
                                <NavLink
                                  exact={subItem.exact}
                                  to={subItem.path}
                                >
                                  <i className={subItem.icon}></i>{" "}
                                  {subItem.label}
                                </NavLink>
                              </li>
                            ))}
                            {/* <Button
                              type="primary"
                              onClick={() => setVisible(true)}
                            >
                              <i className="fas fa-plus"></i>Add Category
                            </Button> */}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </li>
                );
              } else if (item.role.includes(role)) {
                const isActiveMenu = pathname
                  .toLowerCase()
                  .includes(item.path.toLowerCase())
                  ? "active"
                  : "";
                return (
                  <li key={item.path}>
                    <NavLink
                      exact={item.exact}
                      to={item.path}
                      activeClassName={isActiveMenu}
                    >
                      <i className={item.icon}></i> {item.label}
                    </NavLink>
                  </li>
                );
              }
            })}
            <li>
              <a href="#/" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-main-content">
        <div className="mobile-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="mobile-header-wrapper">
                  <div className="mobile-logo">
                    <a href="#/" style={{ width: "80px" }}>
                      <img
                        style={{ width: "75px" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhSSPhmVShMPrH5IM5U3T9NBkXXRAevq3AYUyolgl26gzsw2Z89pyfXxCCPfHBhpEYmmw&usqp=CAU"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="toggle-menu" onClick={onClickToggleMenu}>
                    <a href="#/" className="toggle-icon">
                      <i className="fas fa-bars"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {props.children}
      </div>
    </section>
  );
};

export default Layout;

