import { Col, Row } from "antd";
import SigninForm from "components/SigninForm";
import React from "react";

const Signin = () => {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={8}>
        <SigninForm />
      </Col>
    </Row>
  );
};

export default Signin;
