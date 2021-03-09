import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popconfirm, Radio, message, Row, Col } from "antd";
import { CustomerDto } from "dto";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { RootState } from "store";
import { createCustomer, deleteCustomer, updateCustomer } from "store/customer/actions";
import { Customer } from "store/customer/types";

const { TextArea } = Input;

interface Props {
  onSubmit: () => void;
  data?: Customer;
}

const CustomerForm = ({ onSubmit, data }: Props) => {
  const { cLoading, dLoading } = useSelector((state: RootState) => state.customerState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [showGender, setshowGender] = useState(true);

  const handleSubmit = async (values: CustomerDto) => {
    if (data) {
      await dispatch(updateCustomer(data._id, values));
      message.success("Müşteri bilgileri başarıyla güncellendi");
    } else {
      await dispatch(createCustomer(values));
      message.success("Yeni müşteri başarıyla oluşturuldu");
    }
    onSubmit();
  };

  const handleDelete = async () => {
    if (data) {
      await dispatch(deleteCustomer(data._id));
      history.replace(url + "/customers");
    }
  };

  useEffect(() => {
    if (data) {
      setshowGender(data.type === "person");
    }
  }, []);

  return (
    <Form layout="vertical" onFinish={handleSubmit} scrollToFirstError>
      <Form.Item label="Müşteri Tipi" name="type" initialValue={data?.type || "person"}>
        <Radio.Group
          onChange={({ target }) => {
            setshowGender(target.value === "person");
          }}
        >
          <Radio value="person">Şahış</Radio>
          <Radio value="company">Şirket</Radio>
        </Radio.Group>
      </Form.Item>
      {showGender && (
        <Form.Item name="gender" initialValue={data?.gender || true}>
          <Radio.Group>
            <Radio value={true}>Bay</Radio>
            <Radio value={false}>Bayan</Radio>
          </Radio.Group>
        </Form.Item>
      )}
      <Form.Item
        label="Müşteri İsmi"
        name="name"
        required
        rules={[{ required: true, message: "Lütfen müşteri ismini giriniz" }]}
        initialValue={data?.name}
      >
        <Input autoFocus={!data} />
      </Form.Item>
      <Form.Item label="TC / Vergi No" name="idNumber" initialValue={data?.idNumber}>
        <Input />
      </Form.Item>
      <Form.Item label="Telefon Numarası" name={["contact", "phone"]} initialValue={data?.contact?.phone}>
        <Input />
      </Form.Item>
      <Form.Item label="Adres" name={["contact", "address"]} initialValue={data?.contact?.address}>
        <TextArea />
      </Form.Item>
      <Form.Item label="Açıklama ve Notlar" name="desc" initialValue={data?.desc}>
        <TextArea />
      </Form.Item>
      <Form.Item>
        {data ? (
          <Row justify="space-between">
            <Col>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={cLoading}>
                GÜNCELLE
              </Button>
            </Col>
            <Col>
              <Popconfirm
                title={`${data.name} adlı müşteriyi silmek istediğinizden emin misiniz?`}
                onConfirm={handleDelete}
              >
                <Button type="primary" danger icon={<DeleteOutlined />} loading={dLoading}>
                  SİL
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        ) : (
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={cLoading}>
            KAYDET
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
