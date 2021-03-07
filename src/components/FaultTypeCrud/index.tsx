import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table } from "antd";
import { FaultTypeDto } from "dto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

import { createFaultType, deleteFaultType } from "store/faultType/actions";

const { Column } = Table;

const FaultTypeCrud = () => {
  const { faultTypes, loading, cLoading, dLoading } = useSelector((state: RootState) => state.faultTypeState);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleSubmit = async (values: FaultTypeDto) => {
    await dispatch(createFaultType(values));
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="inline" onFinish={handleSubmit}>
        <Form.Item
          style={{ flexGrow: 1 }}
          name="name"
          required
          rules={[{ required: true, message: "Lütfen arıza tipini giriniz" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={cLoading}>
            Ekle
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={faultTypes} loading={loading} pagination={false} rowKey="_id">
        <Column title="Arıza Tipi" dataIndex="name" key="name" render={(a) => <Input value={a} />} />
        <Column
          title="İşlem"
          render={(a) => (
            <Button
              size="small"
              icon={<DeleteOutlined />}
              danger
              onClick={() => dispatch(deleteFaultType(a._id))}
            >
              Sil
            </Button>
          )}
        />
      </Table>
    </>
  );
};

export default FaultTypeCrud;
