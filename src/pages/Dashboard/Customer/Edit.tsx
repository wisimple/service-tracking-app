import { useEffect } from "react";
import { Card } from "antd";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "store/customer/actions";
import { RootState } from "store";
import CustomerForm from "components/CustomerForm";

const CustomerEdit = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const { customer, loading } = useSelector((state: RootState) => state.customerState);

  useEffect(() => {
    dispatch(getCustomer(params.id));
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card title="Müşteri Bilgilerini Güncelle" loading={loading}>
      <CustomerForm onSubmit={() => history.goBack()} data={customer} />
    </Card>
  );
};

export default CustomerEdit;
