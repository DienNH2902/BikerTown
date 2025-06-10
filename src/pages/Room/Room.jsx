"use client"

import { useState, useEffect, useRef } from "react"
import {Layout,Button,Input,Drawer,List,Avatar,Typography,Space,Tooltip,Divider,Badge,notification,Modal,Tabs,Form,message,App,
} from "antd"
import {AudioMutedOutlined,AudioOutlined,VideoCameraOutlined,VideoCameraAddOutlined,MessageOutlined,TeamOutlined,ShareAltOutlined,PhoneOutlined,CopyOutlined,InfoCircleOutlined,SendOutlined,SmileOutlined,PictureOutlined,DesktopOutlined,EllipsisOutlined,UserAddOutlined,PushpinOutlined,FullscreenOutlined,LockOutlined,UnlockOutlined,
} from "@ant-design/icons"
import "./Room.css"

const { Header, Content, Sider } = Layout
const { Title, Text } = Typography
const { TabPane } = Tabs

// Mock data for participants
const mockParticipants = [
  {
    id: 1,name: "You",avatar: "/placeholder.svg?height=200&width=200",isSelf: true,audioOn: true,videoOn: true,isHost: true,isPinned: false,
  },
  {
    id: 2,name: "John Rider",avatar: "/placeholder.svg?height=200&width=200",isSelf: false,audioOn: true,videoOn: true,isHost: false,isPinned: false,
  },
  {
    id: 3,name: "Sarah Miller",avatar: "/placeholder.svg?height=200&width=200",isSelf: false,audioOn: false,videoOn: true,isHost: false,isPinned: false,
  },
  {
    id: 4,name: "Mike Johnson",avatar: "/placeholder.svg?height=200&width=200",isSelf: false,audioOn: true,videoOn: false,isHost: false,isPinned: false,
  },
]

// Mock chat messages
const initialChatMessages = [
  {
    id: 1,sender: "John Rider",message: "Hi everyone! Can you hear me?",time: "10:02 AM",isFromSelf: false,
  },
  {
    id: 2,sender: "You",message: "Yes, I can hear you clearly.",time: "10:03 AM",isFromSelf: true,
  },
  {
    id: 3,sender: "Sarah Miller",message: "My microphone is having issues, I'll type here for now.",time: "10:04 AM",isFromSelf: false,
  },
]

