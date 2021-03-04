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
      url: `${apiURL}/users/signup`,
      data: form.getFieldsValue(['email', 'newPassword', 'passwordConfirm']),
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
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please Enter new Password' },
            { min: 8, message: 'At least 8 characters' },
            () => ({
              validator(rule, value) {
                if (!value || /\d/.test(value) || value.length < 8) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'New password must contain atleast 1 number'
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="new password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordConfirm"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'New Password and Confirm Password does not match'
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm Password" />
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
