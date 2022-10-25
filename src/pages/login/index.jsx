import React, { RefObject, useEffect } from "react";
import { Form, Input, Button, Toast } from "antd-mobile";
import { login } from "../../api/public";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { useState } from "react";
import { _get } from "../../server/http";

function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(true);
  const [sendCoded, setSendCoded] = useState(false); //是否已发送验证码
  let [count, setCount] = useState(60); //倒计时
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isLogin();
    // getTicket();
    setIsMobile(isMobileF());
  }, []);

  const isLogin = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      // let { success } = await tokenCheck({ token });
      // if (success) {
      //   navigate("/");
      // }
      // navigate("/");
    }
  };

  const isMobileF = () => {
    let flag =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    console.log(navigator.userAgent);
    return flag;
  };

  const onSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    setLoading(true);
    let { success, data, message } = await login(values);
    if (success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      Toast.show(message);
    }
    setLoading(false);
  };

  return (
    <div className="login-contain">
      <div
        className="title"
        style={{
          padding: isMobile ? "20% 0" : "5% 0",
        }}
      >
        <h1>宁波市地表水环境监测平台</h1>
        <p>第四方运维检查</p>
      </div>

      <Form
        layout="horizontal"
        mode="card"
        form={form}
        footer={
          <Button
            block
            color="primary"
            onClick={onSubmit}
            size="large"
            loading={loading}
          >
            提交
          </Button>
        }
      >
        <Form.Item name="name">
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password">
          <Input placeholder="密码" type="password" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
