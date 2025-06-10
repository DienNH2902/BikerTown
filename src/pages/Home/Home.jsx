import {
  Typography,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Space,
  Divider,
  Tooltip,
} from "antd";
import {
  RightOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  // Featured destinations
  const destinations = [
    {
      title: "Đà Lạt Trip",
      description: "Experience breathtaking views on winding mountain roads",
      image:
        "https://dalat.tours/vi/wp-content/uploads/2019/01/dalat_tours3.jpg",
    },
    {
      title: "Vũng Tàu Experience",
      description:
        "Feel the ocean breeze as you ride along scenic coastal routes",
      image:
        "https://media.istockphoto.com/id/1858719228/vi/anh/th%C3%A0nh-ph%E1%BB%91-v%C3%A0-b%E1%BB%9D-bi%E1%BB%83n-v%C5%A9ng-t%C3%A0u-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=GCX5AxZvoGEDiyE9Fjav5tW-r4YduVcIskwRHkZZixE=",
    },
    {
      title: "Mũi Né - Phan Thiết",
      description: "Challenge yourself with an exciting ride through the sea",
      image:
        "https://mia.vn/media/uploads/blog-du-lich/bai-bien-phan-thiet-15-1688633901.jpg",
    },
    {
      title: "Đà Nẵng",
      description:
        "Discover hidden gems as you navigate through the heart of the city",
      image:
        "https://tourism.danang.vn/wp-content/uploads/2023/02/tour-du-lich-da-nang-1.jpg",
    },
  ];

  // Upcoming events
  const events = [
    {
      title: "Weekend Ride to Mountain View",
      date: "June 15, 2023",
      participants: 24,
      location: "Mountain View Resort",
    },
    {
      title: "Sunset Beach Meetup",
      date: "June 22, 2023",
      participants: 18,
      location: "Sandy Beach",
    },
    {
      title: "City Night Ride",
      date: "June 29, 2023",
      participants: 32,
      location: "Downtown Square",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Carousel autoplay effect="fade">
        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://special.nhandan.vn/30-nam-mot-chang-duong-di-san-Vinh-Ha-Long/assets/HLCklusX0n/things-to-do-in-ha-long-bay-banner-1-1920x1080.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Explore The World On Two Wheels
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Join our community of passionate riders and discover new
                adventures
              </Paragraph>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate("/todo")}
                >
                  Join Now
                </Button>
                <Button size="large" onClick={() => navigate("/todo")}>Learn More</Button>
              </Space>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://www.homepaylater.vn/static/d4f2c13637c198d9e593a3590e1b111b/22553/1_thanh_pho_hoi_an_duoc_unesco_cong_nhan_la_di_san_van_hoa_the_gioi_noi_tieng_voi_nhung_ngoi_nha_co_kinh_62c7183de4.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Plan Your Next Adventure
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Create detailed trip plans and share them with your riding
                buddies
              </Paragraph>
              <Button type="primary" size="large" onClick={() => navigate("/todo")}>
                Start Planning
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              height: "500px",
              background:
                "url(https://images.baodantoc.vn/uploads/2024/Thang-8/Ngay-30/Anh/hangkieu.jpg) center/cover no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              color: "white",
              padding: "0 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <Title style={{ color: "white", marginBottom: 20 }}>
                Travel with your new friends
              </Title>
              <Paragraph
                style={{ color: "white", fontSize: 18, marginBottom: 30 }}
              >
                Your journeys start here, your stories start here
              </Paragraph>
              <Space>
                <Button type="primary" size="large" onClick={() => navigate("/todo")}>
                  Join Us
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Featured Destinations */}
      <div style={{ padding: "60px 0" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Popular Destinations
        </Title>
        <Row gutter={[24, 24]}>
          {destinations.map((destination, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    style={{ height: "240px" }}
                    alt={destination.title}
                    src={destination.image || "/placeholder.svg"}
                  />
                }
                actions={[
                  <Button type="link" key="explore" onClick={() => navigate("/todo")}>
                    Explore <RightOutlined />
                  </Button>,
                ]}
              >
                <Meta
                  title={destination.title}
                  description={
                    <Tooltip title={destination.description} placement="top">
                      <div className="description">
                        {destination.description}
                      </div>
                    </Tooltip>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Divider />

      {/* Upcoming Events */}
      <div style={{ padding: "60px 0", backgroundColor: "lightgrey" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Upcoming Rides & Meetups
        </Title>
        <Row gutter={[24, 24]}>
          {events.map((event, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card style={{ margin: "20px" }} hoverable>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <Title level={4}>{event.title}</Title>
                  <Space>
                    <CalendarOutlined />
                    <span>{event.date}</span>
                  </Space>
                  <Space>
                    <TeamOutlined />
                    <span>{event.participants} riders joined</span>
                  </Space>
                  <Space>
                    <EnvironmentOutlined />
                    <span>{event.location}</span>
                  </Space>
                  <Button type="primary" block>
                    Join This Ride
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials */}
      <div
        style={{
          padding: "60px 0",
          margin: "40px -24px -24px -24px",
          backgroundImage:
            "url('https://media.vneconomy.vn/images/upload/2023/07/01/vietnam-becomes-seventh-most-searched-country-worldwide-494.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Title
  level={2}
  style={{
    textAlign: "center",
    marginBottom: 40,
  }}
>
  <span
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "yellow",
      padding: "10px",
      borderRadius: "8px",
      display: "inline-block",
    }}
  >
    What Our Riders Say
  </span>
</Title>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Carousel autoplay dots={{ className: "custom-carousel-dots" }}>
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <Card style={{ textAlign: "center", padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <img
                        src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/475060377_1673863053198974_6864556674033579618_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=3QAnpZidId8Q7kNvwHAVBLv&_nc_oc=AdmRc6WJ-RtAMRqHyV2PZkn4mOAmlxbSm8Ef2VBNhn1ecvTe8tf5AVKb5KjemrTO0M4KW9TojxsMeqsm8GWvRn1_&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=bC3F7RyGOEfXbrIkYzDEhw&oh=00_AYGGA8Nv0H2HmFzp5euznnFQmrnC90t-Li6d_ZJvSoHgQA&oe=67F74E26"
                        alt="User"
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <Paragraph style={{ fontSize: 16 }}>
                      "The BikerTown Club has completely transformed my riding
                      experience. I've discovered amazing routes I never knew
                      existed and made lifelong friends who share my passion for
                      motorcycles."
                    </Paragraph>
                    <Title level={5} style={{ color: "red" }}>
                      Trương Gia Hòa
                    </Title>
                    <Paragraph>Member since 2020</Paragraph>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
