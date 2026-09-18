import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children, loading }) {
  const { profile } = useContext(AuthContext);

  console.log("PROTECTED:", {
    loading,
    profile,
  });

  return loading === true ? (
    <h1>Loading...</h1>
  ) : profile ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