const Room = () => {
  const { modal } = App.useApp()
  const [participants, setParticipants] = useState(mockParticipants)
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRoomLocked, setIsRoomLocked] = useState(false)
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [leaveModalVisible, setLeaveModalVisible] = useState(false)
  const [pinnedParticipant, setPinnedParticipant] = useState(null)
  const [layout, setLayout] = useState("grid") // grid or spotlight
  const chatEndRef = useRef(null)
  const roomId = "motorbike-riders-123456"
  const meetingLink = `https://meet.example.com/${roomId}`

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate joining the room
  useEffect(() => {
    notification.success({
      message: "You joined the room",
      description: "Welcome to the meeting room. You can now communicate with other participants.",
      placement: "topRight",
      duration: 3,
    })

    // Simulate participants joining after a delay
    const timer = setTimeout(() => {
      notification.info({
        message: "John Rider joined the meeting",
        placement: "topRight",
        duration: 2,
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newChatMessage = {
      id: chatMessages.length + 1,
      sender: "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isFromSelf: true,
    }

    setChatMessages([...chatMessages, newChatMessage])
    setNewMessage("")
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    // Update self in participants
    setParticipants(participants.map((p) => (p.isSelf ? { ...p, audioOn: !isMicOn } : p)))
  }

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn)
    // Update self in participants
    setParticipants(participants.map((p) => (p.isSelf ? { ...p, videoOn: !isCameraOn } : p)))
  }

  const toggleScreenShare = () => {
    if (!isScreenSharing) {
      modal.confirm({
        title: "Share your screen",
        content:
          "This is a simulation. In a real app, you would be prompted to select which screen or window to share.",
        onOk: () => {
          setIsScreenSharing(true)
          notification.info({
            message: "Screen sharing started",
            description: "You are now sharing your screen with all participants.",
            placement: "topRight",
            duration: 3,
          })
        },
      })
    } else {
      setIsScreenSharing(false)
      notification.info({
        message: "Screen sharing stopped",
        placement: "topRight",
        duration: 2,
      })
    }
  }

  const handleLeaveMeeting = () => {
    setLeaveModalVisible(true)
  }

  const confirmLeaveMeeting = () => {
    notification.info({
      message: "You left the meeting",
      placement: "topRight",
      duration: 2,
    })
    // In a real app, this would navigate away or disconnect
    window.history.back()
  }

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink)
    message.success("Meeting link copied to clipboard")
  }

  const togglePinParticipant = (participant) => {
    if (pinnedParticipant === participant.id) {
      setPinnedParticipant(null)
      setLayout("grid")
    } else {
      setPinnedParticipant(participant.id)
      setLayout("spotlight")
    }

    setParticipants(
      participants.map((p) => ({
        ...p,
        isPinned: p.id === participant.id && pinnedParticipant !== participant.id,
      })),
    )
  }

  const toggleRoomLock = () => {
    setIsRoomLocked(!isRoomLocked)
    notification.info({
      message: isRoomLocked ? "Room unlocked" : "Room locked",
      description: isRoomLocked
        ? "New participants can now join the meeting."
        : "New participants will need to be admitted by the host.",
      placement: "topRight",
      duration: 3,
    })
  }

  // Simulate a participant joining after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (participants.length === 4) {
        const newParticipant = {
          id: 5,
          name: "Alex Thompson",
          avatar: "/placeholder.svg?height=200&width=200",
          isSelf: false,
          audioOn: true,
          videoOn: true,
          isHost: false,
          isPinned: false,
        }

        setParticipants([...participants, newParticipant])

        notification.info({
          message: `${newParticipant.name} joined the meeting`,
          placement: "topRight",
          duration: 2,
        })

        // Add a system message to chat
        setChatMessages([
          ...chatMessages,
          {
            id: chatMessages.length + 1,
            sender: "System",
            message: `${newParticipant.name} joined the meeting`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSystem: true,
          },
        ])
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [participants, chatMessages])

  // Render video grid based on layout
  const renderVideoGrid = () => {
    if (layout === "spotlight" && pinnedParticipant) {
      const pinned = participants.find((p) => p.id === pinnedParticipant)
      const others = participants.filter((p) => p.id !== pinnedParticipant)

      return (
        <div className="video-container spotlight-layout">
          <div className="spotlight-video">
            <ParticipantVideo participant={pinned} isSpotlight={true} onPin={togglePinParticipant} />
          </div>
          <div className="other-videos">
            {others.map((participant) => (
              <ParticipantVideo
                key={participant.id}
                participant={participant}
                isSmall={true}
                onPin={togglePinParticipant}
              />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className={`video-container grid-layout participants-${participants.length}`}>
        {participants.map((participant) => (
          <ParticipantVideo key={participant.id} participant={participant} onPin={togglePinParticipant} />
        ))}
      </div>
    )
  }

  return (
    <Layout className="room-container">
      <Header className="room-header">
        <div className="room-title">
          <Title level={4} style={{ margin: 0, color: "white" }}>
            Motorbike Riders Meeting
          </Title>
        </div>
        <div className="room-actions">
          <Tooltip title="Meeting information">
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => setIsInfoOpen(true)}
              style={{ color: "white" }}
            />
          </Tooltip>
          <Tooltip title={isRoomLocked ? "Unlock room" : "Lock room"}>
            <Button
              type="text"
              icon={isRoomLocked ? <LockOutlined /> : <UnlockOutlined />}
              onClick={toggleRoomLock}
              style={{ color: "white" }}
            />
          </Tooltip>
        </div>
      </Header>

      <Content className="room-content">
        {renderVideoGrid()}

        <div className="room-controls">
          <div className="control-group">
            <Tooltip title={isMicOn ? "Turn off microphone" : "Turn on microphone"}>
              <Button
                type="primary"
                shape="circle"
                icon={isMicOn ? <AudioOutlined /> : <AudioMutedOutlined />}
                onClick={toggleMic}
                danger={!isMicOn}
                className="control-button"
              />
            </Tooltip>
            <Tooltip title={isCameraOn ? "Turn off camera" : "Turn on camera"}>
              <Button
                type="primary"
                shape="circle"
                icon={isCameraOn ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />}
                onClick={toggleCamera}
                danger={!isCameraOn}
                className="control-button"
              />
            </Tooltip>
            <Tooltip title={isScreenSharing ? "Stop sharing screen" : "Share screen"}>
              <Button
                type="primary"
                shape="circle"
                icon={<DesktopOutlined />}
                onClick={toggleScreenShare}
                className={`control-button ${isScreenSharing ? "active-share" : ""}`}
              />
            </Tooltip>
          </div>

          <div className="control-group">
            <Tooltip title="Leave meeting">
              <Button
                type="primary"
                shape="circle"
                icon={<PhoneOutlined />}
                danger
                onClick={handleLeaveMeeting}
                className="control-button end-call"
              />
            </Tooltip>
          </div>

          <div className="control-group">
            <Tooltip title="Chat with everyone">
              <Badge
                count={isChatOpen ? 0 : chatMessages.filter((m) => !m.isFromSelf && !m.seen).length}
                overflowCount={9}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<MessageOutlined />}
                  onClick={() => {
                    setIsChatOpen(true)
                    setIsParticipantsOpen(false)
                  }}
                  className={`control-button ${isChatOpen ? "active-control" : ""}`}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Show everyone">
              <Badge count={participants.length} overflowCount={99}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<TeamOutlined />}
                  onClick={() => {
                    setIsParticipantsOpen(true)
                    setIsChatOpen(false)
                  }}
                  className={`control-button ${isParticipantsOpen ? "active-control" : ""}`}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Share meeting">
              <Button
                type="primary"
                shape="circle"
                icon={<ShareAltOutlined />}
                onClick={() => setInviteModalVisible(true)}
                className="control-button"
              />
            </Tooltip>
            <Tooltip title="More options">
              <Button type="primary" shape="circle" icon={<EllipsisOutlined />} className="control-button" />
            </Tooltip>
          </div>
        </div>
      </Content>

      {/* Chat Drawer */}
      <Drawer
        title="In-call messages"
        placement="right"
        onClose={() => setIsChatOpen(false)}
        open={isChatOpen}
        width={320}
        className="chat-drawer"
        headerStyle={{ padding: "12px 16px" }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="chat-messages">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.isFromSelf ? "self-message" : ""} ${msg.isSystem ? "system-message" : ""}`}
            >
              {!msg.isSystem && (
                <div className="message-sender">
                  {msg.isFromSelf ? "You" : msg.sender}
                  <span className="message-time">{msg.time}</span>
                </div>
              )}
              <div className="message-content">{msg.message}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input">
          <Input
            placeholder="Send a message to everyone"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            suffix={
              <Space>
                <SmileOutlined className="chat-icon" />
                <PictureOutlined className="chat-icon" />
                <SendOutlined className="chat-icon send-icon" onClick={handleSendMessage} />
              </Space>
            }
          />
        </div>
      </Drawer>

      {/* Participants Drawer */}
      <Drawer
        title={`People (${participants.length})`}
        placement="right"
        onClose={() => setIsParticipantsOpen(false)}
        open={isParticipantsOpen}
        width={320}
        headerStyle={{ padding: "12px 16px" }}
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            size="small"
            onClick={() => {
              setIsParticipantsOpen(false)
              setInviteModalVisible(true)
            }}
          >
            Add
          </Button>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={participants}
          renderItem={(participant) => (
            <List.Item
              key={participant.id}
              actions={[
                participant.isSelf ? null : (
                  <Tooltip title={participant.isPinned ? "Unpin" : "Pin"}>
                    <Button
                      type="text"
                      icon={<PushpinOutlined />}
                      size="small"
                      onClick={() => togglePinParticipant(participant)}
                      className={participant.isPinned ? "active-pin" : ""}
                    />
                  </Tooltip>
                ),
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot status={participant.audioOn ? "success" : "error"} offset={[-5, 32]}>
                    <Avatar src={participant.avatar} size={40} />
                  </Badge>
                }
                title={
                  <Space>
                    {participant.name}
                    {participant.isHost && <Tag color="blue">Host</Tag>}
                    {participant.isSelf && <Tag color="green">You</Tag>}
                  </Space>
                }
                description={
                  <Space>
                    {!participant.audioOn && <AudioMutedOutlined />}
                    {!participant.videoOn && <VideoCameraAddOutlined />}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>

      {/* Meeting Info Drawer */}
      <Drawer
        title="Meeting details"
        placement="left"
        onClose={() => setIsInfoOpen(false)}
        open={isInfoOpen}
        width={320}
      >
        <div className="meeting-info">
          <Title level={5}>Motorbike Riders Meeting</Title>
          <div className="meeting-link">
            <Input
              value={meetingLink}
              readOnly
              addonAfter={
                <Tooltip title="Copy meeting link">
                  <CopyOutlined onClick={copyMeetingLink} />
                </Tooltip>
              }
            />
          </div>
          <Divider />
          <div className="meeting-details">
            <p>
              <strong>Meeting ID:</strong> {roomId}
            </p>
            <p>
              <strong>Started at:</strong> {new Date().toLocaleTimeString()}
            </p>
            <p>
              <strong>Host:</strong> You
            </p>
          </div>
          <Divider />
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            block
            onClick={() => {
              setIsInfoOpen(false)
              setInviteModalVisible(true)
            }}
          >
            Share invitation
          </Button>
        </div>
      </Drawer>

      {/* Invite Modal */}
      <Modal
        title="Share this meeting"
        open={inviteModalVisible}
        onCancel={() => setInviteModalVisible(false)}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Copy link" key="1">
            <div className="invite-section">
              <p>Share this link with people you want to join the meeting</p>
              <Input.Group compact>
                <Input style={{ width: "calc(100% - 40px)" }} value={meetingLink} readOnly />
                <Button icon={<CopyOutlined />} onClick={copyMeetingLink} />
              </Input.Group>
            </div>
          </TabPane>
          <TabPane tab="Email" key="2">
            <div className="invite-section">
              <p>Send email invitation</p>
              <Form layout="vertical">
                <Form.Item label="Email addresses" name="emails">
                  <Input.TextArea placeholder="Enter email addresses separated by commas" rows={3} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">Send email</Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      {/* Leave Meeting Modal */}
      <Modal
        title="Leave meeting"
        open={leaveModalVisible}
        onCancel={() => setLeaveModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setLeaveModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="leave" type="primary" danger onClick={confirmLeaveMeeting}>
            Leave
          </Button>,
        ]}
      >
        <p>Are you sure you want to leave the meeting?</p>
      </Modal>
    </Layout>
  )
}

// Component for rendering a participant's video
const ParticipantVideo = ({ participant, isSpotlight = false, isSmall = false, onPin }) => {
  return (
    <div className={`video-wrapper ${isSpotlight ? "spotlight" : ""} ${isSmall ? "small" : ""}`}>
      <div className="video-frame">
        {participant.videoOn ? (
          <img src={participant.avatar || "/placeholder.svg"} alt={participant.name} className="video-stream" />
        ) : (
          <div className="video-placeholder">
            <Avatar size={isSmall ? 40 : 80} src={participant.avatar} />
            <div className="participant-name">{participant.name}</div>
          </div>
        )}

        <div className="video-controls">
          <div className="participant-info">
            <Space>
              {!participant.audioOn && <AudioMutedOutlined />}
              <span>
                {participant.name} {participant.isSelf && "(You)"}
              </span>
            </Space>
          </div>

          <div className="video-actions">
            <Tooltip title={participant.isPinned ? "Unpin" : "Pin"}>
              <Button
                type="text"
                icon={<PushpinOutlined />}
                size="small"
                onClick={() => onPin(participant)}
                className={participant.isPinned ? "active-pin" : ""}
              />
            </Tooltip>
            <Tooltip title="Full screen">
              <Button type="text" icon={<FullscreenOutlined />} size="small" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom Tag component
const Tag = ({ children, color }) => <span className={`custom-tag ${color}`}>{children}</span>

export default Room
