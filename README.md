# The CMDian Memories

A college memories sharing platform built with MERN stack, allowing students to share, like, and comment on their favorite college moments.

## 🚀 Features

- **Authentication**: Secure JWT-based authentication with HttpOnly cookies
- **Profile Management**: Customizable user profiles with bio and profile picture
- **Post Management**: Upload, edit, and delete memory posts with images
- **Social Features**: Like, comment, and download posts
- **Responsive Design**: Mobile and desktop friendly interface using Material UI

## 🛠 Tech Stack

- **Frontend**: React.js, Material UI, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Cloud Storage**: Cloudinary
- **Authentication**: JWT with HttpOnly Cookies

## 📦 Project Structure

```
/frontend
  /public
  /src
    /api
    /components
    /pages
    /contexts
    /utils
/backend
  /controllers
  /models
  /routes
  /middlewares
  /utils
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

## 📚 API Documentation

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user

### User
- GET `/api/user/profile/:userId` - Get user profile
- PUT `/api/user/edit-profile` - Update profile

### Posts
- POST `/api/post/upload` - Upload new post
- GET `/api/post/` - Get all posts
- GET `/api/post/:postId` - View single post
- PUT `/api/post/like/:postId` - Like/Unlike post
- DELETE `/api/post/:postId` - Delete post

### Comments
- POST `/api/comment/:postId` - Add comment
- PUT `/api/comment/:commentId` - Edit comment
- DELETE `/api/comment/:commentId` - Delete comment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 