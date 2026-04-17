import Signup from "./components/Signup";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/userSlice";
import { connectSocket, disconnectSocket, getSocket } from "./socket";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useSelector((store) => store.user);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser) return;

    // socket connect
    connectSocket(authUser._id);

    const socket = getSocket();

    if (socket) {
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }

    return () => {
      // cleanup
      disconnectSocket();
    };
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />{" "}
    </div>
  );
}

export default App;
