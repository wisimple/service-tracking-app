import { Button, Form, Input, Table } from "antd";

const { Column } = Table;

const FaultTypeCrud = () => {
  return (
    <>
      <Form layout="inline">
        <Form.Item style={{ flexGrow: 1 }}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </Form.Item>
      </Form>
      <Table></Table>
    </>
  );
};

export default FaultTypeCrud;
