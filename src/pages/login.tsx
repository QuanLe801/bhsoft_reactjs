/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, notification } from 'antd';
import type { FormProps } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/rootReducer';
import Typography from 'typography/typography';
import { FieldType } from 'types/LoginInterface';
import { useNavigate } from 'react-router-dom';
import { login } from 'actions/userActions';

const StyledFormItem = styled(Form.Item<FieldType>)`
  .ant-form-item-required {
    font-family: Lato;
  }
`;

const StyledLoginContainer = styled.section`
  width: 100%;
  max-width: 300px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  margin-top: 100px;
  border: 1px solid black;
`;

export default function Login() {
  const dispatch = useDispatch();
  const { data, loading, message } = useSelector(
    (state: RootState) => state.user,
  );
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    dispatch<any>(
      login({
        username: values.username as string,
        password: values.password as string,
      }),
    );
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    api.error({
      message: 'Something went wrong!',
    });
  };

  if (data) {
    navigate('/');
  }

  return (
    <StyledLoginContainer>
      {contextHolder}
      <Typography align="center" className="mb-3">
        Login
      </Typography>
      <Typography variant="h4" className="text-secondary">
        Use this for account testing
      </Typography>
      <Typography variant="h5" className="text-secondary">
        Username: emilys
      </Typography>
      <Typography variant="h5" className="text-secondary">
        Pass: emilyspass
      </Typography>
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <StyledFormItem
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Enter username" />
        </StyledFormItem>

        <StyledFormItem
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </StyledFormItem>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            <Typography className="mb-0">Login</Typography>
          </Button>
        </Form.Item>
      </Form>
      {message && (
        <Typography variant="h3" align="center">
          {message}
        </Typography>
      )}
    </StyledLoginContainer>
  );
}
