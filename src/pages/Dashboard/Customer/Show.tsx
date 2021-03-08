import { useEffect } from "react";
import { Card, Skeleton, Space, Spin, Typography } from "antd";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "store/customer/actions";
import Avatar from "antd/lib/avatar/avatar";
import { RootState } from "store";
import { getCustomerAvatarSrc } from "helpers";
import CustomerForm from "components/CustomerForm";

const { Title } = Typography;

const CustomerShow = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { customer, loading } = useSelector((state: RootState) => state.customerState);

  useEffect(() => {
    dispatch(getCustomer(params.id));
  }, [params.id]);

  return (
    <Card title="Müşteri Detay" loading={loading}>
      {customer && (
        <Title level={2} style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={getCustomerAvatarSrc(customer)} style={{ marginRight: 8 }} />
          {customer?.name}
        </Title>
      )}
      <CustomerForm onSubmit={() => console.log("sdfsfd")} data={customer} />
    </Card>
  );
};

export default CustomerShow;
