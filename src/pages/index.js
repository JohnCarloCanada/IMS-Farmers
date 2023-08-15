import React from "react";

const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const Dashboard = React.lazy(() => import("./DashBoard"));

export { Login, Register, Dashboard };
