import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { Button, Typography, Row, Col, Select, DatePicker, Input } from "antd";
import { PlusOutlined, PrinterOutlined } from "@ant-design/icons";

import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";

import { getCustomerAvatarSrc } from "helpers";

import Avatar from "antd/lib/avatar/avatar";
import { fetchCustomers } from "store/customer/actions";

import { technicServiceStatusTypes } from "constants/index";
import { QueryTechnicalServiceDto } from "dto";

import TechnicalServiceList from "components/TechnicalServiceList";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const TechnicalService = () => {
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const [query, setquery] = useState<QueryTechnicalServiceDto>({});

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
        <Col xs={24} md={3}>
          <Input
            size="large"
            placeholder="Takip No"
            value={query.trackingId}
            onChange={({ target }) =>
              setquery((prev) => ({ ...prev, trackingId: target.value || undefined }))
            }
          />
        </Col>
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
        <Col xs={12} md={4}>
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
        <Col xs={16} md={8}>
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
        <Col xs={8} md={3}>
          <Button block size="large" icon={<PrinterOutlined />} onClick={() => window.print()}>
            Yazdır
          </Button>
        </Col>
      </Row>

      <TechnicalServiceList query={query} showCustomerName />
    </div>
  );
};

export default TechnicalService;
