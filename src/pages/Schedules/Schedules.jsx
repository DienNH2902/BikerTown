import { useState } from "react"
import { Typography, Card, Form, Input, Button, Space, Row, Col, Tag, Modal, App, Select } from "antd"
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import "./Schedules.css"

const { Title } = Typography
const { Option } = Select

const Schedules = () => {
  const [form] = Form.useForm()
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      start: "Ho Chi Minh City",
      destination: "Vung Tau",
      date: "May 25, 2023",
      time: "07:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      start: "Ho Chi Minh City",
      destination: "Da Lat",
      date: "June 10, 2023",
      time: "06:30 AM",
      status: "In Progress",
    },
  ])
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { message, modal } = App.useApp()

  const handleSubmit = (values) => {
    const newSchedule = {
      id: editingSchedule ? editingSchedule.id : Date.now(),
      start: values.start,
      destination: values.destination,
      date: values.date || new Date().toLocaleDateString(),
      time: values.time || "08:00 AM",
      status: values.status || "Upcoming",
    }

    if (editingSchedule) {
      setSchedules(schedules.map((schedule) => (schedule.id === editingSchedule.id ? newSchedule : schedule)))
      setEditingSchedule(null)
      message.success("Schedule updated successfully!")
    } else {
      setSchedules([...schedules, newSchedule])
      message.success("New schedule created!")
    }

    form.resetFields()
    setIsModalVisible(false)
  }

  const editSchedule = (schedule) => {
    setEditingSchedule(schedule)
    form.setFieldsValue({
      start: schedule.start,
      destination: schedule.destination,
      date: schedule.date,
      time: schedule.time,
      status: schedule.status,
    })
    setIsModalVisible(true)
  }

  const deleteSchedule = (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this schedule?",
      content: "This action cannot be undone.",
      onOk() {
        setSchedules(schedules.filter((schedule) => schedule.id !== id))
        message.success("Schedule deleted successfully!")
      },
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setEditingSchedule(null)
    setIsModalVisible(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Upcoming":
        return "blue"
      case "In Progress":
        return "green"
      case "Delayed":
        return "orange"
      default:
        return "default"
    }
  }

  return (
    <div>
      <div className="schedules-header">
        <Title level={2}>Ongoing Schedules</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Create New Schedule
        </Button>
      </div>

      <div className="schedules-description">
        View and manage your upcoming and ongoing motorcycle trips. Completed trips will be moved to History.
      </div>

      <Row gutter={[24, 24]}>
        {schedules.map((schedule) => (
          <Col xs={24} sm={12} md={8} key={schedule.id}>
            <Card
              title={
                <div className="schedule-card-title">
                  <EnvironmentOutlined style={{ color: "#f5222d" }} />
                  <span>
                    {schedule.start} to {schedule.destination}
                  </span>
                </div>
              }
              extra={<Tag color={getStatusColor(schedule.status)}>{schedule.status}</Tag>}
              actions={[
                <Button key="edit" type="text" icon={<EditOutlined />} onClick={() => editSchedule(schedule)}>
                  Edit
                </Button>,
                <Button
                  key="delete"
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => deleteSchedule(schedule.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <CalendarOutlined />
                  <span>{schedule.date}</span>
                </Space>
                <Space>
                  <ClockCircleOutlined />
                  <span>{schedule.time}</span>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingSchedule ? "Edit Trip Schedule" : "Create New Trip Schedule"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: "Upcoming",
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="start"
                label="Start Location"
                rules={[{ required: true, message: "Please enter start location" }]}
              >
                <Input placeholder="e.g., Ho Chi Minh City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="destination"
                label="Destination"
                rules={[{ required: true, message: "Please enter destination" }]}
              >
                <Input placeholder="e.g., Vũng Tàu" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please enter date" }]}>
                <Input placeholder="e.g., June 15, 2023" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="time" label="Time" rules={[{ required: true, message: "Please enter time" }]}>
                <Input placeholder="e.g., 08:00 AM" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status" }]}>
                <Select>
                  <Option value="Upcoming">Upcoming</Option>
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Delayed">Delayed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingSchedule ? "Update Schedule" : "Create Schedule"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Schedules
