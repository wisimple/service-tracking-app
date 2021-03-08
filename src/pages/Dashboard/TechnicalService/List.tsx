import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Table, Button, Typography, Row, Col, Popover, List, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnicalServices } from "store/technicalService/actions";
import { ITechicalService } from "interfaces";
import { getCustomerAvatarSrc, getDeviceImageUrl, getTechnicalServiceStatusType } from "helpers";
import Avatar from "antd/lib/avatar/avatar";
import Money from "components/Money";

const { Column } = Table;
const { Title } = Typography;

export default function TechnicalService() {
  const { services, loading } = useSelector((state: RootState) => state.servicesState);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTechnicalServices());
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
      <Table
        dataSource={services}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        style={{ overflowY: "scroll" }}
      >
        <Column
          title="Müşteri"
          render={({ customerId }: ITechicalService) => (
            <Popover
              title={customerId.name}
              content={
                <div>
                  <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                    {customerId.contact?.phone && (
                      <li>
                        <strong>İletişim:</strong>{" "}
                        <a href={`tel:${customerId.contact.phone}`}>{customerId.contact.phone}</a>
                      </li>
                    )}
                    {customerId.desc && (
                      <li>
                        <strong>Açıklama / Not:</strong> {customerId.desc}
                      </li>
                    )}
                  </ul>
                </div>
              }
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={getCustomerAvatarSrc(customerId)} style={{ marginRight: 8, flexShrink: 0 }} />
                {customerId.name}
              </div>
            </Popover>
          )}
        />
        <Column
          title="Cihaz"
          render={({ device }: ITechicalService) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              {device?.productId?.imgFile && (
                <img
                  src={getDeviceImageUrl(device.productId.imgFile)}
                  height={35}
                  width="auto"
                  style={{ marginRight: 8 }}
                />
              )}
              {device?.brandId?.name} {device?.productId?.name}
            </div>
          )}
        />
        <Column
          title="Durum"
          dataIndex="status"
          render={(status: number) => {
            const { text, color } = getTechnicalServiceStatusType(status);
            return <Tag color={color}>{text}</Tag>;
          }}
        />
        <Column
          title="Arıza"
          render={({ faultTypeId }: ITechicalService) => <div>{faultTypeId?.name}</div>}
        />
        <Column title="Ücret" dataIndex="totalCost" render={(amount) => <Money amount={amount} />} />
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
