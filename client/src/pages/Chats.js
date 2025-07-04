import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Chats({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  let typingTimeout;

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      socket.emit("send_message", messageData);
      setCurrentMessage("");
      socket.emit("stop_typing", { room });
    }
  };

  const handleTyping = (e) => {
    setCurrentMessage(e.target.value);
    socket.emit("typing", { room, username });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", { room });
    }, 1500);
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    const updateUsersHandler = (users) => {
      setOnlineUsers(users);
    };

    const typingHandler = (user) => {
      if (user !== username) {
        setTypingUser(user);
      }
    };

    const stopTypingHandler = () => {
      setTypingUser(null);
    };

    socket.on("receive_message", receiveMessageHandler);
    socket.on("update_users", updateUsersHandler);
    socket.on("user_typing", typingHandler);
    socket.on("user_stop_typing", stopTypingHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
      socket.off("update_users", updateUsersHandler);
      socket.off("user_typing", typingHandler);
      socket.off("user_stop_typing", stopTypingHandler);
    };
  }, [socket, username]);

  return (
    <div className="container-fluid vh-100 p-0 d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "240px" }}>
        <h6>Users in Room</h6>
        <ul className="list-unstyled mt-3">
          {onlineUsers.map((user, idx) => (
            <li key={idx} className={`mb-2 ${user === username ? "text-info" : ""}`}>
              <i className="bi bi-person-fill me-2 text-success"></i>
              {user === username ? `${user} (You)` : user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        {/* Header */}
        <div className="bg-primary text-white py-3 px-4 shadow-sm">
          <h5 className="m-0">Live Chat - Room: <span className="text-warning">{room}</span></h5>
        </div>

        {/* Chat Body */}
        <div className="flex-grow-1 overflow-auto px-3 py-2" style={{ background: "#f5f5f5" }}>
          <ScrollToBottom className="h-100">
            {messageList.map((msg, idx) => {
              const isYou = msg.author === username;
              return (
                <div
                  key={idx}
                  className={`d-flex ${isYou ? "justify-content-end" : "justify-content-start"} mb-3`}
                >
                  <div
                    className={`p-3 rounded-4 shadow-sm ${isYou ? "bg-primary text-white" : "bg-white text-dark"}`}
                    style={{ maxWidth: "70%" }}
                  >
                    <div className="fw-semibold mb-1 small">
                      {isYou ? "You" : msg.author}
                    </div>
                    <div>{msg.message}</div>
                    <div className="text-end small mt-2 text-muted">{msg.time}</div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>

        {/* Typing Indicator */}
        {typingUser && (
          <div className="px-4 py-2 text-muted small">
            <em>{typingUser} is typing...</em>
          </div>
        )}

        {/* Footer */}
        <div className="border-top d-flex align-items-center p-3 bg-white">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={handleTyping}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="btn btn-dark" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chats;
