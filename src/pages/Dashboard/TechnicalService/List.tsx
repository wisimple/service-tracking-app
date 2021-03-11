import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Table, Button, Typography, Row, Col, Popover, Tag, Select, DatePicker, Descriptions } from "antd";
import { PlusOutlined, PrinterOutlined } from "@ant-design/icons";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnicalServices } from "store/technicalService/actions";

import { ITechicalService } from "interfaces";
import { getCustomerAvatarSrc, getDeviceImageUrl, getTechnicalServiceStatusType } from "helpers";

import Avatar from "antd/lib/avatar/avatar";
import Money from "components/Money";
import { fetchCustomers } from "store/customer/actions";

import { technicServiceStatusTypes } from "constants/index";
import { QueryTechnicalServiceDto } from "dto";

const { Column } = Table;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function TechnicalService() {
  const { services, accountSummary, loading } = useSelector((state: RootState) => state.servicesState);
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const [query, setquery] = useState<QueryTechnicalServiceDto>({});

  useEffect(() => {
    dispatch(fetchTechnicalServices(query));
  }, [query]);

  useEffect(() => {
    dispatch(fetchCustomers());
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
          <Link to={`${url}/create`} className="hide-on-print">
            <Button type="primary" icon={<PlusOutlined />}>
              Yeni İşlem Ekle
            </Button>
          </Link>
        </Col>
      </Row>

      <Row style={{ marginBottom: 10 }} gutter={[8, 8]}>
        <Col xs={12} md={6}>
          <Select
            style={{ width: "100%" }}
            showSearch
            size="large"
            allowClear
            loading={customersLoading}
            placeholder="Müşteri Seçiniz"
            filterOption={(input, option: any) => {
              return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            onClear={() => setquery((prev) => ({ ...prev, customerId: undefined }))}
            onChange={(customerId: string) => setquery((prev) => ({ ...prev, customerId }))}
          >
            {customers.map((item) => (
              <Select.Option key={item._id} value={item._id} name={item.name}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar size="small" src={getCustomerAvatarSrc(item)} style={{ marginRight: 8 }} />
                  {item.name}
                </div>
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} md={6}>
          <Select
            style={{ width: "100%" }}
            placeholder="Servis Durumu"
            allowClear
            size="large"
            onClear={() => setquery((prev) => ({ ...prev, status: undefined }))}
            onChange={(status: number) => setquery((prev) => ({ ...prev, status }))}
          >
            {technicServiceStatusTypes.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={16} md={8} lg={8}>
          <RangePicker
            size="large"
            style={{ width: "100%" }}
            allowClear
            onChange={(value, [startDate, endDate]) => {
              console.log(startDate);
              setquery((prev) => ({
                ...prev,
                startDate: startDate ? startDate : undefined,
                endDate: endDate ? endDate : undefined,
              }));
            }}
          />
        </Col>
        <Col xs={8} md={4} lg={4}>
          <Button block size="large" icon={<PrinterOutlined />} onClick={() => window.print()}>
            Yazdır
          </Button>
        </Col>
      </Row>
      {accountSummary && (
        <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="Toplam Tutar">
            <Money amount={accountSummary?.totalCost} />
          </Descriptions.Item>
          <Descriptions.Item label="Alınan Tutar">
            <Money amount={accountSummary?.paidAmount} color="green" />
          </Descriptions.Item>
          <Descriptions.Item label="Kalan Tutar">
            <Money amount={accountSummary?.totalCost - accountSummary?.paidAmount} color="red" />
          </Descriptions.Item>
        </Descriptions>
      )}
      <Table
        id="table"
        dataSource={services}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 20 }}
        style={{ overflowY: "scroll" }}
      >
        <Column title="Takip No" dataIndex="trackingId" />
        <Column
          className="hide-on-print"
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
          className="hide-on-print"
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
