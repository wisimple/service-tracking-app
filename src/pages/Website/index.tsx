import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/dashboard">Yonetim Paneline Git</Link>
    </div>
  );
};

export default index;
