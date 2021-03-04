import { Form, Input, Button, Select, Divider, Upload, Radio } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import React from "react";

import { technicServiceStatusTypes, warrantyDurations } from "constants/index";

import { productCategories, faultTypes, productBrands, productModels, customers } from "mockData";

const { TextArea } = Input;

const ServiceForm = () => {
  return (
    <Form
      size="large"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={(values) => console.log(values)}
    >
      <Form.Item
        label="Müşteri"
        name={["customer", "_id"]}
        required
        rules={[{ required: true, message: "Lütfen müşteri seçiniz" }]}
      >
        <Select
          showSearch
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                <Button type="link" size="middle">
                  <PlusOutlined /> Yeni Müşteri Ekle
                </Button>
              </div>
            </div>
          )}
        >
          {customers.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Talep" name={["customer", "demand"]}>
        <TextArea />
      </Form.Item>

      <Divider plain orientation="left">
        Cihaz Bilgileri
      </Divider>

      <Form.Item label="Cihaz Seçiniz">
        <Input.Group compact>
          <Form.Item name={["device", "categoryId"]} noStyle>
            <Select showSearch style={{ width: "33%" }} placeholder="Cihaz Tipi">
              {productCategories.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={["device", "brandId"]} noStyle>
            <Select showSearch style={{ width: "33%" }} placeholder="Marka">
              {productBrands.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={["device", "modelId"]} noStyle>
            <Select showSearch style={{ width: "33%" }} placeholder="Model">
              {productModels.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Imei/Seri Numarası" name="serialNumber">
        <Input />
      </Form.Item>

      <Form.Item label="Cihaz Resimleri" name="images">
        <Upload name="images[]" listType="picture" fileList={[]} multiple>
          <Button icon={<UploadOutlined />} size="middle">
            Resimleri Seç
          </Button>
        </Upload>
      </Form.Item>

      <Divider plain orientation="left">
        Servis Bilgileri
      </Divider>

      <Form.Item label="Durum" name="staus" initialValue={3}>
        <Radio.Group buttonStyle="solid" size="middle">
          {technicServiceStatusTypes.map((item) => (
            <Radio.Button key={item.value} value={item.value} style={{ marginBottom: "6px" }}>
              {item.text}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Arıza Tipi" name="faultTypeId">
        <Select showSearch placeholder="Arızayı Seçiniz">
          {faultTypes.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Yapılan İşlemler / Açıklama" name="description">
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Verilen Garanti Süresi" name="warrantyDuration" initialValue={0}>
        <Select placeholder="Garanti Süresini Seçiniz">
          {warrantyDurations.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.text}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Divider plain orientation="left">
        Ücret Bilgileri
      </Divider>

      <Form.Item wrapperCol={{ offset: 4 }} style={{ marginBottom: 0 }}>
        <Form.Item label="Toplam Ücret" name="totalCost" style={{ display: "inline-block", width: "120px" }}>
          <Input type="number" addonAfter="₺" />
        </Form.Item>

        <Form.Item
          label="Ödenen Ücret"
          name="paidAmount"
          style={{ display: "inline-block", width: "120px", marginLeft: "8px" }}
        >
          <Input type="number" addonAfter="₺" />
        </Form.Item>
        {/* <Form.Item label="Kalan" style={{ display: "inline-block", width: "120px", marginLeft: "8px" }}>
            <Input disabled />
          </Form.Item> */}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          KAYDET
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
