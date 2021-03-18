import { SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Spin, Row, Col, Popconfirm, message } from "antd";
import { BrandDto } from "dto";
import { IBrandData } from "interfaces";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { createUserBrand, deleteUserBrand, getUserBrands, updateUserBrand } from "store/brand/actions";
import { getUserCategories } from "store/productCategory/actions";

interface Props {
  data?: IBrandData;
  onSubmitSuccess?: () => void;
}

const BrandForm = ({ onSubmitSuccess = () => {}, data }: Props) => {
  const { userCategories } = useSelector((state: RootState) => state.productCategoryState);
  const { cloading, dloading, uloading, gloading } = useSelector((state: RootState) => state.brandState);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCategories());
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const handleSubmit = async (values: BrandDto) => {
    if (data) {
      await dispatch(updateUserBrand(data._id, values));
      dispatch(getUserBrands());
      message.success(`${values.name} kategorisi başarıyla güncellendi`);
    } else {
      await dispatch(createUserBrand(values));
      message.success(`${values.name} kategorisi başarıyla oluşturuldu`);
    }
    onSubmitSuccess();
  };

  return (
    <Spin spinning={gloading}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Kategori Seçiniz"
          name="catId"
          required
          rules={[{ required: true, message: "Lütfen bir kategori seçiniz" }]}
        >
          <Select>
            {userCategories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Marka Adı"
          name="name"
          required
          rules={[{ required: true, message: "Lütfen bir marka giriniz" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          {data ? (
            <Row justify="space-between">
              <Col>
                <Button type="primary" htmlType="submit" loading={uloading} icon={<SaveOutlined />}>
                  GÜNCELLE
                </Button>
              </Col>
              <Col>
                <Popconfirm
                  title="Bu işlem geri alınamaz, silmek istediğinizden emin misiniz?"
                  okText="Sil"
                  cancelText="Vazgeç"
                  onConfirm={async () => {
                    await dispatch(deleteUserBrand(data._id));
                    message.success("Kategori başarıyla silindi");
                    onSubmitSuccess();
                  }}
                >
                  <Button danger icon={<DeleteOutlined />} loading={dloading}>
                    SİL
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          ) : (
            <Button type="primary" htmlType="submit" loading={cloading} icon={<SaveOutlined />}>
              KAYDET
            </Button>
          )}
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BrandForm;
