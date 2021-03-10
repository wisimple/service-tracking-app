import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "store/user/actions";
import { UserSigninDto } from "dto";
import { RootState } from "store";

const SigninForm = () => {
  const dispatch = useDispatch();
  const { signinLoading, signinErrorMessage } = useSelector((state: RootState) => state.userState);

  const onFinish = (values: UserSigninDto) => {
    dispatch(signinUser(values));
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      size="large"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Lütfen e-posta adresinizi giriniz!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="E-posta adresiniz"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Lütfen parolanızı giriniz!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Parolanız"
        />
      </Form.Item>
      {signinErrorMessage && (
        <Form.Item>
          <Alert message={signinErrorMessage} type="error" showIcon />
        </Form.Item>
      )}
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Beni hatırla</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Parolamı unuttum
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={signinLoading}>
          GİRİŞ YAP
        </Button>
        {/* Or <a href="">register now!</a> */}
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
