import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "store";

const { TextArea } = Input;

interface Props {
  handleSubmit: (values: any) => void;
}

const CustomerForm = ({ handleSubmit }: Props) => {
  const { cLoading } = useSelector((state: RootState) => state.customerState);

  return (
    <Form size="large" wrapperCol={{ span: 14 }} labelCol={{ span: 4 }} onFinish={handleSubmit}>
      <Form.Item label="Müşteri Tipi" name="type" initialValue="person">
        <Radio.Group>
          <Radio value="person">Şahış</Radio>
          <Radio value="company">Şirket</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Müşteri İsmi" name="name" required>
        <Input autoFocus />
      </Form.Item>
      <Form.Item label="TC / Vergi No" name="idNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Telefon Numarası" name={["contact", "phone"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Adres" name={["contact", "address"]}>
        <TextArea />
      </Form.Item>
      <Form.Item label="Açıklama ve Notlar" name="desc">
        <TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={cLoading}>
          KAYDET
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
