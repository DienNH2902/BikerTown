import { Layout, Row, Col, Typography, Space, Divider, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import logo from "../../assets/img/helmetlogo.jpg";
import "./Footer.css";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-container">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="footer-logo-section">
              <img src={logo} alt="Riders Club Logo" className="footer-logo" />
              <Title style= {{color:"red"}} level={3} className="footer-title">BikerTown</Title>
            </div>
            <Text className="footer-description">
              Join our community of passionate motorcycle enthusiasts. Explore
              new routes, make friends, and create unforgettable memories on the
              road.
            </Text>
            <div className="footer-social-icons">
              <Space size="large">
                <Button type="text" icon={<FacebookOutlined />} />
                <Button type="text" icon={<InstagramOutlined />} />
                <Button type="text" icon={<YoutubeOutlined />} />
              </Space>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8}>
            <Title style= {{color:"white"}} level={4} className="footer-quick-links-title">Quick Links</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/meeting" className="footer-link">Meetings</Link>
                <Link href="/planners" className="footer-link">Planners</Link>
                <Link href="/todo" className="footer-link">To Do</Link>
              </Col>
              <Col span={12}>
                <Link href="/history" className="footer-link">History</Link>
                <Link href="/friends" className="footer-link">Friends</Link>
                <Link href="/messages" className="footer-link">Messages</Link>
                <Link href="#" className="footer-link">About Us</Link>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8}>
            <Title style= {{color:"white"}} level={4} className="footer-contact-title">Contact Us</Title>
            <Space direction="vertical" size="middle" style={{ marginRight: "90px" }}>
              <div className="footer-contact-info">
                <EnvironmentOutlined />
                <Text style= {{color:"#fff"}}>123 Rider Street, Bike City</Text>
              </div>
              <div className="footer-contact-info">
                <PhoneOutlined />
                <Text style= {{color:"#fff"}}>+84 6969696969</Text>
              </div>
              <div className="footer-contact-info">
                <MailOutlined />
                <Text style= {{color:"#fff"}}>info@bikertown.com</Text>
              </div>
            </Space>
            <Button type="primary" className="footer-join-button">Join Our Club</Button>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <Row justify="space-between" align="middle">
          <Col>
            <Text className="footer-bottom">
              © 2025 BikerTown Club. All rights reserved.
            </Text>
          </Col>
          <Col>
            <Space split={<Divider type="vertical" className="footer-policy-links" />}>
              <Link href="#" className="footer-policy-link">Privacy Policy</Link>
              <Link href="#" className="footer-policy-link">Terms of Service</Link>
              <Link href="#" className="footer-policy-link">Cookie Policy</Link>
            </Space>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
};

export default Footer;
