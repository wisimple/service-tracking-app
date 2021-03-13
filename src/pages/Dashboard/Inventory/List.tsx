import { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import api from "utils/api";
import { IProduct } from "interfaces";
import { getDeviceImageUrl } from "helpers";

import styled from "styled-components";
import Money from "components/Money";

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

  useEffect(() => {
    async function init() {
      const { data } = await api.get("products?brandId=6042b9a12e47a5c95fa524c7");

      setproducts(data);
    }
    init();
  }, []);

  return (
    <div>
      <Row gutter={[12, 12]}>
        {products.map((_, i) => (
          <Col xs={12} md={8} lg={6} xl={4}>
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
