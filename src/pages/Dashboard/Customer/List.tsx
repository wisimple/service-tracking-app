import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "store";
import { fetchCustomers } from "store/customer/actions";

const { Column } = Table;

const CustomerIndex = () => {
  const { customers, loading } = useSelector((state: RootState) => state.customerState);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);

  return (
    <>
      <Row justify="space-between" style={{ padding: "0.5rem 0" }}>
        <Col>
          <h1>Müşterilerim</h1>
        </Col>
        <Col>
          <Link to={`${url}/create`}>
            <Button type="primary" icon={<PlusOutlined />}>
              Yeni Müşteri Ekle
            </Button>
          </Link>
        </Col>
      </Row>
      <Table dataSource={customers}>
        <Column title="Müşteri" key="name" dataIndex="name" />
        {/* <Column
          title="İletişim"
          key="phone"
          dataIndex="contact"
          render={(contact) => (contact?.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : "")}
        />
        <Column title="İşlem" dataIndex="action" key="action" render={() => <Button>Detaylar</Button>} /> */}
      </Table>
    </>
  );
};

export default CustomerIndex;
