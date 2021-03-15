import { useEffect } from "react";
import { Avatar, Button, Col, Row, Table, Typography } from "antd";
import { PlusOutlined, RightOutlined, SmileTwoTone } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "store";
import { fetchCustomers } from "store/customer/actions";
import { Customer } from "store/customer/types";

import { getCustomerAvatarSrc } from "helpers";

const { Column } = Table;
const { Title } = Typography;

const CustomerIndex = () => {
  const { customers, loading } = useSelector((state: RootState) => state.customerState);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Row justify="space-between" align="middle" style={{ paddingBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            <SmileTwoTone /> Müşterilerim
          </Title>
        </Col>
        <Col>
          <Link to={`${url}/create`}>
            <Button type="primary" icon={<PlusOutlined />}>
              Yeni Müşteri Ekle
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        dataSource={customers}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        loading={loading}
        style={{ overflowX: "scroll" }}
      >
        <Column
          title="Müşteri"
          dataIndex="name"
          render={(a, customer: Customer) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={getCustomerAvatarSrc(customer)} style={{ marginRight: 8 }} />
              {customer.name}
            </div>
          )}
        />
        <Column
          title="Telefon Numarası"
          dataIndex="contact"
          render={(contact) => (contact?.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : "")}
        />
        <Column title="Açıklama / Notlar" dataIndex="desc" />

        <Column
          render={(a, customer: Customer) => (
            <Link to={`${url}/${customer._id}`}>
              <Button>
                Detaylar <RightOutlined />
              </Button>
            </Link>
          )}
        />
      </Table>
    </>
  );
};

export default CustomerIndex;
