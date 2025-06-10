import { useState, useEffect } from "react";
import { Layout, ConfigProvider, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Layout.css";

const { Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check login state on location changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const token = JSON.parse(local).token;
        const response = axios.get("http://localhost:8000/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error fetching user data:", error);

        if (error.response && error.response.status == 401) {
          console.log("Token is invalid.");
          message.error("Session expired");
          navigate("/login");
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
      const protectedRoutes = [
        "/schedules",
        "/todo",
        "/history",
        "/friends",
        "/messages",
        "/profile",
        "/meeting",
        "/room",
        "/home",
      ];
      if (protectedRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  // Listen for custom login/logout events to update state immediately
  useEffect(() => {
    const handleUserChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    window.addEventListener("user-login", handleUserChange);
    window.addEventListener("user-logout", handleUserChange);

    return () => {
      window.removeEventListener("user-login", handleUserChange);
      window.removeEventListener("user-logout", handleUserChange);
    };
  }, [location.pathname, navigate]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("user-logout")); // Notify layout immediately
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#f5222d",
          borderRadius: 6,
        },
      }}
    >
      <Layout className="full-height-layout">
        {isLoggedIn && (
          <Sidebar collapsed={collapsed} isLoggedIn={isLoggedIn} />
        )}
        <Layout>
          <Header
            isLoggedIn={isLoggedIn}
            toggleSidebar={toggleSidebar}
            onLogout={handleLogout}
            collapsed={collapsed}
            user={user}
          />
          <Layout className="inner-layout">
            <Content className="content-style">
              <Outlet />
            </Content>
          </Layout>
          <Footer />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
