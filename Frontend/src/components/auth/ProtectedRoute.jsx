
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/Auth.hook";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Wait until authentication check completes
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Allow authenticated users
  return <Outlet />;
};

export default ProtectedRoute;
