import React, { useState, useEffect, useRef } from "react";
import "../assets/scss/Chatbot.css";
import logoChatbot from "../assets/image/logo-chatbot/6014401.png";
import moment from "moment";
import logo from "../assets/image/header/logo-header.jpg";
import { chatbotURL } from "@/config/api";

interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("AccessToken");

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !sessionStorage.getItem("chatbot_greeted")) {
      const timestamp = moment().format("HH:mm");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Chào bạn! Tôi có thể giúp gì cho bạn?",
          sender: "bot",
          timestamp,
        },
      ]);
      sessionStorage.setItem("chatbot_greeted", "true");
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const timestamp = moment().format("HH:mm");
      const userMessage: ChatMessage = {
        text: inputText,
        sender: "user",
        timestamp,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText("");

      try {
        const apiUrl = chatbotURL.startsWith("https://")
          ? chatbotURL
          : chatbotURL.replace("http://", "https://");

        const response = await fetch(`${apiUrl}/chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: inputText,
            session_id: sessionId || "",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMessage: ChatMessage = {
          text:
            data.reply ||
            data.response ||
            "Xin lỗi, tôi không hiểu câu hỏi của bạn.",
          sender: "bot",
          timestamp: moment().format("HH:mm"),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (data.session_id && !sessionId) {
          setSessionId(data.session_id);
          sessionStorage.setItem("chatbot_session_id", data.session_id);
        } else if (data.session_id && sessionId !== data.session_id) {
          setSessionId(data.session_id);
          sessionStorage.setItem("chatbot_session_id", data.session_id);
        }
      } catch (error) {
        console.error("Error sending message:", error);

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Xin lỗi, hiện tại hệ thống chat đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ support.",
            sender: "bot",
            timestamp: moment().format("HH:mm"),
          },
        ]);
      }
    }
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={handleToggleChat}>
        <img src={logoChatbot} alt="Chatbot Logo" width="60" height="60" />
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Chat Support</h4>
            <button className="close-button" onClick={handleCloseChat}>
              ×
            </button>
          </div>
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender}-message-container`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={logo}
                    alt="App Logo"
                    className="bot-logo"
                    width="30"
                    height="30"
                  />
                )}
                <div
                  className={`message-content ${msg.sender}-message-content`}
                >
                  <p className="message-text">{msg.text}</p>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={handleSendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
