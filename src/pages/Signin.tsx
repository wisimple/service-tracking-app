import { Col, Row } from "antd";
import SigninForm from "components/SigninForm";

const Signin = () => {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={22} md={12} lg={6}>
        <SigninForm />
      </Col>
    </Row>
  );
};

export default Signin;
