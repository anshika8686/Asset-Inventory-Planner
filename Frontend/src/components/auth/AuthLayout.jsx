import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="flex w-full max-w-5xl min-h-[620px] overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Left panel */}
        <div className="hidden w-1/2 flex-col justify-between bg-slate-950 p-10 text-white md:flex">
          <div>
            <h1 className="text-2xl font-bold">AssetWise</h1>
            <p className="text-sm text-slate-400">
              Asset Inventory Planner
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              Smarter Asset Management.
              <span className="text-blue-400">
                {" "}Better Decisions.
              </span>
            </h2>
            <p className="mt-4 text-slate-400">
              Monitor asset health, track maintenance,
              and make informed decisions from one place.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            AssetWise · Inventory Management
          </p>
        </div>

        {/* Right panel */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;