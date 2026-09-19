import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import LoadingScreen from "./LoadingScreen";

function ProtectedRoute({ children, loading }) {
  const { profile } = useContext(AuthContext);

  console.log("PROTECTED:", {
    loading,
    profile,
  });

  return loading === true ? (
    <LoadingScreen text="Memuat akun..." subtext="Menyiapkan dashboard Anda" />
  ) : profile ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
