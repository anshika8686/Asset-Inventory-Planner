
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Boxes
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  },
  {
    name: "Asset Management",
    path: "/assets",
    icon: Package
  },
  {
    name: "Asset Information",
    path: "/asset-information",
    icon: ClipboardList
  }
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col bg-slate-950 text-white">

      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Boxes size={23} />
        </div>

        <div>
          <h1 className="text-lg font-bold">AssetWise</h1>
          <p className="text-xs text-slate-400">Asset Inventory Planner</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-6 py-5">
        <p className="text-xs text-slate-500">AssetWise</p>
        <p className="mt-1 text-sm text-slate-300">Inventory Management</p>
      </div>

    </aside>
  );
}

export default Sidebar;
