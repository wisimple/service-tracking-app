import { Table, Button, Typography, Row, Col } from "antd";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { PlusOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Title } = Typography;

const data = [
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
  {
    _id: "1",
    customerId: { _id: "12121", name: "Kucuk Suslu Telefon" },
    status: "Bekliyor",
    cost: 350,
    faultType: {
      _id: "234234",
      name: "Ekran Kirigi",
    },
    cAt: "2021-02-02T00:23:38.217+00:00",
  },
];

export default function TechnicalService() {
  const { url } = useRouteMatch();
  return (
    <div>
      <Row justify="space-between" style={{ padding: "0.5rem 0" }}>
        <Col>
          <Title level={3}>Teknik Servis İşlemleri</Title>
        </Col>
        <Col>
          <Link to={`${url}/create`}>
            <Button type="primary" icon={<PlusOutlined />}>
              Yeni İşlem Ekle {url}
            </Button>
          </Link>
        </Col>
      </Row>
      <Table dataSource={data}>
        <Column
          title="Müşteri"
          dataIndex="customerId"
          key="customerId"
          render={(c: { _id: string; name: string }) => <Link to="/dashboard/customer/id">{c.name}</Link>}
        />
        <Column
          title="Arıza Tipi"
          dataIndex="faultType"
          key="faultType"
          render={(type: { _id: string; name: string }) => {
            return type.name;
          }}
        />
        <Column title="Durum" dataIndex="status" key="status" />
        <Column title="Ücret" dataIndex="cost" key="cost" />
        <Column
          title="Tarih"
          dataIndex="cAt"
          key="cAt"
          render={(date: string) => {
            return new Date(date).toLocaleDateString();
          }}
        />
        <Column
          title="İşlem"
          key="action"
          render={() => {
            return (
              <Button type="dashed">
                <Link to={`${url}/id`}>İşlem Yap</Link>
              </Button>
            );
          }}
        />
      </Table>
    </div>
  );
}
