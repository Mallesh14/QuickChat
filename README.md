# 💬 QuickChat
QuickChat is a real-time chat application that allows users to instantly communicate with others in private rooms. Built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Socket.IO for real-time messaging.
---
## 🚀 Features
- 🔐 User Authentication (Register & Login)
- 🗨️ Real-time Chat using WebSockets
- 🧑‍🤝‍🧑 Room-based Conversations
- 👀 Typing Indicator
- 🟢 Online Users Display
- 💬 Responsive and Clean Bootstrap UI
- 📩 Contact Developer Section
---
## 📂 Project Structure
QuickChat/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ ├── Chats.js
│ │ │ ├── Landing.js
│ ├── public/
│ └── package.json
│
├── server/ # Express backend
│ ├── routes/
│ │ └── auth.js
│ ├── models/
│ ├── server.js
│ └── package.json
│
├── .env
└── README.md
---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Bootstrap 5
- React Router
- Socket.IO Client

**Backend:**
- Node.js
- Express.js
- Socket.IO
- MongoDB + Mongoose

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat
2. Install dependencies
Server
>>>cd server
>>>npm install
Client
>>>cd client
>>>npm install
3. Create environment variables
In the /server folder, create a .env file:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
4. Run the app
Server:
>>>cd server
>>>npm start
Client:
>>>cd client
>>>npm start
The app should run at http://localhost:3000, and the Socket.IO server at http://localhost:3001.
