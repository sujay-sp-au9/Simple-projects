import React from "react";
import { connect } from "react-redux";

import Login from "./Login";
import Register from "./Register";
import { getInitialUserData, logout } from "../redux/actions/auth";

const Form = ({ type }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {type === "login" ? <Login /> : <Register />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { getInitialUserData, logout })(Form);
