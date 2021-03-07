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
      <Row justify="space-between" style={{ paddingBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Teknik Servis İşlemleri
          </Title>
        </Col>
        <Col>
          <Link to={`${url}/create`}>
            <Button type="primary" icon={<PlusOutlined />}>
              Yeni İşlem Ekle
            </Button>
          </Link>
        </Col>
      </Row>
      <Table dataSource={data} rowKey="_id" pagination={{ pageSize: 20 }}>
        <Column
          title="Müşteri"
          dataIndex="customerId"
          render={(c: { _id: string; name: string }) => <Link to="/dashboard/customer/id">{c.name}</Link>}
        />
        <Column
          title="Arıza Tipi"
          dataIndex="faultType"
          render={(type: { _id: string; name: string }) => {
            return type.name;
          }}
        />
        <Column title="Durum" dataIndex="status" />
        <Column title="Ücret" dataIndex="cost" />
        <Column
          title="Tarih"
          dataIndex="cAt"
          render={(date: string) => {
            return new Date(date).toLocaleDateString();
          }}
        />
        <Column
          title="İşlem"
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
