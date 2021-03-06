import { Card } from "antd";
import CustomerForm from "components/CustomerForm";
import { CustomerDto } from "dto";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createCustomer } from "store/customer/actions";

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (values: CustomerDto) => {
    await dispatch(createCustomer(values));
    history.goBack();
  };

  return (
    <Card title="Yeni Müşteri Kaydı Oluştur">
      <CustomerForm handleSubmit={handleSubmit} />
    </Card>
  );
};

export default Create;
