import { Card } from "antd";
import CustomerForm from "components/CustomerForm";
import { useHistory } from "react-router";

const Create = () => {
  const history = useHistory();

  return (
    <Card title="Yeni Müşteri Kaydı Oluştur">
      <CustomerForm onSubmit={() => history.goBack()} />
    </Card>
  );
};

export default Create;
