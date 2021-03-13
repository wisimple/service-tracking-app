import { useEffect } from "react";
import { Button, Col, Row, Skeleton, Space, Typography } from "antd";
import { useParams, useRouteMatch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "store/customer/actions";
import Avatar from "antd/lib/avatar/avatar";
import { RootState } from "store";
import { getCustomerAvatarSrc } from "helpers";
import TechnicalServiceList from "components/TechnicalServiceList";
import { Link } from "react-router-dom";

const { Title } = Typography;

const CustomerShow = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { customer, loading } = useSelector((state: RootState) => state.customerState);
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(getCustomer(params.id));
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Title level={2} style={{ display: "flex", alignItems: "center" }}>
            {!loading && customer ? (
              <>
                <Avatar src={getCustomerAvatarSrc(customer)} style={{ marginRight: 8 }} />
                {customer?.name}
              </>
            ) : (
              <Space>
                <Skeleton.Avatar active size="large" />
                <Skeleton.Input active style={{ width: 300 }} />
              </Space>
            )}
          </Title>
        </Col>
        <Col>
          <Link to={`${url}/edit`}>
            <Button type="primary">Müşteri Bilgileri</Button>
          </Link>
        </Col>
      </Row>

      <TechnicalServiceList query={{ customerId: params.id }} />
    </>
  );
};

export default CustomerShow;
