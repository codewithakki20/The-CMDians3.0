import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChatPage from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Users from './pages/AllUsers';
import Gallery from './pages/Gallery';

import { connectSocket, closeSocket } from './lib/socket'; // ✅ Import new module
import { RingLoader } from 'react-spinners'; // ✅ Import React Spinner

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const browserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: '/profile/:id', element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
      { path: '/account/edit', element: <ProtectedRoutes><EditProfile /></ProtectedRoutes> },
      { path: '/chat', element: <ProtectedRoutes><ChatPage /></ProtectedRoutes> },
      { path: '/users', element: <ProtectedRoutes><Users /></ProtectedRoutes> },
      { path: '/gallery', element: <ProtectedRoutes><Gallery /></ProtectedRoutes> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    if (user) {
      const socket = connectSocket(user._id);

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socket.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      // Setting loading to false once socket is connected
      setLoading(false);

      return () => {
        closeSocket();
      };
    } else {
      setLoading(false); // If there's no user, set loading to false
      closeSocket();
    }
  }, [user, dispatch]);

  // If the app is still loading, show the RingLoader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <RingLoader size={100} color="#3b82f6" />
      </div>
    );
  }

  return <RouterProvider router={browserRouter} />;
}

export default App;
