import { Form, Input, Button, Checkbox } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const SigninForm = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      size="large"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-posta"
        name="email"
        required={false}
        rules={[{ required: true, message: "Lütfen e-postanızı giriniz!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Parola"
        name="password"
        required={false}
        rules={[{ required: true, message: "Lütfen parolanızı giriniz!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Beni hatırla</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          GİRİŞ YAP
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
