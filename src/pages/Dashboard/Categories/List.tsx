import { useState } from "react";
import { ClusterOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { List, Button, Typography, Col, Row, Modal } from "antd";
import CategoryForm from "components/CategoryForm";
import { ICategory } from "interfaces";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { getUserCategories, getUserCategory } from "store/productCategory/actions";

const { Title } = Typography;

const CategoryList = () => {
  const dispatch = useDispatch();
  const { userCategories, loading, gloading, userCategory } = useSelector(
    (state: RootState) => state.productCategoryState
  );
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getUserCategories());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ backgroundColor: "white" }}>
      <Modal
        title="Yeni Kategori Ekle"
        visible={isModalVisible}
        onCancel={() => setisModalVisible(false)}
        footer={null}
      >
        <CategoryForm onSuccess={() => setisModalVisible(false)} />
      </Modal>

      <Modal
        visible={isEditModalVisible}
        title="Kategoriyi Düzenle"
        onCancel={() => setisEditModalVisible(false)}
        footer={null}
      >
        <CategoryForm data={userCategory} loading={gloading} onSuccess={() => setisEditModalVisible(false)} />
      </Modal>

      <List<ICategory>
        loading={loading}
        size="large"
        header={
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>
                <ClusterOutlined /> Kategorilerim
              </Title>
            </Col>
            <Col>
              <Button type="primary" onClick={() => setisModalVisible(true)}>
                <PlusOutlined /> Yeni Kategori Ekle
              </Button>
            </Col>
          </Row>
        }
        dataSource={userCategories}
        bordered
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={item.showOnServices ? "Teknik Servis İşlemlerinde görünüyor" : ""}
            />
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => {
                dispatch(getUserCategory(item._id));
                setisEditModalVisible(true);
              }}
            >
              Düzenle
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryList;
