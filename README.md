
# 🎯 Student Job Tracker

A full-stack web application designed to help students efficiently manage and track their job applications. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and styled using Material UI.

## 🚀 Live Demo

Check out the live application here: [Student Job Tracker](https://job-application-tracker-kuruva-radhakrishnas-projects.vercel.app/)

## 🛠️ Features

- **Add Applications**: Input job details including company name, role, status, and application date.
- **View Applications**: Display a list of all job applications with filtering options based on status and date.
- **Update Status**: Modify the status of existing applications to keep track of progress.
- **Delete Applications**: Remove applications that are no longer relevant.
- **User Authentication**: Secure login and registration system to protect user data.
- **User Profile**: Update your profile details, resume, and profile picture.
- **Responsive Design**: Optimized for various devices to ensure a seamless user experience.

## 🧰 Tech Stack

- **Frontend**:
  - React
  - Material UI
  - React Router
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication

## 📁 Project Structure

```
Job-Application-Tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── index.js
├── .gitignore
├── package.json
└── README.md
```

## 🖥️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kuruva-radhakrishna/Job-Application-Tracker.git
   cd Job-Application-Tracker
   ```

2. **Setup Backend**:

   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory and add the following:

     ```env
     PORT=5001
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

3. **Setup Frontend**:

   ```bash
   cd ../frontend
   npm install
   ```

   - Start the frontend development server:

     ```bash
     npm run dev
     ```

   - Open your browser and navigate to `http://localhost:5173`

## 📸 Screenshots

### 🔐 Login
<img src="https://github.com/user-attachments/assets/fbb80e64-0361-44dd-baa8-01e007d4120f" width="600"/>

### 📝 Register
<img src="https://github.com/user-attachments/assets/400dbcf6-42b0-4cb2-9f5e-703d75b97a10" width="600"/>

### ➕ Create New Application
<img src="https://github.com/user-attachments/assets/01fc1d78-beb7-4348-a306-bd21e3602d65" width="600"/>

### 📋 View All Applications
<img src="https://github.com/user-attachments/assets/ef7c9df0-21c3-424c-b353-f85cf64d489f" width="600"/>

### 🔍 Filter Applications by Status
<img src="https://github.com/user-attachments/assets/683003c6-2358-4d99-969b-84e6a071ff95" width="600"/>

### 📄 Update Your Profile and Upload Resume
<img src="https://github.com/user-attachments/assets/e37db8d6-0740-403c-b221-887d39b9ea13" width="600"/>

### 🖼️ Update Your Profile Picture
<img src="https://github.com/user-attachments/assets/c037ee85-1699-4323-873d-dcd77275840f" width="600"/>

## 📦 API Endpoints

- **Authentication**:
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login user

- **Applications**:
  - `GET /api/applications` - Get all applications
  - `POST /api/applications` - Add a new application
  - `PUT /api/applications/:id` - Update an application
  - `DELETE /api/applications/:id` - Delete an application

## 📝 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
