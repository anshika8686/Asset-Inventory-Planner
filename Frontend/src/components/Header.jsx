
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../hooks/Auth.hook";

const pageTitles = {
  "/": "Dashboard",
  "/assets": "Asset Management",
  "/asset-information": "Asset Information"
};

function Header() {
  const {user,logout}=useAuth()
  const navigate=useNavigate()
  const location = useLocation();
  const title = pageTitles[location.pathname] || "AssetWise";

  async function handleLogout() {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage your industrial assets
        </p>
      </div>

      <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
        <Bell size={21} />
      </button>

      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          AssetWise
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name}
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>

    </header>
  );
}

export default Header;
