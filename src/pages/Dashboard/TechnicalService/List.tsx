import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Table, Button, Typography, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnicalServices } from "store/technicalService/actions";
import { ICustomer, ITechicalService } from "interfaces";
import { technicServiceStatusTypes } from "constants/index";
import { getCustomerAvatarSrc, getTechnicalServiceStatusType } from "helpers";
import Avatar from "antd/lib/avatar/avatar";

const { Column } = Table;
const { Title } = Typography;

export default function TechnicalService() {
  const { services, loading } = useSelector((state: RootState) => state.servicesState);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchTechnicalServices());
    }
  }, []);
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
      <Table dataSource={services} loading={loading} rowKey="_id" pagination={{ pageSize: 20 }}>
        <Column
          title="Müşteri"
          render={({ customerId }: ITechicalService) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={getCustomerAvatarSrc(customerId)} style={{ marginRight: 8 }} />
              <Link to={`customers/${customerId._id}`}>{customerId.name}</Link>
            </div>
          )}
        />
        <Column
          title="Durum"
          dataIndex="status"
          render={(status: number) => <div>{getTechnicalServiceStatusType(status).text}</div>}
        />
        <Column
          title="Arıza"
          render={({ faultTypeId }: ITechicalService) => <div>{faultTypeId?.name}</div>}
        />
        <Column title="Ücret" dataIndex="totalCost" />
        <Column
          title="Tarih"
          dataIndex="cAt"
          render={(date: string) => {
            return new Date(date).toLocaleDateString();
          }}
        />
        <Column
          title="İşlem"
          render={(item: ITechicalService) => {
            return (
              <Button type="dashed">
                <Link to={`${url}/${item._id}`}>İşlem Yap</Link>
              </Button>
            );
          }}
        />
      </Table>
    </div>
  );
}
