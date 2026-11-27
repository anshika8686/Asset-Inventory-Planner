
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";

const pageTitles = {
  "/": "Dashboard",
  "/assets": "Asset Management",
  "/asset-information": "Asset Information"
};

function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "AssetWise";

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

    </header>
  );
}

export default Header;
