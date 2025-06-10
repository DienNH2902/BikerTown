import { useState } from "react"
import { Typography, Card, Button, Input, List, Checkbox, Row, Col, Space, Modal, Form, Tabs, App } from "antd"
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import "./Todo.css"

const { Title } = Typography
const { TextArea } = Input

const Todo = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: "Trip to Vũng Tàu",
      todoLists: [
        {
          id: 1,
          location: "Long An",
          items: [
            { id: 1, text: "Ăn sáng", completed: false },
            { id: 2, text: "Mua nước", completed: true },
            { id: 3, text: "Soạn đồ", completed: false },
          ],
        },
        {
          id: 2,
          location: "Bò sữa 22",
          items: [
            { id: 1, text: "Mua sữa", completed: false },
            { id: 2, text: "Đi vệ sinh", completed: false },
          ],
        },
        {
          id: 3,
          location: "Petro Bà Rịa",
          items: [{ id: 1, text: "Đổ xăng", completed: true }],
        },
        {
          id: 4,
          location: "Vũng Tàu",
          items: [
            { id: 1, text: "Tắm biển", completed: false },
            { id: 2, text: "Gửi xe", completed: false },
            { id: 3, text: "Uống cafe", completed: false },
            { id: 4, text: "Dạo đêm", completed: false },
          ],
        },
      ],
    },
  ])

  const [activeTrip, setActiveTrip] = useState(trips[0]?.id || null)
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false)
  const [isTripModalVisible, setIsTripModalVisible] = useState(false)
  const [editingTodoList, setEditingTodoList] = useState(null)
  const [editingTrip, setEditingTrip] = useState(null)
  const [locationForm] = Form.useForm()
  const [tripForm] = Form.useForm()
  const [newItemTexts, setNewItemTexts] = useState({})
  const { message, modal } = App.useApp() // Get modal from App context

  const currentTrip = trips.find((trip) => trip.id === activeTrip) || trips[0]
  const todoLists = currentTrip?.todoLists || []

  const showTripModal = (trip = null) => {
    setEditingTrip(trip)
    trip ? tripForm.setFieldsValue({ name: trip.name }) : tripForm.resetFields()
    setIsTripModalVisible(true)
  }

  const handleTripCancel = () => {
    setIsTripModalVisible(false)
    setEditingTrip(null)
    tripForm.resetFields()
  }

  const handleTripSubmit = (values) => {
    if (editingTrip) {
      setTrips(trips.map((trip) => (trip.id === editingTrip.id ? { ...trip, name: values.name } : trip)))
      message.success("Trip updated successfully!")
    } else {
      const newTrip = { id: Date.now(), name: values.name, todoLists: [] }
      setTrips([...trips, newTrip])
      setActiveTrip(newTrip.id)
      message.success("Trip created successfully!")
    }
    setIsTripModalVisible(false)
    tripForm.resetFields()
  }

  const deleteTrip = (tripId) => {
    // Use modal from App context instead of Modal.confirm
    modal.confirm({
      title: "Are you sure you want to delete this trip?",
      content: "This action cannot be undone.",
      onOk() {
        setTrips(trips.filter((trip) => trip.id !== tripId))
        if (activeTrip === tripId) setActiveTrip(trips[0]?.id || null)
        message.success("Trip deleted successfully!")
      },
    })
  }

  const showLocationModal = (todoList = null) => {
    setEditingTodoList(todoList)
    todoList ? locationForm.setFieldsValue({ location: todoList.location }) : locationForm.resetFields()
    setIsLocationModalVisible(true)
  }

  const handleLocationCancel = () => {
    setIsLocationModalVisible(false)
    setEditingTodoList(null)
    locationForm.resetFields()
  }

  const handleLocationSubmit = (values) => {
    if (!currentTrip) return

    if (editingTodoList) {
      setTrips(
        trips.map((trip) =>
          trip.id === currentTrip.id
            ? {
                ...trip,
                todoLists: trip.todoLists.map((list) =>
                  list.id === editingTodoList.id ? { ...list, location: values.location } : list,
                ),
              }
            : trip,
        ),
      )
      message.success("Location updated successfully!")
    } else {
      const newTodoList = { id: Date.now(), location: values.location, items: [] }
      setTrips(
        trips.map((trip) =>
          trip.id === currentTrip.id ? { ...trip, todoLists: [...trip.todoLists, newTodoList] } : trip,
        ),
      )
      message.success("Location added successfully!")
    }
    setIsLocationModalVisible(false)
    locationForm.resetFields()
  }

  const deleteTodoList = (listId) => {
    if (!currentTrip) return

    // Use modal from App context instead of Modal.confirm
    modal.confirm({
      title: "Are you sure you want to delete this location?",
      content: "All tasks in this location will be deleted.",
      onOk() {
        setTrips(
          trips.map((trip) =>
            trip.id === currentTrip.id
              ? {
                  ...trip,
                  todoLists: trip.todoLists.filter((list) => list.id !== listId),
                }
              : trip,
          ),
        )
        message.success("Location deleted successfully!")
      },
    })
  }

  const toggleItemCompletion = (listId, itemId) => {
    if (!currentTrip) return

    setTrips(
      trips.map((trip) =>
        trip.id === currentTrip.id
          ? {
              ...trip,
              todoLists: trip.todoLists.map((list) =>
                list.id === listId
                  ? {
                      ...list,
                      items: list.items.map((item) =>
                        item.id === itemId ? { ...item, completed: !item.completed } : item,
                      ),
                    }
                  : list,
              ),
            }
          : trip,
      ),
    )
  }

  const addItemToList = (listId) => {
    const text = newItemTexts[listId]?.trim()
    if (!text || !currentTrip) return

    const newItem = { id: Date.now(), text, completed: false }

    setTrips(
      trips.map((trip) =>
        trip.id === currentTrip.id
          ? {
              ...trip,
              todoLists: trip.todoLists.map((list) =>
                list.id === listId ? { ...list, items: [...list.items, newItem] } : list,
              ),
            }
          : trip,
      ),
    )

    setNewItemTexts({ ...newItemTexts, [listId]: "" })
  }

  const deleteItem = (listId, itemId) => {
    if (!currentTrip) return

    setTrips(
      trips.map((trip) =>
        trip.id === currentTrip.id
          ? {
              ...trip,
              todoLists: trip.todoLists.map((list) =>
                list.id === listId ? { ...list, items: list.items.filter((item) => item.id !== itemId) } : list,
              ),
            }
          : trip,
      ),
    )
  }

  const handleTabChange = (key) => {
    setActiveTrip(Number.parseInt(key))
  }

  // Create tab items for the Tabs component
  const tabItems = trips.map((trip) => ({
    key: trip.id.toString(),
    label: trip.name,
    children: (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Title level={4} style={{ color: "brown" }}>
            To Do Lists
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showLocationModal()}
            className="add-location-btn"
          >
            Add Location
          </Button>
        </div>

        <div style={{ marginBottom: 24 }}>
          Create to-do lists for each location on your trip to stay organized and make sure you don't miss anything
          important.
        </div>

        <Row gutter={[24, 24]}>
          {todoLists.map((todoList) => (
            <Col xs={24} sm={12} md={6} key={todoList.id}>
              <Card
                title={todoList.location}
                extra={
                  <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => showLocationModal(todoList)} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={() => deleteTodoList(todoList.id)} />
                  </Space>
                }
                className="todo-card"
              >
                <List
                  size="small"
                  dataSource={todoList.items}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Button
                          key={item.id}
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => deleteItem(todoList.id, item.id)}
                        />,
                      ]}
                    >
                      <Checkbox
                        checked={item.completed}
                        onChange={() => toggleItemCompletion(todoList.id, item.id)}
                        style={{ textDecoration: item.completed ? "line-through" : "none" }}
                      >
                        {item.text}
                      </Checkbox>
                    </List.Item>
                  )}
                  footer={
                    <div className="todo-footer-input">
                      <Input
                        placeholder="Add new item"
                        value={newItemTexts[todoList.id] || ""}
                        onChange={(e) => setNewItemTexts({ ...newItemTexts, [todoList.id]: e.target.value })}
                        onPressEnter={() => addItemToList(todoList.id)}
                        style={{ marginRight: 8 }}
                      />
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => addItemToList(todoList.id)}
                        className="todo-footer-btn"
                      />
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    ),
  }))

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Title level={2}>Trip Planner</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showTripModal()} className="add-trip-btn">
          Create To Do list
        </Button>
      </div>

      {trips.length > 0 ? (
        <Tabs
          activeKey={activeTrip?.toString()}
          onChange={handleTabChange}
          type="card"
          items={tabItems}
          tabBarExtraContent={{
            right: activeTrip && (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => showTripModal(currentTrip)}>
                  Edit Trip
                </Button>
                <Button danger icon={<DeleteOutlined />} onClick={() => deleteTrip(activeTrip)}>
                  Delete Trip
                </Button>
              </Space>
            ),
          }}
        />
      ) : (
        <div className="no-trips">
          <Title level={4}>No trips yet. Create your first trip!</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showTripModal()}
            size="large"
            className="add-trip-btn"
          >
            Create To Do list
          </Button>
        </div>
      )}

      {/* Trip Modal */}
      <Modal
        title={editingTrip ? "Edit Trip" : "Create New Trip"}
        open={isTripModalVisible}
        onCancel={handleTripCancel}
        footer={null}
      >
        <Form form={tripForm} layout="vertical" onFinish={handleTripSubmit}>
          <Form.Item name="name" label="Trip Name" rules={[{ required: true, message: "Please enter a trip name" }]}>
            <Input placeholder="e.g., Trip to Vũng Tàu" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleTripCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="modal-submit-btn">
                {editingTrip ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Location Modal */}
      <Modal
        title={editingTodoList ? "Edit Location" : "Add New Location"}
        open={isLocationModalVisible}
        onCancel={handleLocationCancel}
        footer={null}
      >
        <Form form={locationForm} layout="vertical" onFinish={handleLocationSubmit}>
          <Form.Item
            name="location"
            label="Location Name"
            rules={[{ required: true, message: "Please enter a location name" }]}
          >
            <Input placeholder="e.g., Vũng Tàu" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleLocationCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="modal-submit-btn">
                {editingTodoList ? "Update" : "Add"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Todo
