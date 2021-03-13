import { useEffect } from "react";
import TechnicalServiceForm from "components/TechnicalServiceForm";
import { useDispatch, useSelector } from "react-redux";
import { getTechnicalService } from "store/technicalService/actions";
import { useParams } from "react-router";
import { RootState } from "store";
import { Card, Spin } from "antd";

const Show = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const { service, loading } = useSelector((state: RootState) => state.servicesState);

  useEffect(() => {
    dispatch(getTechnicalService(params.id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card title="Teknik Servis Detayı">
      <Spin tip="Yükleniyor..." size="large" spinning={loading}>
        <TechnicalServiceForm data={service} />
      </Spin>
    </Card>
  );
};

export default Show;
