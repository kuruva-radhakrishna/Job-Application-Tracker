# Student Job Tracker - Frontend

This is the frontend for the Student Job Tracker application, built with React and Material UI.

## Features

- Add job applications with company, role, status, and application date
- List and filter applications by status and date
- Update application status
- Delete applications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/` - React components
- `src/context/` - React context for state management
- `src/services/` - API service for backend communication

## Backend Connection

The frontend is configured to connect to the backend at `http://localhost:5001/api`. Make sure the backend server is running before using the application.

## Technologies Used

- React
- Material UI
- React Router
- Axios
- date-fns
