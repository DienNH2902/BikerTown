import { Form, Input, Button, App } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useState } from "react";
import HamsterLoading from "../../components/Loading/HamsterLoading";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message: antdMessage } = App.useApp();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
  
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const data = response.data;
  
      // Assuming success if no error is thrown
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data.username);
      window.dispatchEvent(new Event("user-login"));
      antdMessage.success("Login successful!");
      form.resetFields();
      navigate("/");
    } catch (error) {
      if (error.response) {
        antdMessage.error(error.response.data.message || "Invalid credentials. Please try again.");
      } else {
        antdMessage.error("Login error: " + error.message);
      } 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <HamsterLoading />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <Form form={form} layout="vertical" onFinish={handleLoginSubmit}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <div className="form-footer">
            Don't have an account? <a href="/register">Register now</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
