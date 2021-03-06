import { useEffect, useState } from "react";
import { Form, Input, Button, Select, Divider, Upload, Radio, Row, Col } from "antd";
import { PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { technicServiceStatusTypes, warrantyDurations } from "constants/index";

import { faultTypes } from "mockData";
import { RootState } from "store";
import { fetchBrandsByCategory, resetBrands } from "store/brand/actions";
import { fetchProductCategories } from "store/productCategory/actions";
import { fetchProductsByBrand, resetProducts } from "store/product/actions";
import { Product } from "store/product/types";
import { fetchCustomers } from "store/customer/actions";
import Modal from "antd/lib/modal/Modal";
import CustomerForm from "components/CustomerForm";
import Avatar from "antd/lib/avatar/avatar";
import { getCustomerAvatarSrc } from "helpers";
import FaultTypeCrud from "components/FaultTypeCrud";

const { TextArea } = Input;

const ServiceForm = () => {
  const { categories, loading } = useSelector((state: RootState) => state.productCategoryState);
  const { brands, loading: brandLoading } = useSelector((state: RootState) => state.brandState);
  const { products, loading: productLoading } = useSelector((state: RootState) => state.productState);
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [selectedProduct, setselectedProduct] = useState<Product | null>();
  const [isCustomerModalOpen, setisCustomerModalOpen] = useState(false);
  const [isFaultTypeModalOpen, setisFaultTypeModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductCategories());
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);
  return (
    <>
      <Modal
        visible={isCustomerModalOpen}
        onCancel={() => setisCustomerModalOpen(false)}
        title="Yeni Müşteri Ekle"
        footer={null}
      >
        <CustomerForm onSubmit={() => setisCustomerModalOpen(false)} />
      </Modal>
      <Modal
        visible={isFaultTypeModalOpen}
        onCancel={() => setisFaultTypeModalOpen(false)}
        title="Yeni Arıza Tipi Ekle"
        footer={null}
      >
        <FaultTypeCrud />
      </Modal>
      <Form
        form={form}
        scrollToFirstError
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
            loading={customersLoading}
            filterOption={(input, option: any) => {
              return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                  <Button type="link" size="middle" onClick={() => setisCustomerModalOpen(true)}>
                    <PlusOutlined /> Yeni Müşteri Ekle
                  </Button>
                </div>
              </div>
            )}
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
        <Form.Item label="Talep" name={["customer", "demand"]}>
          <TextArea />
        </Form.Item>

        <Divider plain orientation="left">
          Cihaz Bilgileri
        </Divider>

        {selectedProduct?.imgFile && (
          <Row justify="center" style={{ marginBottom: "1.5rem" }}>
            <Col>
              <img
                src={`https://fdn2.gsmarena.com/vv/bigpic/${selectedProduct.imgFile}`}
                height={150}
                width="auto"
              />
            </Col>
          </Row>
        )}

        <Form.Item label="Cihaz Seçiniz">
          <Input.Group compact>
            <Form.Item name={["device", "categoryId"]} noStyle>
              <Select
                style={{ width: "40%" }}
                placeholder="Cihaz Tipi"
                allowClear
                onSelect={(value: string) => {
                  setselectedProduct(undefined);
                  form.setFieldsValue({ device: { brandId: undefined, productId: undefined } });
                  dispatch(fetchBrandsByCategory(value));
                }}
                onClear={() => {
                  setselectedProduct(undefined);
                  form.setFieldsValue({ device: { brandId: undefined, productId: undefined } });
                  dispatch(resetBrands());
                  dispatch(resetProducts());
                }}
                loading={loading}
              >
                {categories.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={["device", "brandId"]} noStyle>
              <Select
                showSearch
                style={{ width: "30%" }}
                placeholder="Marka"
                loading={brandLoading}
                allowClear
                onSelect={(value: string) => {
                  form.setFieldsValue({ device: { productId: undefined } });
                  setselectedProduct(undefined);
                  dispatch(fetchProductsByBrand(value));
                }}
                onClear={() => {
                  setselectedProduct(undefined);
                  form.setFieldsValue({ device: { productId: undefined } });
                  dispatch(resetProducts());
                }}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {brands.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={["device", "productId"]} noStyle>
              <Select
                showSearch
                allowClear
                style={{ width: "30%" }}
                placeholder="Model"
                loading={productLoading}
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value: string) => setselectedProduct(products.find((p) => p._id === value))}
              >
                {products.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Imei/Seri Numarası" name={["device", "serialNumber"]}>
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
          <Select
            showSearch
            placeholder="Arızayı Seçiniz"
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
                <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                  <Button type="link" size="middle" onClick={() => setisFaultTypeModalOpen(true)}>
                    <PlusOutlined /> Yeni Arıza Tipi Ekle
                  </Button>
                </div>
              </div>
            )}
          >
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
          <Form.Item
            label="Toplam Ücret"
            name="totalCost"
            style={{ display: "inline-block", width: "120px" }}
          >
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
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            KAYDET
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ServiceForm;
