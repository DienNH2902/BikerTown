import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  HistoryOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  CheckSquareOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/helmetlogo.jpg";
import "./Sidebar.css"; 

const { Sider } = Layout;

const Sidebar = ({ collapsed, isLoggedIn }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("home");

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home";
    setSelectedKey(path);
  }, [location]);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
      disabled: false,
    },
    {
      key: "meeting",
      icon: <VideoCameraOutlined />,
      label: <Link to="/meeting">Meeting</Link>,
      disabled: !isLoggedIn,
    },
    {
      key: "schedules",
      icon: <EnvironmentOutlined />,
      label: <Link to="/schedules">Schedules</Link>,
      disabled: !isLoggedIn,
    },
    {
      key: "todo",
      icon: <CheckSquareOutlined />,
      label: <Link to="/todo">To Do</Link>,
      disabled: !isLoggedIn,
    },
    {
      key: "history",
      icon: <HistoryOutlined />,
      label: <Link to="/history">History</Link>,
      disabled: !isLoggedIn,
    },
    {
      key: "friends",
      icon: <TeamOutlined />,
      label: <Link to="/friends">Friends</Link>,
      disabled: !isLoggedIn,
    },
    {
      key: "messages",
      icon: <MessageOutlined />,
      label: <Link to="/messages">Messages</Link>,
      disabled: !isLoggedIn,
    },
  ];

  return (
    <Sider className="sidebar-sider" trigger={null} collapsible collapsed={collapsed} theme="light">
      <div className="sidebar-logo">
        <img src={logo} alt="Motorbike Riders Logo" />
      </div>
      <Menu
        className="sidebar-menu"
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
      />
      
      {isLoggedIn && (
        <div className={`sidebar-notification ${collapsed ? "hidden" : ""}`}>
          <div className="shake">
            <BellOutlined />
          </div>
          <p className="notify-bold">Next: Sunday 10:00 AM</p>
          <p className="notify-location">Ngã Tư Hàng Xanh</p>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
