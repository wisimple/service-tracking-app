import { Card, Col, Row } from "antd";
import { Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

const index = () => {
  return (
    <Row justify="space-around" style={{ textAlign: "center" }}>
      <Col span={24} style={{ padding: "100px 0" }}>
        <Title level={4}>Hoşgeldin</Title>
        <p>Uygulama geliştirme aşamasında olduğu için şuanda sadece giriş yapabilirsiniz</p>
      </Col>
      <Col span={8}>
        <Card hoverable>Kayıt Ol</Card>
      </Col>
      <Col span={8}>
        <Link to="/signin">
          <Card hoverable>Giriş Yap</Card>
        </Link>
      </Col>
    </Row>
  );
};

export default index;
