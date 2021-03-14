import { useEffect, useState } from "react";
import { Col, Row, Avatar, Card, Form, Select, Button, Modal, Divider, Table } from "antd";
import { DropboxOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { fetchCustomers } from "store/customer/actions";

import { getCustomerAvatarSrc } from "helpers";
import CustomerForm from "components/CustomerForm";

const { Column } = Table;

const Create = () => {
  const dispatch = useDispatch();
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);

  const [isCustomerModalOpen, setisCustomerModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Modal
        visible={isCustomerModalOpen}
        onCancel={() => setisCustomerModalOpen(false)}
        title="Yeni Müşteri Ekle"
        footer={null}
      >
        <CustomerForm onSubmit={() => setisCustomerModalOpen(false)} />
      </Modal>
      <Card
        title={
          <div>
            <DropboxOutlined /> Ürün Girişi
          </div>
        }
      >
        <Form
          form={form}
          size="large"
          labelCol={{ md: 3, xl: 4 }}
          wrapperCol={{ md: 21, xl: 16 }}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item label="Müşteri">
            <Row gutter={8}>
              <Col xs={24} md={18}>
                <Form.Item
                  name="customerId"
                  required
                  rules={[{ required: true, message: "Lütfen müşteri seçiniz" }]}
                >
                  <Select
                    placeholder="Ürünü aldığınız müşteriyi seçiniz"
                    showSearch
                    loading={customersLoading}
                    filterOption={(input, option: any) => {
                      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }}
                  >
                    {customers.map((item) => (
                      <Select.Option key={item._id} value={item._id} name={item.name}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar size="small" src={getCustomerAvatarSrc(item)} style={{ marginRight: 8 }} />
                          {item.name}
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item>
                  <Button
                    type="dashed"
                    size="middle"
                    shape="round"
                    onClick={() => setisCustomerModalOpen(true)}
                  >
                    <PlusOutlined /> Yeni Müşteri Ekle
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Divider orientation="left">Satın Aldığınız Ürünler</Divider>
          <Table>
            <Column />
          </Table>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SaveOutlined /> KAYDET
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Create;
