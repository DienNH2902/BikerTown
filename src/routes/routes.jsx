import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../Layout/Layout"; 
import Home from "../pages/Home/Home";
import Meeting from "../pages/Meeting/Meeting";
import Todo from "../pages/Todo/Todo";
import History from "../pages/History/History";
import Friends from "../pages/Friends/Friends";
import Messages from "../pages/Messages/Messages";
import Schedules from "../pages/Schedules/Schedules";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Room from "../pages/Room/Room";
import Slider from "../pages/Home/Slider";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="slider" element={<Slider />} />

          {/* <Route index element={<Slider />} />
          <Route path="home" element= {<Home />}/> */}

          {/* Public Routes */}

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="profile" element={<Profile />} />
          <Route path="meeting" element={<Meeting />} />
          <Route path="room" element={<Room />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="todo" element={<Todo />} />
          <Route path="history" element={<History />} />
          <Route path="friends" element={<Friends />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
