import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Button, Typography, List, Modal, Spin } from "antd";
import BrandForm from "components/BrandForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getUserBrand, getUserBrands } from "store/brand/actions";

const { Title } = Typography;

const BrandList = () => {
  const { userCategoriesWithBrands, loading, userBrand } = useSelector(
    (state: RootState) => state.brandState
  );
  const dispatch = useDispatch();

  const [isModalOpen, setisModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserBrands());
  }, []);

  return (
    <>
      <Modal
        title="Yeni Marka Oluştur"
        footer={null}
        visible={isModalOpen}
        onCancel={() => setisModalOpen(false)}
      >
        <BrandForm onSubmitSuccess={() => setisModalOpen(false)} />
      </Modal>
      <Modal
        title="Markayı Düzenle"
        footer={null}
        visible={isEditModalOpen}
        onCancel={() => setisEditModalOpen(false)}
      >
        <BrandForm data={userBrand} onSubmitSuccess={() => setisEditModalOpen(false)} />
      </Modal>
      <Row justify="space-between">
        <Col>
          <Title level={3}>Markalarım</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setisModalOpen(true)}>
            Yeni Marka Ekle
          </Button>
        </Col>
      </Row>

      <Spin spinning={loading} style={{ minHeight: "50vh" }}>
        <Row gutter={[12, 12]}>
          {userCategoriesWithBrands.map((category) => (
            <Col key={category._id} sm={24}>
              <List
                style={{ backgroundColor: "#fff" }}
                header={
                  <>
                    <Title level={4}>{category.name}</Title>
                    {category.showOnServices && (
                      <span>Bu kategori ve markalar teknik servis işlemlerinde görünüyor</span>
                    )}
                  </>
                }
                bordered
                dataSource={category.brands}
                renderItem={(brand) => (
                  <List.Item>
                    <List.Item.Meta title={brand.name} />
                    <Button
                      type="dashed"
                      icon={<EditOutlined />}
                      onClick={() => {
                        dispatch(getUserBrand(brand._id));
                        setisEditModalOpen(true);
                      }}
                    >
                      Düzenle
                    </Button>
                  </List.Item>
                )}
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default BrandList;
