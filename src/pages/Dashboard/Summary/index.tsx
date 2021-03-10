import { Card, Col, Row, Typography } from "antd";
import { getTechnicalServiceStatusType } from "helpers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { RootState } from "store";
import { getTechnicalServicesSummary } from "store/technicalService/actions";

const { Title } = Typography;
const Summary = () => {
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state: RootState) => state.servicesState);

  useEffect(() => {
    dispatch(getTechnicalServicesSummary());
  }, []);
  return (
    <div>
      <Title level={3}>Teknik Servis Durumu</Title>
      <Row gutter={[16, 16]}>
        {[1, 3, 5].map((i) => {
          const status = getTechnicalServiceStatusType(i);
          return (
            <Col key={i} xs={24} md={12} lg={8}>
              <Link to={`${url}/technical-services`}>
                <Card
                  loading={loading}
                  hoverable
                  style={{ background: `url("./images/bg/wave.jpg")`, backgroundSize: "cover" }}
                >
                  <h5 style={{ fontSize: 26 }}>
                    {summary?.find((sum) => sum._id === status.value)?.count || 0} adet
                  </h5>
                  <h3 style={{ fontSize: 20, textAlign: "right", margin: 0 }}>{status.text}</h3>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Summary;
