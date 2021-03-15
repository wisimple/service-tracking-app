import { useEffect, useState } from "react";
import { Col, Row, Avatar, Card, Form, Select, Button, Modal, Divider, Table, message } from "antd";
import { CloseCircleOutlined, DropboxOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { fetchCustomers } from "store/customer/actions";

import { getCustomerAvatarSrc } from "helpers";
import CustomerForm from "components/CustomerForm";
import { getUserProducts } from "store/userProducts/actions";
import { IBasketProduct } from "interfaces";
import Money from "components/Money";
import { generateUId } from "helpers";

const { Column } = Table;

const Create = () => {
  const dispatch = useDispatch();
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);
  const { products, loading } = useSelector((state: RootState) => state.userProducts);

  const [isCustomerModalOpen, setisCustomerModalOpen] = useState(false);

  const [basket, setBasket] = useState<Array<IBasketProduct>>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(getUserProducts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const add2Basket = (productIndex: number) => {
    const p = products.find((_, index) => index === productIndex);
    if (p) {
      message.success(`Listeye 1 adet "${p.name}" ürünü eklendi`);
      setBasket((prev) => [
        ...prev,
        {
          _id: generateUId(),
          name: p.name,
          productId: p._id,
          price: p.sPrice || 0,
          count: 1,
          totalPrice: p.sPrice || 0,
        },
      ]);
    }
  };

  const removeFromBasket = (_id: string) => {
    setBasket((prev) => prev.filter((item, index) => item._id !== _id));
  };

  const setBasketItemPrice = (_id: string, value: string) => {
    setBasket((prev) =>
      prev.map((item, index) =>
        item._id === _id
          ? { ...item, price: parseInt(value), totalPrice: (parseInt(value) || 0) * item.count }
          : item
      )
    );
  };

  const setBasketItemCount = (_id: string, value: string) => {
    setBasket((prev) =>
      prev.map((item, index) =>
        item._id === _id
          ? { ...item, count: parseInt(value), totalPrice: (parseInt(value) || 0) * item.price }
          : item
      )
    );
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const basketTotal = basket.reduce((total, item) => item.totalPrice + total, 0);
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
          labelCol={{ md: 3, xl: 3 }}
          wrapperCol={{ md: 21, xl: 16 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Müşteri">
            <Row gutter={8}>
              <Col xs={24} md={18}>
                <Form.Item
                  required
                  name="customerId"
                  rules={[{ required: true, message: "Lütfen bir müşteri seçiniz!" }]}
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

          <Form.Item label="Listeye Ürün Ekle" name="a">
            <Select
              showSearch
              allowClear
              loading={loading}
              filterOption={(input, option: any) => {
                return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              }}
              onSelect={(_id, item) => {
                add2Basket(item.index);
                form.setFieldsValue({ a: "" });
              }}
            >
              {products.map((_, i) => (
                <Select.Option key={_._id} value={_._id} name={_.name} index={i}>
                  {_.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Table<IBasketProduct>
            style={{ marginBottom: 20 }}
            dataSource={basket}
            pagination={false}
            rowKey="_id"
            summary={() => {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={1} colSpan={3} align="right">
                      <strong>Toplam Tutar</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">
                      <Money amount={basketTotal} size="large" color="green" />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          >
            <Column dataIndex="name" title="Ürün" />
            <Column<IBasketProduct>
              dataIndex="price"
              title="Fiyat"
              render={(price, item) => (
                <input
                  onSubmit={(e) => e.preventDefault()}
                  className="input"
                  type="number"
                  value={price}
                  onChange={({ target }) => setBasketItemPrice(item._id, target.value)}
                />
              )}
            />
            <Column<IBasketProduct>
              title="Adet"
              dataIndex="count"
              render={(count, item) => (
                <input
                  className="input"
                  type="number"
                  value={count}
                  onChange={({ target }) => setBasketItemCount(item._id, target.value)}
                />
              )}
            />
            <Column
              align="right"
              title="Toplam Fiyat"
              dataIndex="totalPrice"
              render={(totalPrice) => <Money amount={totalPrice} />}
            />
            <Column<IBasketProduct>
              render={(_, p) => (
                <Button
                  size="small"
                  type="text"
                  icon={<CloseCircleOutlined style={{ color: "red" }} />}
                  onClick={() => removeFromBasket(p._id)}
                >
                  Sil
                </Button>
              )}
            />
          </Table>
          <Form.Item wrapperCol={{ offset: 3 }}>
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
