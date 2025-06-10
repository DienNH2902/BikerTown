import { useState, useRef, useEffect } from "react"
import {
  Typography,
  Input,
  Button,
  List,
  Avatar,
  Empty,
  Badge
} from "antd"
import {
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
  SearchOutlined
} from "@ant-design/icons"

import "./Messages.css"

const { Title, Paragraph, Text } = Typography

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [searchText, setSearchText] = useState("")
  const messagesEndRef = useRef(null)

  const [chats, setChats] = useState([
    {
      id: 1,
      user: {
        id: 1,
        name: "Khoa Can",
        avatar: "https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/481997303_1723078375292253_1964171346106551630_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Cq4oCmsIOlkQ7kNvwGN_wA_&_nc_oc=AdnVPSY3mr5Lzd6ES0RI7TuH1_QQtAzl1NSHDT5aXz4CSE2eg5UfqoFbbojrnudTSiz5-F1f9LRyzqiNWnTK7jLl&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=vi1fPUMa4T0E3n3WRKxmNQ&oh=00_AYHMIbR7vH_gTv5wEOMPu-we_k39NqXa_WoiT0xm1RtwAQ&oe=67F74B77",
        status: "online",
      },
      messages: [
        { id: 1, text: "Hey, are you joining the weekend ride?", sender: "them", time: "10:30 AM" },
        { id: 2, text: "Yes, I'm planning to. What time are we meeting?", sender: "me", time: "10:35 AM" },
        { id: 3, text: "We're meeting at 7 AM at the usual spot.", sender: "them", time: "10:38 AM" },
        { id: 4, text: "Great! I'll be there.", sender: "me", time: "10:40 AM" },
      ],
      unread: 0,
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Thùy Dương",
        avatar: "https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/475499452_3963012600646759_9006226833427451069_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yhoZxVNaSkEQ7kNvwF1VjiK&_nc_oc=AdkgTUKw6dqGcxyaBVd_sge2VfAcCiLyl7hjEO9SeR5lxRHrF8oXvrQLv3PKQAW4wifnCa2vb7VOvA9IeIxM_myA&_nc_zt=23&_nc_ht=scontent-hkg1-2.xx&_nc_gid=sGFjP7I9Vk9fpE__DOyHmw&oh=00_AYHOiDN-CFQUcp5ldjSvGZTrsgi_N31CVDkibJ-GJw--3w&oe=67F72BD7",
        status: "offline",
      },
      messages: [
        { id: 1, text: "Did you check out the new route I shared?", sender: "them", time: "Yesterday" },
        { id: 2, text: "Not yet, but I will tonight!", sender: "me", time: "Yesterday" },
      ],
      unread: 2,
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Thiện Nhân",
        avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/475259674_2124725214616052_2333513328939203981_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=IZRaV5lrJY0Q7kNvwEZFvM8&_nc_oc=AdlHfurMhAgV9jlPlJf63J8NP6eW4Khcm9cwbjan8TpXfA3pzk-pkXFNJfH-cMBRaOvEkgrB8KwmYd2Q8ZUJcbml&_nc_zt=23&_nc_ht=scontent-hkg4-1.xx&_nc_gid=TE9--cX1Jo_mlVrR-r7pFQ&oh=00_AYHUOPI_uqNvyegCeVGKIxnqItALcslc1dyhlvtr8SNC4A&oe=67F753B2",
        status: "online",
      },
      messages: [
        { id: 1, text: "Can you recommend a good mechanic?", sender: "me", time: "Monday" },
        {
          id: 2,
          text: "Sure, I know a great one near downtown. I'll send you the details.",
          sender: "them",
          time: "Monday",
        },
        { id: 3, text: "Thanks, I appreciate it!", sender: "me", time: "Monday" },
      ],
      unread: 1,
    },
  ])

  useEffect(() => {
    scrollToBottom()
  }, [selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: chat.messages.length + 1,
              text: messageText,
              sender: "me",
              time: "Just now",
            },
          ],
        }
      }
      return chat
    })

    setChats(updatedChats)
    setMessageText("")
    setSelectedChat(updatedChats.find((chat) => chat.id === selectedChat.id))

    setTimeout(scrollToBottom, 100)
  }

  const handleChatSelect = (chat) => {
    const updatedChats = chats.map((c) =>
      c.id === chat.id ? { ...c, unread: 0 } : c
    )
    setChats(updatedChats)
    setSelectedChat(chat)
  }

  const filteredChats = chats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="messages-container">
      <Title level={2} className="messages-title">Messages</Title>
      <Paragraph className="messages-description">
        Chat with your friends and plan your next ride together.
      </Paragraph>

      <div className="chat-wrapper">
        {/* Chat List */}
        <div className="chat-list">
          <div className="chat-search">
            <Input
              placeholder="Search conversations..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="chat-list-scroll">
            {filteredChats.length > 0 ? (
              <List
                dataSource={filteredChats}
                renderItem={(chat) => (
                  <List.Item
                    className={`chat-item ${selectedChat?.id === chat.id ? "chat-item-selected" : ""}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={chat.unread > 0} color="red">
                          <Avatar
                            src={chat.user.avatar}
                            style={{
                              border: chat.user.status === "online" ? "2px solid #52c41a" : "none",
                            }}
                          />
                        </Badge>
                      }
                      title={
                        <div className="chat-meta-name">
                          <Text strong>{chat.user.name}</Text>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {chat.messages[chat.messages.length - 1]?.time}
                          </Text>
                        </div>
                      }
                      description={
                        <div className="chat-meta-description">
                          <Text
                            ellipsis={{ tooltip: chat.messages[chat.messages.length - 1]?.text }}
                            style={{ maxWidth: "150px" }}
                          >
                            {chat.messages[chat.messages.length - 1]?.text}
                          </Text>
                          {chat.unread > 0 && (
                            <Badge count={chat.unread} size="small" style={{ marginLeft: "8px" }} />
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty
                description="No conversations found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ margin: "40px 0" }}
              />
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="chat-window">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="chat-header">
                <Avatar
                  src={selectedChat.user.avatar}
                  className="chat-header-info"
                  style={{
                    border: selectedChat.user.status === "online" ? "2px solid #52c41a" : "none",
                  }}
                />
                <div>
                  <Text strong>{selectedChat.user.name}</Text>
                  <div>
                    <Badge
                      status={selectedChat.user.status === "online" ? "success" : "default"}
                      text={selectedChat.user.status === "online" ? "Online" : "Offline"}
                    />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-bubble ${message.sender === "me" ? "message-me" : "message-them"}`}
                  >
                    {message.text}
                    <div className={`message-time ${message.sender === "me" ? "message-time-right" : "message-time-left"}`}>
                      {message.time}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="message-input-wrapper">
                <Button type="text" icon={<PaperClipOutlined />} style={{ marginRight: 8 }} />
                <Button type="text" icon={<SmileOutlined />} style={{ marginRight: 8 }} />
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onPressEnter={handleSendMessage}
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  style={{ marginLeft: 8 }}
                  disabled={!messageText.trim()}
                />
              </div>
            </>
          ) : (
            <div className="chat-placeholder">
              <img
                src="https://thanhnien.mediacdn.vn/Uploaded/phongdt/2022_10_23/cs-go-6318.jpg"
                alt="Select a conversation"
              />
              <Title level={4}>Select a conversation</Title>
              <Paragraph type="secondary" style={{ textAlign: "center" }}>
                Choose a friend from the list to start chatting
              </Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages

