import { useState } from "react"
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Divider,
  Empty,
} from "antd"
import {
  VideoCameraOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import "./Meeting.css"

const { Title, Paragraph } = Typography
const { TextArea } = Input

const Meeting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Weekly Ride Planning",
      date: "June 15, 2023",
      time: "19:00",
      location: "Online",
      description: "Discuss and plan our upcoming weekend ride to the mountains.",
      participants: 8,
      host: "Mike Johnson",
    },
    {
      id: 2,
      title: "Maintenance Workshop",
      date: "June 20, 2023",
      time: "18:30",
      location: "Online",
      description: "Learn basic motorcycle maintenance tips from our expert mechanics.",
      participants: 15,
      host: "Sarah Miller",
    },
    {
      id: 3,
      title: "Route Discussion",
      date: "June 25, 2023",
      time: "20:00",
      location: "Online",
      description: "Share and discuss new routes for our summer riding season.",
      participants: 12,
      host: "David Thompson",
    },
  ])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleCreateMeeting = (values) => {
    const newMeeting = {
      id: meetings.length + 1,
      title: values.title,
      date: values.date.format("MMMM D, YYYY"),
      time: values.time.format("HH:mm"),
      location: "Online",
      description: values.description,
      participants: 0,
      host: "You",
    }

    setMeetings([...meetings, newMeeting])
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleJoinMeeting = (id) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, participants: meeting.participants + 1 } : meeting
      )
    )
  }

  return (
    <div className="meeting-container">
      <div className="meeting-header">
        <Title level={2}>Meetings</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Create Meeting
        </Button>
      </div>

      <Paragraph className="meeting-description">
        Join online meetings with fellow riders to plan trips, discuss routes, and share experiences.
      </Paragraph>

      {meetings.length > 0 ? (
        <Row gutter={[24, 24]}>
          {meetings.map((meeting) => (
            <Col xs={24} sm={12} md={8} key={meeting.id}>
              <Card
                hoverable
                className="meeting-card"
                actions={[
                  <Button key="join" type="primary" onClick={() => handleJoinMeeting(meeting.id)}>
                    Join Meeting
                  </Button>,
                ]}
              >
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <div className="meeting-title">
                    <VideoCameraOutlined className="meeting-icon" />
                    <Title level={4} style={{ margin: 0 }}>
                      {meeting.title}
                    </Title>
                  </div>

                  <Space direction="vertical" size="small">
                    <div>
                      <CalendarOutlined style={{ marginRight: 8 }} />
                      {meeting.date}
                    </div>
                    <div>
                      <ClockCircleOutlined style={{ marginRight: 8 }} />
                      {meeting.time}
                    </div>
                    <div>
                      <EnvironmentOutlined style={{ marginRight: 8 }} />
                      {meeting.location}
                    </div>
                    <div>
                      <UserOutlined style={{ marginRight: 8 }} />
                      Host: {meeting.host}
                    </div>
                  </Space>

                  <Divider style={{ margin: "12px 0" }} />
                  <Paragraph ellipsis={{ rows: 2 }}>{meeting.description}</Paragraph>
                  <Tag color="blue">{meeting.participants} participants</Tag>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No meetings scheduled" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}

      <Modal title="Create New Meeting" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleCreateMeeting}>
          <Form.Item
            name="title"
            label="Meeting Title"
            rules={[{ required: true, message: "Please enter a meeting title" }]}
          >
            <Input placeholder="e.g., Weekly Ride Planning" />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a date" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="time" label="Time" rules={[{ required: true, message: "Please select a time" }]}>
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="What is this meeting about?" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Meeting
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Meeting
