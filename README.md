
# ChatApp

ChatApp is a full-stack real-time chat application built with Node.js, Express, MongoDB, and React.

Live : https://chatapp-cp6m.onrender.com

## 🚀 Features

- User authentication (login/register)
- Real-time messaging
- Online/offline status
- Message notifications
- Responsive design

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Real-time:** Socket.io
- **Deployment:** Render (or other hosting services)

## 📂 Project Structure

```
chatApp/
│-- backend/  # Express.js server
│   │-- models/
│   │-- routes/
│   │-- controllers/
│   │-- config/
│   └── server.js
│
│-- frontend/ # React app
│   │-- src/
│   │-- components/
│   │-- pages/
│   └── App.js
│
│-- package.json  # Root package.json
│-- README.md
```

## 📦 Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/Fouad-Mesrane/chatApp.git
cd chatApp
```

### **2. Install Dependencies**

```sh
npm install --prefix backend
npm install --prefix frontend
```

### **3. Set Up Environment Variables**

Create a `.env` file in the `backend/` directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **4. Run the App**

```sh
npm run build  # Install dependencies for both frontend and backend
npm start  # Start the backend server
```

## 🌍 Deployment

For deployment on **Render**, ensure your build script is correctly set up in `package.json`:

```json
"scripts": {
  "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "npm run start --prefix backend"
}
```



