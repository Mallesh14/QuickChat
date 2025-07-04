import io from "socket.io-client";
import { useState } from "react";
import Chats from "./Chats";
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const joinRoom = () => {
    setSubmitted(true);
    if (username !== "" && room !== "") {
      socket.emit("join_room", {room , username});
      setShowChat(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {!showChat ? (
        <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">Join a Chat Room</h3>
            <p className="text-muted">Connect with your friends in real-time!</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Nickname</label>
            <input
              type="text"
              className={`form-control ${submitted && username === "" ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              onChange={(e) => setUsername(e.target.value)}
            />
            {submitted && username === "" && (
              <div className="invalid-feedback">Please enter your nickname.</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Room ID</label>
            <input
              type="text"
              className={`form-control ${submitted && room === "" ? "is-invalid" : ""}`}
              placeholder="Enter room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
            {submitted && room === "" && (
              <div className="invalid-feedback">Please enter a room ID.</div>
            )}
          </div>

          <button className="btn btn-primary w-100" onClick={joinRoom}>
            Join Room
          </button>
        </div>
      ) : (
        <Chats socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
