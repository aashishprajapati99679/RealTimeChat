import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Singup from "./components/Singup";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";
import { setSocket } from "./redux/socketSlice";
import EdithData from "./components/EdithData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },

  {
    path: "/register",
    element: <Singup />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/edit",
    element: <EdithData />
  },
])



function App() {

  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
      const socketio = io(BASE_URL, {
        query: { userId: authUser._id },
      });

      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <div className=" p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;