import { useState } from "react"
import {
  Typography,
  Card,
  Tag,
  Space,
  Row,
  Col,
  Button,
  Divider,
  Rate,
  Avatar,
  Empty,
} from "antd"
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CarOutlined,
  PictureOutlined,
} from "@ant-design/icons"
import "./History.css"

const { Title, Paragraph, Text } = Typography

const History = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Weekend Coastal Ride",
      start: "Ho Chi Minh City",
      destination: "Vung Tau",
      date: "May 15, 2023",
      duration: "2 days",
      distance: "120 km",
      participants: ["John", "Mike", "Sarah", "David"],
      rating: 5,
      checkpoints: ["Long An", "Bò sữa 22", "Petro Bà Rịa"],
      description:
        "A wonderful weekend trip to the beach with perfect weather and great company.",
      photos: [
        "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/26/du-lich-long-an-2-2245.jpg",
        "https://valitravel.vn/wp-content/uploads/2022/09/D%E1%BB%ABng-ch%C3%A2n-mua-s%E1%BA%AFm-t%E1%BA%A1i-B%C3%B2-S%E1%BB%AFa-Long-Th%C3%A0nh.jpg",
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/dia-diem-du-lich-vung-tau-5.jpg",
      ],
    },
    {
      id: 2,
      title: "Mountain Adventure",
      start: "Ho Chi Minh City",
      destination: "Da Lat",
      date: "April 5, 2023",
      duration: "3 days",
      distance: "300 km",
      participants: ["John", "Mike", "Lisa"],
      rating: 4,
      checkpoints: ["Dong Nai", "Bao Loc", "Lam Dong"],
      description:
        "Challenging mountain roads with breathtaking views. Some rain on the second day.",
      photos: [
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Nh%C3%A0_th%E1%BB%9D_ch%C3%ADnh_V%C4%83n_mi%E1%BA%BFu_Tr%E1%BA%A5n_Bi%C3%AAn.jpg",
        "https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng%204/Ng%C3%A0y_20/Uong%20Thai%20Bieu/Trung%20t%C3%A2m%20th%C3%A0nh%20ph%E1%BB%91%20B%E1%BA%A3o%20L%E1%BB%99c.jpg",
      ],
    },
  ])

  return (
    <div>
      <Title level={2}>Trip History</Title>
      <Paragraph className="history-description">
        View your past trips, memories, and experiences with the Riders Club.
      </Paragraph>

      {trips.length > 0 ? (
        <Row gutter={[24, 24]}>
          {trips.map((trip) => (
            <Col xs={24} key={trip.id}>
              <Card>
                <div className="trip-card">
                  <div className="trip-header">
                    <div>
                      <Title level={3} className="trip-title">
                        {trip.title}
                      </Title>
                      <Space size="large">
                        <Space>
                          <EnvironmentOutlined />
                          <Text>
                            {trip.start} to {trip.destination}
                          </Text>
                        </Space>
                        <Space>
                          <CalendarOutlined />
                          <Text>{trip.date}</Text>
                        </Space>
                        <Space>
                          <ClockCircleOutlined />
                          <Text>{trip.duration}</Text>
                        </Space>
                        <Space>
                          <CarOutlined />
                          <Text>{trip.distance}</Text>
                        </Space>
                      </Space>
                    </div>
                    <Rate disabled defaultValue={trip.rating} />
                  </div>

                  <Divider className="trip-divider" />

                  <Row gutter={24}>
                    <Col xs={24} md={16}>
                      <Title level={5}>Trip Details</Title>
                      <Paragraph>{trip.description}</Paragraph>

                      <Title level={5}>Checkpoints</Title>
                      <Space wrap>
                        {trip.checkpoints.map((checkpoint, index) => (
                          <Tag key={index} color="blue">
                            {checkpoint}
                          </Tag>
                        ))}
                      </Space>

                      <Title level={5} style={{ marginTop: 16 }}>
                        Participants
                      </Title>
                      <Avatar.Group max={{ count: 4 }}>
                        {trip.participants.map((participant, index) => (
                          <Avatar key={index} style={{ backgroundColor: "#f5222d" }}>
                            {participant.charAt(0)}
                          </Avatar>
                        ))}
                      </Avatar.Group>
                    </Col>

                    <Col xs={24} md={8}>
                      <Title level={5}>Photos</Title>
                      <div className="trip-photos">
                        {trip.photos.map((photo, index) => (
                          <img
                            height={200}
                            width={120}
                            key={index}
                            src={photo || "/placeholder.svg"}
                            alt={`Trip photo ${index + 1}`}
                            className="photo"
                          />
                        ))}
                        <Button className="add-photo-btn">
                          <PictureOutlined style={{ fontSize: "24px" }} />
                          <span>Add Photos</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No trip history yet" image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Button type="primary">Plan Your First Trip</Button>
        </Empty>
      )}
    </div>
  )
}

export default History
