import { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Table, Button, Typography, Row, Col, Popover, Tag } from "antd";
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
        <Column title="Takip No" dataIndex="trackingId" />
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
                  <Link to={`/dashboard/customers/${customerId._id}`}>
                    <Button type="primary" size="small">
                      Detaylar
                    </Button>
                  </Link>
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
          render={({ device }: ITechicalService) => {
            if (device?.customName) {
              return device.customName;
            } else {
              return (
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
              );
            }
          }}
        />
        <Column
          title="Durum"
          dataIndex="status"
          render={(status: number, service: ITechicalService) => {
            const { text, color } = getTechnicalServiceStatusType(status);
            return (
              <div>
                <Tag color={color}>{text}</Tag>
                {service?.statusUAt && <small>{new Date(service.statusUAt).toLocaleDateString()}</small>}
              </div>
            );
          }}
        />
        <Column
          title="Arıza"
          render={({ faultTypeId }: ITechicalService) => (
            <div>
              {faultTypeId?.map((fT) => (
                <Tag key={fT._id}>{fT.name}</Tag>
              ))}
            </div>
          )}
        />
        <Column
          title="Ücret"
          render={({ paidAmount, totalCost }: ITechicalService) => {
            const debt = (totalCost || 0) - (paidAmount || 0);
            return (
              <>
                <div>
                  <Money amount={totalCost} color={debt === 0 ? "green" : ""} />
                </div>
                {debt !== 0 && (
                  <div style={{ fontSize: "12px" }}>
                    <Money amount={debt} size="small" color="red" /> (Kalan)
                  </div>
                )}
              </>
            );
          }}
        />
        <Column
          title="Giriş Tarihi"
          dataIndex="cAt"
          render={(date: string) => {
            return new Date(date).toLocaleDateString();
          }}
        />
        <Column
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
