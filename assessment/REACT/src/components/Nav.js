import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { connect } from "react-redux";

const Nav = ({ user }) => {
  const handleClick = (e) => {};
  React.useEffect(() => {
    console.log("updated");
  }, [user]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Menu onClick={handleClick} mode="horizontal">
        <Menu.Item key="mail" disabled={user ? true : false}>
          <Link to="/log">Login</Link>
        </Menu.Item>
        <Menu.Item key="app" disabled={user ? true : false}>
          <Link to="/reg">Register</Link>
        </Menu.Item>
        <Menu.Item key="alipay">
          <Link to="/log">Logout</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Nav);
