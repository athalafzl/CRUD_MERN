import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "./AuthProvider";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    profile,
    loading,
    login: loginUser,
    logout,
  } = useContext(AuthContext);
  console.log(profile);

  async function handleSubmit(event) {
    event.preventDefault(); // untuk menangani ketika submit browser tidak refresh

    if (login.email.trim().length === 0) {
      setMessage("Email is required");
      return;
    } else if (login.password.trim().length === 0) {
      setMessage("Password is required");
      return;
    }

    const result = await loginUser(login.email, login.password);

    if (result) {
      setMessage(result);
      return;
    }

    setMessage("Login Successful");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  }

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
    /* Ambil login lama, lalu ubah property yang namanya sesuai dengan event.target.name menggunakan nilai dari event.target.value */
  }

  function handleLogout() {
    logout();

    setLogin({
      email: "",
      password: "",
    });

    setMessage("");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            login={login}
            onChange={handleChange}
            onSubmit={handleSubmit}
            message={message}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loading={loading}>
            <Profile
              setMessage={setMessage}
              message={message}
              handleLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Root;
