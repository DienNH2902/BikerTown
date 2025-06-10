import { useState, useEffect } from "react";
import {
  Typography,
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Divider,
  DatePicker,
  Select,
  Avatar,
  Upload,
  Tabs,
  Space,
  App,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CarOutlined,
  UploadOutlined,
  LockOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./Profile.css";
import vietnamData from "../../Data/VietnamCitiesData.json";
import axios from "axios";
import HamsterLoading from "../../components/Loading/HamsterLoading";

import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("TP. Hồ Chí Minh");
  const { message } = App.useApp();
  const navigate = useNavigate();

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Optional: show loading while fetching

        const local = localStorage.getItem("user");
        const token = JSON.parse(local).token;

        const response = await axios.get("http://localhost:8000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUserData(userData);

        // Set form values using real data
        form.setFieldsValue({
          username: userData.user.username,
          display_name: userData.user.display_name,
          gender: userData.user.gender,
          dob: dayjs(userData.user.dob),
          vehicle: userData.user.vehicle,
          phone: userData.user_contact.phone,
          email: userData.user_contact.email,
          address: userData.user_contact.address,
          district: userData.user_contact.district,
          city: userData.user_contact.city,
        });

        // Update selectedCity state so that district list matches the saved city
        setSelectedCity(userData.user_contact.city);
      } catch (error) {
        console.error("Error fetching user data:", error);

        if (error.response && error.response.status == 401) {
          console.log("Token is invalid.");
          message.error("Session expired");
          navigate("/login");
        }

        setTimeout(() => {
          message.error("Failed to load profile data");
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [form, message, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue({
      username: userData.user.username,
      display_name: userData.user.display_name,
      gender: userData.user.gender,
      dob: dayjs(userData.user.dob),
      vehicle: userData.user.vehicle,
      phone: userData.user_contact.phone,
      email: userData.user_contact.email,
      address: userData.user_contact.address,
      district: userData.user_contact.district,
      city: userData.user_contact.city,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (values) => {
    // In a real app, you would send this data to your API
    console.log("Updated profile data:", values);

    const formData = new FormData();
    formData.append("display_name", values.display_name);
    formData.append("gender", values.gender);
    formData.append("dob", values.dob.format("YYYY-MM-DD"));
    formData.append("vehicle", values.vehicle);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("district", values.district);
    formData.append("city", values.city);

    const local = localStorage.getItem("user");
    const token = JSON.parse(local).token;

    try {
      const response = await axios.post(
        "http://localhost:8000/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct header
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response
      if (response.status === 200) {
        // Update client view with updated data
        const response = await axios.get("http://localhost:8000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setUserData(userData);

        // Set form values using real data
        form.setFieldsValue({
          username: userData.user.username,
          display_name: userData.user.display_name,
          gender: userData.user.gender,
          dob: dayjs(userData.user.dob),
          vehicle: userData.user.vehicle,
          phone: userData.user_contact.phone,
          email: userData.user_contact.email,
          address: userData.user_contact.address,
          district: userData.user_contact.district,
          city: userData.user_contact.city,
        });

        setIsEditing(false);
        message.success("Profile updated successfully!");
      }
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
      if (error.response) {
        message.error(`Server responded with error: ${error.response.status}`);
      } else {
        message.error(`Server is irreponsive.`);
      }
    }
  };

  // Handle password change
  const handlePasswordChange = async (values) => {
    // In a real app, you would send this data to your API
    const local = localStorage.getItem("user");
    const token = JSON.parse(local).token;

    const formData = new FormData();
    formData.append("current_pwd", values.currentPassword);
    formData.append("new_pwd", values.newPassword);
    formData.append("cf_new_pwd", values.confirmPassword);

    try {
      const res = await axios.post(
        "http://localhost:8000/update-password",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct header
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        message.success("Password changed successfully!");
        passwordForm.resetFields();
      }
    } catch (error) {
      // Handle the error
      console.error("Error:", error);
      if (error.response) {
        message.error(
          `Server responded with error: ${error.response.status} - ${error.response.data.detail}`
        );
      } else {
        message.error(`Server is irreponsive.`);
      }
    }
  };

  if (loading) {
    return <HamsterLoading />;
  }

  return (
    <div className="profile-container">
      <Title level={2}>My Profile</Title>
      <Paragraph className="profile-description">
        View and manage your personal information and preferences.
      </Paragraph>

      <Tabs
        defaultActiveKey="1"
        className="profile-tabs"
        items={[
          {
            key: "1",
            label: (
              <span>
                <UserOutlined />
                Profile Information
              </span>
            ),
            children: (
              <Card
                title={
                  <div className="profile-card-header">
                    <span>Personal Details</span>
                    {!isEditing ? (
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                          type="primary"
                          icon={<SaveOutlined />}
                          onClick={form.submit}
                        >
                          Save Changes
                        </Button>
                      </Space>
                    )}
                  </div>
                }
              >
                <Row gutter={[24, 0]}>
                  <Col xs={24} md={6} className="profile-avatar-col">
                    <Avatar
                      size={120}
                      icon={<UserOutlined />}
                      src="https://i.pinimg.com/564x/91/1b/88/911b881dd6f2e2e4a55838bf0072bdc1.jpg"
                      className="profile-avatar"
                    />
                    {isEditing && (
                      <Upload>
                        <Button
                          icon={<UploadOutlined />}
                          className="upload-button"
                        >
                          Change Photo
                        </Button>
                      </Upload>
                    )}
                    <Divider />
                    <Paragraph className="member-info">
                      <strong>Member Since:</strong>
                      <br />
                      {dayjs(userData.created_date).format("MMMM D, YYYY")}
                    </Paragraph>
                  </Col>

                  <Col xs={24} md={18}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                      disabled={!isEditing}
                      initialValues={{
                        username: userData.user.username,
                        display_name: userData.user.display_name,
                        gender: userData.user.gender,
                        dob: dayjs(userData.user.dob),
                        vehicle: userData.user.vehicle,
                        phone: userData.user_contact.phone,
                        email: userData.user_contact.email,
                        address: userData.user_contact.address,
                        district: userData.user_contact.district,
                        city: userData.user_contact.city,
                      }}
                    >
                      <Divider
                        style={{ marginBottom: 30, color: "brown" }}
                        orientation="left"
                      >
                        User Information
                      </Divider>
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your username",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Username"
                              disabled
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="display_name"
                            label="Display Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your display name",
                              },
                            ]}
                          >
                            <Input
                              prefix={<UserOutlined />}
                              placeholder="Display Name"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item name="gender" label="Gender">
                            <Select placeholder="Select gender">
                              <Option value={true}>Male</Option>
                              <Option value={false}>Female</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="dob"
                            label="Date of Birth"
                            rules={[
                              {
                                required: true,
                                message: "Please select your date of birth",
                              },
                            ]}
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              format="YYYY-MM-DD"
                              placeholder="Select date"
                              suffixIcon={<CalendarOutlined />}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="vehicle"
                        label="Motorcycle"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your motorcycle model",
                          },
                        ]}
                      >
                        <Input
                          prefix={<CarOutlined />}
                          placeholder="Motorcycle Model"
                        />
                      </Form.Item>

                      <Divider
                        style={{ marginBottom: 30, color: "brown" }}
                        orientation="left"
                      >
                        Contact Information
                      </Divider>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your email",
                              },
                              {
                                type: "email",
                                message: "Please enter a valid email",
                              },
                            ]}
                          >
                            <Input
                              prefix={<MailOutlined />}
                              placeholder="Email"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your phone number",
                              },
                            ]}
                          >
                            <Input
                              prefix={<PhoneOutlined />}
                              placeholder="Phone Number"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input
                          prefix={<HomeOutlined />}
                          placeholder="Address"
                        />
                      </Form.Item>

                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="city"
                            label="City"
                            rules={[
                              {
                                required: true,
                                message: "Please select your city",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select a city"
                              onChange={(value) => setSelectedCity(value)}
                              prefix={<EnvironmentOutlined />}
                            >
                              {vietnamData.map((city) => (
                                <Option key={city.name} value={city.name}>
                                  {city.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="district"
                            label="District"
                            rules={[
                              {
                                required: true,
                                message: "Please select your district",
                              },
                            ]}
                          >
                            <Select placeholder="Select a district">
                              {selectedCity &&
                                vietnamData
                                  .find((city) => city.name === selectedCity)
                                  ?.districts.map((district) => (
                                    <Option key={district} value={district}>
                                      {district}
                                    </Option>
                                  ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Card>
            ),
          },
          {
            key: "2",
            label: (
              <span>
                <LockOutlined />
                Security
              </span>
            ),
            children: (
              <>
                <Card title="Change Password">
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                    style={{ maxWidth: 500, margin: "0 auto" }}
                  >
                    <Form.Item
                      name="currentPassword"
                      label="Current Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your current password",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Current Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your new password",
                        },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="New Password"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm New Password"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your new password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm New Password"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Update Password
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </>
            ),
          },
          {
            key: "3",
            label: (
              <span>
                <CarOutlined />
                Motorcycle Details
              </span>
            ),
            children: (
              <>
                <Card title="My Motorcycle">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                      <img
                        src="https://i.pinimg.com/736x/5e/1c/ea/5e1ceab1bb1d35b8f723c122be26345a.jpg"
                        alt="Motorcycle"
                        className="motorcycle-image"
                      />
                      {isEditing && (
                        <Upload className="upload-button">
                          <Button icon={<UploadOutlined />} block>
                            Upload Motorcycle Photo
                          </Button>
                        </Upload>
                      )}
                    </Col>
                    <Col xs={24} md={16}>
                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              label="Motorcycle Model"
                              name="vehicle"
                              initialValue={userData.user.vehicle}
                            >
                              <Input disabled={!isEditing} />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Year"
                              name="year"
                              initialValue="2021"
                            >
                              <Input disabled={!isEditing} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              label="License Plate"
                              name="licensePlate"
                              initialValue="59-X1 12345"
                            >
                              <Input disabled={!isEditing} />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              label="Color"
                              name="color"
                              initialValue="Red"
                            >
                              <Input disabled={!isEditing} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Form.Item
                          label="Additional Notes"
                          name="notes"
                          initialValue="Regular maintenance every 3 months. Last service: March 2023"
                        >
                          <Input.TextArea rows={4} disabled={!isEditing} />
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </Card>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Profile;
