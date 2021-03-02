import { Form, Input, Button, Select, Divider, Modal, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import CustomerForm from "components/CustomerForm";
import { technicServiceStatusTypes } from "constants/index";

const { Option } = Select;
const { TextArea } = Input;

const ServiceForm = () => {
  const [showCustomerModal, setshowCustomerModal] = useState<boolean>(false);

  return (
    <div>
      <h2>Yeni Teknik Servis İşlemi Oluştur</h2>
      <Modal visible={showCustomerModal} footer={false} onCancel={() => setshowCustomerModal(false)}>
        <CustomerForm />
      </Modal>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
        <Form.Item label="Müşteri">
          <Select
            showSearch
            placeholder="Select a person"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <Button type="link" onClick={() => setshowCustomerModal(true)}>
                  <PlusOutlined /> Yeni Müşteri Ekle
                </Button>
              </div>
            )}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cihaz Seçiniz">
          <Input.Group>
            <Row>
              <Col span={8}>
                <Select
                  showSearch
                  placeholder="Cihaz Türü"
                  style={{ width: "100%" }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <Button type="link" onClick={() => setshowCustomerModal(true)}>
                        <PlusOutlined /> Yeni Müşteri Ekle
                      </Button>
                    </div>
                  )}
                >
                  <Option value="jack">Elektronik</Option>
                  <Option value="lucy">Telefon</Option>
                  <Option value="tom">Bilgilsyar</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  showSearch
                  placeholder="Marka"
                  style={{ width: "100%" }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <Button type="link" onClick={() => setshowCustomerModal(true)}>
                        <PlusOutlined /> Yeni Müşteri Ekle
                      </Button>
                    </div>
                  )}
                >
                  <Option value="jack">Elektronik</Option>
                  <Option value="lucy">Telefon</Option>
                  <Option value="tom">Bilgilsyar</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select
                  showSearch
                  placeholder="Model"
                  style={{ width: "100%" }}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <Button type="link" onClick={() => setshowCustomerModal(true)}>
                        <PlusOutlined /> Yeni Müşteri Ekle
                      </Button>
                    </div>
                  )}
                >
                  <Option value="jack">Elektronik</Option>
                  <Option value="lucy">Telefon</Option>
                  <Option value="tom">Bilgilsyar</Option>
                </Select>
              </Col>
            </Row>
          </Input.Group>
        </Form.Item>
        <Form.Item name="status" label="Durum">
          <Select defaultValue={3}>
            {technicServiceStatusTypes.map((s) => (
              <Option value={s.value}>{s.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Açıklama / Not" name="desc">
          <TextArea showCount allowClear maxLength={200} rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ServiceForm;
