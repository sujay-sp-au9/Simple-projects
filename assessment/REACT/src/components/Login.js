import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';
import { Form, Input, Button, Typography } from 'antd';

import { getInitialUserData, logout } from '../redux/actions/auth';

import { apiURL } from '../utils/globalUrls';

const { Title } = Typography;

const Login = () => {
  const [tokenState, SetTokenState] = React.useState(
    localStorage.getItem('AuthIdToken')
  );
  const [form] = Form.useForm();
  const handleOnSubmit = () => {
    Axios({
      method: 'POST',
      url: `${apiURL}/users/login`,
      data: form.getFieldsValue(['email', 'password']),
      withCredentials: true,
    }).then((res) => console.log(res));
  };
  React.useEffect(() => {
    if (tokenState) {
      const decodedToken = JwtDecode(tokenState);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        window.location.href = '';
      } else {
        getInitialUserData(decodedToken._id, tokenState);
      }
    }
  }, [tokenState]);
  return (
    <div style={{ minWidth: '50vw', maxWidth: '100vw' }}>
      <Title level={3}>Login</Title>
      <Form form={form} onFinish={handleOnSubmit} layout="vertical">
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please Enter your Email',
            },
            () => ({
              validator(rule, value) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!value || re.test(String(value))) {
                  return Promise.resolve();
                }
                return Promise.reject('Invalid E-mail');
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please Enter Password' }]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => {
            console.log();
            return (
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
                size="large"
              >
                Submit
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(null, { getInitialUserData, logout })(Login);
