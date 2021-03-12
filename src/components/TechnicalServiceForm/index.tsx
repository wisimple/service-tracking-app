import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Upload,
  Radio,
  Row,
  Col,
  InputNumber,
  message,
  Popconfirm,
  Popover,
} from "antd";
import {
  BorderInnerOutlined,
  DeleteFilled,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";

import { technicServiceStatusTypes, warrantyDurations } from "constants/index";

import { RootState } from "store";
import { fetchBrandsByCategory, resetBrands } from "store/brand/actions";
import { fetchProductCategories } from "store/productCategory/actions";
import { fetchProductsByBrand, resetProducts } from "store/product/actions";
import { fetchCustomers } from "store/customer/actions";
import Modal from "antd/lib/modal/Modal";
import CustomerForm from "components/CustomerForm";
import Avatar from "antd/lib/avatar/avatar";
import { getCustomerAvatarSrc, getDeviceImageUrl, isPatternLockString } from "helpers";
import FaultTypeCrud from "components/FaultTypeCrud";
import { fetchFaultTypes } from "store/faultType/actions";
import { TechnicalServiceDto } from "dto";
import {
  createTechnicalService,
  deleteTechnicalService,
  getTechnicalServicesLastTrackingId,
  updateTechnicalService,
} from "store/technicalService/actions";
import { useHistory } from "react-router";
import { ITechicalService } from "interfaces";
import PasswordPattern from "components/PasswordPattern";

const { TextArea } = Input;

interface Props {
  data?: ITechicalService;
}

const ServiceForm = ({ data }: Props) => {
  const { categories, loading } = useSelector((state: RootState) => state.productCategoryState);
  const { brands, loading: brandLoading } = useSelector((state: RootState) => state.brandState);
  const { products, loading: productLoading } = useSelector((state: RootState) => state.productState);
  const { customers, loading: customersLoading } = useSelector((state: RootState) => state.customerState);
  const { faultTypes, loading: faultLoading } = useSelector((state: RootState) => state.faultTypeState);
  const {
    cloading: serviceCreateLoading,
    uloading: serviceUpdateLoading,
    dloading: serviceDeleteLoading,
    lastTrackingId,
  } = useSelector((state: RootState) => state.servicesState);

  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const [productImageFileName, setproductImageFileName] = useState<string | undefined>();
  const [isCustomerModalOpen, setisCustomerModalOpen] = useState(false);
  const [isFaultTypeModalOpen, setisFaultTypeModalOpen] = useState(false);
  const [showDeviceName, setshowDeviceName] = useState(false);
  const [isPatternPopOpen, setisPatternPopOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFaultTypes());
    dispatch(fetchCustomers());
    dispatch(fetchProductCategories());
  }, []);

  useEffect(() => {
    if (data) {
      console.log("data var");

      const { device, customerId, faultTypeId } = data;
      form.resetFields();
      form.setFieldsValue({
        ...data,
        customerId: customerId?._id,
        device: {
          categoryId: device?.categoryId,
          brandId: device?.brandId?._id,
          productId: device?.productId?._id,
          serialNumber: device?.serialNumber,
          passOrPattern: device?.passOrPattern,
          customName: device?.customName,
        },
        faultTypeId: faultTypeId?.map((fT) => fT._id),
      });
      if (device?.categoryId) {
        dispatch(fetchBrandsByCategory(device?.categoryId));
      }
      if (device?.brandId) {
        dispatch(fetchProductsByBrand(device?.brandId._id));
      }
      if (device?.productId?.imgFile) {
        setproductImageFileName(device.productId.imgFile);
      } else {
        setproductImageFileName(undefined);
      }
      if (device?.customName) {
        setshowDeviceName(true);
      } else {
        setshowDeviceName(false);
      }
    } else {
      dispatch(getTechnicalServicesLastTrackingId());
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      form.setFieldsValue({ trackingId: lastTrackingId + 1 });
    }
  }, [lastTrackingId]);

  const handleOnSubmit = async (values: TechnicalServiceDto) => {
    if (data) {
      await dispatch(updateTechnicalService(data._id, values));
      message.success("Teknik Servis işlemi başarıyla güncellendi");
    } else {
      await dispatch(createTechnicalService(values));
      message.success("Teknik Servis işlemi başarıyla oluşturuldu");
    }
    history.goBack();
  };

  const handleOnDelete = async () => {
    if (data) {
      await dispatch(deleteTechnicalService(data._id));
      message.success("Teknik Servis işlemi başarıyla silindi");
    }
    history.goBack();
  };

  const toggleShowDeviceName = () => {
    if (showDeviceName) {
      form.setFieldsValue({ device: { customName: undefined } });
    } else {
      form.setFieldsValue({ device: { categoryId: undefined, brandId: undefined, productId: undefined } });
      dispatch(resetBrands());
      dispatch(resetProducts());
      setproductImageFileName(undefined);
    }
    setshowDeviceName((show) => !show);
  };

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
        labelCol={{ md: 6, xl: 4 }}
        wrapperCol={{ md: 18, xl: 16 }}
        onFinish={handleOnSubmit}
      >
        <Form.Item label="Teknik Servis Takip No" name="trackingId">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Müşteri">
          <Row gutter={8}>
            <Col xs={24} md={18}>
              <Form.Item
                name="customerId"
                required
                rules={[{ required: true, message: "Lütfen müşteri seçiniz" }]}
              >
                <Select
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
        <Form.Item label="Talep" name="demand">
          <TextArea />
        </Form.Item>

        <Divider orientation="left" style={{ paddingTop: 30 }}>
          Cihaz Bilgileri
        </Divider>

        {productImageFileName && (
          <Row justify="center" style={{ marginBottom: "1.5rem" }}>
            <Col>
              <img src={getDeviceImageUrl(productImageFileName)} height={150} width="auto" />
            </Col>
          </Row>
        )}

        <Form.Item label="Cihaz Seçiniz">
          <Input.Group compact>
            {showDeviceName ? (
              <Form.Item name={["device", "customName"]}>
                <Input placeholder="Cihaz İsmi" />
              </Form.Item>
            ) : (
              <>
                <Form.Item name={["device", "categoryId"]} noStyle>
                  <Select
                    style={{ width: "40%" }}
                    placeholder="Cihaz Tipi"
                    allowClear
                    onSelect={(value: string) => {
                      setproductImageFileName(undefined);
                      form.setFieldsValue({ device: { brandId: undefined, productId: undefined } });
                      dispatch(fetchBrandsByCategory(value));
                    }}
                    onClear={() => {
                      setproductImageFileName(undefined);
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
                      setproductImageFileName(undefined);
                      dispatch(fetchProductsByBrand(value));
                    }}
                    onClear={() => {
                      setproductImageFileName(undefined);
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
                    onChange={(value: string) =>
                      setproductImageFileName(products.find((p) => p._id === value)?.imgFile || undefined)
                    }
                  >
                    {products.map((item) => (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item noStyle>
              <Button type="link" onClick={toggleShowDeviceName}>
                {showDeviceName ? "Kategoriden Seç" : "Farkli bir cihaz gir"}
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label="Imei / Seri No" name={["device", "serialNumber"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Cihaz Parolası" name={["device", "passOrPattern"]}>
          <Input
            addonAfter={
              <Popover
                title="Desen Oluştur"
                trigger="click"
                visible={isPatternPopOpen}
                onVisibleChange={(show) => setisPatternPopOpen(show)}
                content={
                  <>
                    {isPatternPopOpen && (
                      <>
                        <PasswordPattern
                          initialPattern={
                            data?.device?.passOrPattern && isPatternLockString(data.device.passOrPattern)
                              ? data.device.passOrPattern
                              : undefined
                          }
                          onChange={(pattern) =>
                            form.setFieldsValue({ device: { passOrPattern: pattern.toString() } })
                          }
                        />
                        <Row justify="end" style={{ marginTop: 10 }}>
                          <Col>
                            <Button size="small" onClick={() => setisPatternPopOpen(false)}>
                              Tamam
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                }
              >
                <Button type="link" size="middle" icon={<BorderInnerOutlined />}>
                  Desen gir
                </Button>
              </Popover>
            }
          />
        </Form.Item>

        <Form.Item label="Cihaz Resimleri" name={["device", "image"]}>
          <Upload name="images[]" listType="picture" fileList={[]} multiple>
            <Button icon={<UploadOutlined />} size="middle" disabled>
              Resimleri Çek veya Seç
            </Button>
          </Upload>
        </Form.Item>

        <Divider orientation="left" style={{ paddingTop: 30 }}>
          Servis Bilgileri
        </Divider>

        <Form.Item label="Durum" name="status" initialValue={3}>
          <Radio.Group buttonStyle="solid" size="middle">
            {technicServiceStatusTypes.map((item) => (
              <Radio.Button key={item.value} value={item.value} style={{ marginBottom: "6px" }}>
                {item.text}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Arıza Tipleri">
          <Row gutter={8}>
            <Col xs={24} md={16}>
              <Form.Item name="faultTypeId">
                <Select
                  mode="multiple"
                  showSearch
                  allowClear
                  placeholder="Arızayı Seçiniz"
                  loading={faultLoading}
                  filterOption={(input, option: any) => {
                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }}
                >
                  {faultTypes.map((item) => (
                    <Select.Option key={item._id} value={item._id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item>
                <Button
                  type="dashed"
                  size="middle"
                  shape="round"
                  onClick={() => setisFaultTypeModalOpen(true)}
                >
                  <PlusOutlined /> Yeni Arıza Tipi Ekle
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Yapılan İşlemler / Açıklama" name="desc">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Verilen Garanti Süresi" name="warrantyDays" initialValue={0}>
          <Select placeholder="Garanti Süresini Seçiniz">
            {warrantyDurations.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Divider orientation="left" style={{ paddingTop: 30 }}>
          Ücret Bilgileri
        </Divider>

        <Form.Item wrapperCol={{ md: { offset: 4 } }} style={{ marginBottom: 0 }}>
          <Form.Item
            label="Toplam Ücret"
            name="totalCost"
            style={{ display: "inline-block", width: "120px" }}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Ödenen Ücret"
            name="paidAmount"
            style={{ display: "inline-block", width: "120px", marginLeft: "8px" }}
          >
            <InputNumber />
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ md: { offset: 4 } }}>
          {data ? (
            <Row justify="space-between">
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={serviceUpdateLoading}
                  disabled={serviceUpdateLoading}
                >
                  GÜNCELLE
                </Button>
              </Col>
              <Col>
                <Popconfirm
                  title="Bu işlem geri alınamaz, silmek istediğinizden emin misiniz?"
                  onConfirm={handleOnDelete}
                  okText="Evet"
                  cancelText="Vazgeç"
                >
                  <Button danger icon={<DeleteFilled />} loading={serviceDeleteLoading}>
                    KAYDI SİL
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              disabled={serviceCreateLoading}
              loading={serviceCreateLoading}
            >
              KAYDET
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default ServiceForm;
