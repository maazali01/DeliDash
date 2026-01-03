# DD - Restaurant & Product Management System

A full-stack web application for managing restaurants and products with separate admin and user interfaces.

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Frontend
- React.js
- CSS3
- Context API (Cart Management)

## 📁 Project Structure

```
DD/
├── Backend/
│   ├── controllers/        # Business logic
│   ├── middlewares/        # Authentication & validation
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Entry point
├── Frontend/
│   ├── public/            # Static files
│   └── src/
│       └── components/    # React components
│           ├── Admin/     # Admin panel
│           ├── HomePage/  # User interface
│           ├── LoginSignup/ # Authentication
│           ├── NavBar/    # Navigation
│           ├── Contact/   # Contact page
│           └── background/ # UI elements
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file if needed:
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔑 Features

### User Features
- User authentication (Login/Signup)
- Browse restaurants
- View products
- Shopping cart functionality
- Product ordering

### Admin Features
- Admin authentication
- Manage restaurants (CRUD operations)
- Manage products (CRUD operations)
- View orders
- User management

## 📡 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User Side
- User-specific routes for browsing and ordering

### Admin Side
- Protected admin routes for management operations

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header.

## 🛠️ Development

### Running Both Services Concurrently

You can run both frontend and backend simultaneously by opening two terminal windows or using a tool like `concurrently`.

### Code Structure
- **Controllers**: Handle business logic
- **Models**: Define database schemas
- **Routes**: Define API endpoints
- **Middlewares**: Handle authentication and validation
- **Components**: React UI components organized by feature

## 📝 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For any queries, please contact the project maintainer.
