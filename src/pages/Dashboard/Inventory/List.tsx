import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Row, Col, Input, Typography, Select, Card } from "antd";
import api from "utils/api";
import { IProduct } from "interfaces";
import { getDeviceImageUrl } from "helpers";

import styled from "styled-components";
import Money from "components/Money";
import { DropboxOutlined, ShoppingCartOutlined, ShopTwoTone } from "@ant-design/icons";

const { Search } = Input;
const { Title } = Typography;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  transition: all 0.4s;

  &:hover {
    box-shadow: 1px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const StyledImage = styled.img`
  height: 150px;
  width: auto;
  margin-bottom: 1rem;
`;

const StyledHeader = styled.h3`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StockList = () => {
  const [products, setproducts] = useState<IProduct[]>([]);
  const { url } = useRouteMatch();

  useEffect(() => {
    async function init() {
      const { data } = await api.get("products?brandId=6042b9a12e47a5c95fa524c7");

      setproducts(data);
    }
    init();
  }, []);

  return (
    <div>
      <Row style={{ height: 100, marginBottom: 20 }} gutter={[12, 12]}>
        <Col span={12}>
          <Link to={`${url}/create`}>
            <Card hoverable>
              <Title level={4}>
                <ShoppingCartOutlined /> Stoktan Ürün Satışı Yap
              </Title>
            </Card>
          </Link>
        </Col>
        <Col span={12}>
          <Link to={`${url}/create`}>
            <Card hoverable>
              <Title level={4}>
                <DropboxOutlined /> Stoğa Ürün Girişi Yap
              </Title>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>
            <ShopTwoTone /> Stoktaki Ürünlerim
          </Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }} gutter={[6, 6]}>
        <Col xs={24} md={10} lg={6} xl={4}>
          <Select size="large" defaultValue="0" style={{ width: "100%" }}>
            <Select.Option value="0">Tüm Kategoriler</Select.Option>
            <Select.Option value="1">sdfsdf</Select.Option>
            <Select.Option value="2">werwr</Select.Option>
          </Select>
        </Col>
        <Col xs={24} md={14} lg={12} xl={8}>
          <Search
            size="large"
            placeholder="Ürün Arayın..."
            onSearch={(value) => console.log(value)}
            enterButton
            allowClear
          />
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        {products.map((_, i) => (
          <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
            <StyledCard key={i}>
              {_.imgFile && <StyledImage alt="example" src={getDeviceImageUrl(_.imgFile)} />}
              <StyledHeader>Sony {_.name}</StyledHeader>
              <Money amount={2299} />
              <span>Stokta son 5 adet</span>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StockList;
