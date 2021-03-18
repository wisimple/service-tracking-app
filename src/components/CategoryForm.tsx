import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Form, Input, Button, message, Spin, Row, Col, Popconfirm, Checkbox } from "antd";
import { CategoryDto } from "dto";
import { ICategory } from "interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { createUserCategory, deleteUserCategory, updateUserCategory } from "store/productCategory/actions";

interface Props {
  onSuccess?: () => void;
  data?: ICategory;
  loading?: boolean;
}

const CategoryForm = ({ onSuccess = () => {}, data, loading = false }: Props) => {
  const { cloading, uloading, dloading } = useSelector((state: RootState) => state.productCategoryState);
  const dispatch = useDispatch();
  const [showChecked, setshowChecked] = useState(false);

  const [form] = Form.useForm();

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setshowChecked(e.target.checked);
    form.setFieldsValue({ showOnServices: e.target.checked });
  };

  const handleSubmit = async (values: CategoryDto) => {
    if (data) {
      await dispatch(updateUserCategory(data._id, values));
    } else {
      await dispatch(createUserCategory(values));
    }

    message.success(`${values.name} kategorisi başarıyla ${data ? "güncellendi" : "oluşturuldu"}.`);
    // form.resetFields();
    onSuccess();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setshowChecked(data.showOnServices ? true : false);
    }
  }, [data, form]);

  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Kategori İsmi"
          name="name"
          required
          rules={[{ required: true, message: "Lütfen kategori ismini giriniz!" }]}
        >
          <Input autoFocus />
        </Form.Item>

        <Form.Item name="showOnServices">
          <Checkbox checked={showChecked} onChange={onCheckboxChange}>
            Bu kategori Teknik Servis İşlemlerinde Görünsün
          </Checkbox>
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
                    await dispatch(deleteUserCategory(data._id));
                    message.success("Kategori başarıyla silindi");
                    onSuccess();
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

export default CategoryForm;
