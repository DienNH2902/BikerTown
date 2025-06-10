import { useState } from "react"
import { Typography, Input, Button, List, Avatar, Card, Tabs, Space, Tag, Modal, Form, Divider, Empty, App } from "antd"
import { UserAddOutlined, SearchOutlined, MessageOutlined, TeamOutlined } from "@ant-design/icons"
import "./Friends.css"

const { Title, Text } = Typography

const Friends = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Khoa Can",
      avatar:
        "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/481997303_1723078375292253_1964171346106551630_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Cq4oCmsIOlkQ7kNvwGN_wA_&_nc_oc=AdnVPSY3mr5Lzd6ES0RI7TuH1_QQtAzl1NSHDT5aXz4CSE2eg5UfqoFbbojrnudTSiz5-F1f9LRyzqiNWnTK7jLl&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=vi1fPUMa4T0E3n3WRKxmNQ&oh=00_AYHMIbR7vH_gTv5wEOMPu-we_k39NqXa_WoiT0xm1RtwAQ&oe=67F74B77",
      status: "online",
      bike: "Honda CBR650R",
      location: "Ho Chi Minh City",
      trips: 15,
    },
    {
      id: 2,
      name: "Thùy Dương",
      avatar:
        "https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/475499452_3963012600646759_9006226833427451069_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yhoZxVNaSkEQ7kNvwF1VjiK&_nc_oc=AdkgTUKw6dqGcxyaBVd_sge2VfAcCiLyl7hjEO9SeR5lxRHrF8oXvrQLv3PKQAW4wifnCa2vb7VOvA9IeIxM_myA&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=sGFjP7I9Vk9fpE__DOyHmw&oh=00_AYHOiDN-CFQUcp5ldjSvGZTrsgi_N31CVDkibJ-GJw--3w&oe=67F72BD7",
      status: "offline",
      bike: "Yamaha MT-07",
      location: "Da Nang",
      trips: 8,
    },
    {
      id: 3,
      name: "Thiện Nhân",
      avatar:
        "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/475259674_2124725214616052_2333513328939203981_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IZRaV5lrJY0Q7kNvwEZFvM8&_nc_oc=AdlHfurMhAgV9jlPlJf63J8NP6eW4Khcm9cwbjan8TpXfA3pzk-pkXFNJfH-cMBRaOvEkgrB8KwmYd2Q8ZUJcbml&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=TE9--cX1Jo_mlVrR-r7pFQ&oh=00_AYHUOPI_uqNvyegCeVGKIxnqItALcslc1dyhlvtr8SNC4A&oe=67F753B2",
      status: "online",
      bike: "Kawasaki Z900",
      location: "Ha Noi",
      trips: 22,
    },
    {
      id: 4,
      name: "Đức Cống",
      avatar:
        "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-1/481171234_1336816297464873_6870023393207284223_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=uuFpL4dayYwQ7kNvwEDCNmj&_nc_oc=AdkhRNf4B_FCZk0H4-EHDFtQ9X3jC_7-WOAaiT77X_SzbeZJhoftsSHx5OottqKsQ61LUtL350LiWPj8Z63P2Hil&_nc_zt=24&_nc_ht=scontent-hkg4-1.xx&_nc_gid=wr_-L0TxmCP3rrPbOorm8Q&oh=00_AYEwjbq0uPVEmi8ujMvpZMiXb47dnkOiZ7n3H9t5ObEYGw&oe=67F74167",
      status: "offline",
      bike: "Ducati Monster",
      location: "Nha Trang",
      trips: 5,
    },
  ])

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 5,
      name: "Vi rút",
      avatar:
        "https://ict-imgs.vgcloud.vn/2021/02/08/20/viruss-la-ai-game-thu-hay-nhac-si-1.jpg?width%3D0%26s%3D8F8LjN_qQKch-zQpchOOSw%26format%3Dwebp",
      location: "Trung Quốc",
      bike: "Suzuki GSX-R750",
    },
    {
      id: 6,
      name: "Jack 97",
      avatar: "https://photo-zmp3.zadn.vn/avatars/0/3/3/7/0337e4cc5a05cdcc93b5d65762aea241.jpg",
      location: "Bến Tre",
      bike: "BMW S1000RR",
    },
  ])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleAddFriend = (values) => {
    console.log("Friend request sent to:", values.email)
    message.success(`Friend request sent to ${values.email}`)
    setIsModalVisible(false)
    form.resetFields()
  }

  const acceptFriendRequest = (id) => {
    const request = friendRequests.find((req) => req.id === id)
    if (request) {
      setFriends([...friends, { ...request, status: "online", trips: 0 }])
      setFriendRequests(friendRequests.filter((req) => req.id !== id))
      message.success(`You are now friends with ${request.name}`)
    }
  }

  const rejectFriendRequest = (id) => {
    const request = friendRequests.find((req) => req.id === id)
    setFriendRequests(friendRequests.filter((req) => req.id !== id))
    message.info(`Friend request from ${request.name} rejected`)
  }

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchText.toLowerCase()) ||
      friend.location.toLowerCase().includes(searchText.toLowerCase()) ||
      friend.bike.toLowerCase().includes(searchText.toLowerCase()),
  )

  // Create tab items for the Tabs component
  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <TeamOutlined /> My Friends
        </span>
      ),
      children: (
        <>
          <div className="friends-search">
            <Input
              placeholder="Search friends..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          {filteredFriends.length > 0 ? (
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
              dataSource={filteredFriends}
              renderItem={(friend) => (
                <List.Item>
                  <Card hoverable>
                    <div className="friend-card">
                      <div className="friend-avatar-wrapper">
                        <Avatar size={64} src={friend.avatar} />
                        <div
                          className="friend-status-indicator"
                          style={{
                            background: friend.status === "online" ? "#52c41a" : "#d9d9d9",
                          }}
                        />
                      </div>
                      <Title level={5} style={{ marginTop: 12, marginBottom: 4 }}>
                        {friend.name}
                      </Title>
                      <Text type="secondary">{friend.location}</Text>
                      <Divider style={{ margin: "12px 0" }} />
                      <div className="friend-info">
                        <div className="friend-info-row">
                          <Text>Bike:</Text>
                          <Text strong>{friend.bike}</Text>
                        </div>
                        <div className="friend-info-row">
                          <Text>Trips:</Text>
                          <Text strong>{friend.trips}</Text>
                        </div>
                      </div>
                      <Space className="friend-message-button">
                        <Button type="primary" icon={<MessageOutlined />}>
                          Message
                        </Button>
                      </Space>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No friends found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <UserAddOutlined />
          Friend Requests {friendRequests.length > 0 && <Tag color="red">{friendRequests.length}</Tag>}
        </span>
      ),
      children: (
        <>
          {friendRequests.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={friendRequests}
              renderItem={(request) => (
                <List.Item
                  key={request.id}
                  actions={[
                    <Button key="accept" type="primary" onClick={() => acceptFriendRequest(request.id)}>
                      Accept
                    </Button>,
                    <Button key="reject" danger onClick={() => rejectFriendRequest(request.id)}>
                      Reject
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={request.avatar} />}
                    title={request.name}
                    description={
                      <Space direction="vertical">
                        <Text>{request.location}</Text>
                        <Text>Rides: {request.bike}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="No friend requests" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      ),
    },
  ]

  return (
    <div>
      <div className="friends-header">
        <Title level={2}>Friends</Title>
        <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
          Add Friend
        </Button>
      </div>

      <div className="friends-search">Connect with fellow riders, send messages, and plan trips together.</div>

      <Tabs defaultActiveKey="1" items={tabItems} />

      <Modal title="Add Friend" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddFriend}>
          <Form.Item
            name="email"
            label="Friend's Email"
            rules={[
              { required: true, message: "Please enter your friend's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="friend@example.com" />
          </Form.Item>

          <Form.Item name="message" label="Message (Optional)">
            <Input.TextArea placeholder="Add a personal message..." rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Friend Request
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Friends
