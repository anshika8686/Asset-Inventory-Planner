
import { useEffect, useState } from "react";
import api from "../config/api";
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Activity
} from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    categoryStats: [],
    topPriorityAssets: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await api.get("/dashboard/analytics");

        setDashboardData({
          categoryStats: response.data.categoryStats || [],
          topPriorityAssets: response.data.topPriorityAssets || []
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(
          error.response?.data?.message ||
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const {
    categoryStats,
    topPriorityAssets
  } = dashboardData;

  const totals = categoryStats.reduce(
    (result, category) => ({
      total: result.total + category.total,
      healthy: result.healthy + category.healthy,
      attention: result.attention + category.attention,
      critical: result.critical + category.critical,
      notAssessed: result.notAssessed + category.notAssessed
    }),
    {
      total: 0,
      healthy: 0,
      attention: 0,
      critical: 0,
      notAssessed: 0
    }
  );

  const summaryCards = [
    {
      title: "Total Assets",
      value: totals.total,
      icon: Package,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Healthy Assets",
      value: totals.healthy,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Requires Attention",
      value: totals.attention,
      icon: AlertTriangle,
      color: "bg-amber-100 text-amber-600"
    },
    {
      title: "Critical Assets",
      value: totals.critical,
      icon: AlertOctagon,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Not Assessed",
      value: totals.notAssessed,
      icon: Activity,
      color: "bg-slate-100 text-slate-600"
    }
  ];

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Page Introduction */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Asset Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor the health and maintenance priority of your assets.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div className={`rounded-lg p-2 ${card.color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Category-wise Health */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Category-wise Asset Health
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Health distribution across different asset categories.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Healthy</th>
                <th className="px-4 py-3 font-medium">Attention</th>
                <th className="px-4 py-3 font-medium">Critical</th>
                <th className="px-4 py-3 font-medium">Not Assessed</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {categoryStats.map((category) => (
                <tr key={category._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {category._id}
                  </td>
                  <td className="px-4 py-4">{category.total}</td>
                  <td className="px-4 py-4 text-green-600">{category.healthy}</td>
                  <td className="px-4 py-4 text-amber-600">{category.attention}</td>
                  <td className="px-4 py-4 text-red-600">{category.critical}</td>
                  <td className="px-4 py-4 text-slate-500">{category.notAssessed}</td>
                </tr>
              ))}

              {categoryStats.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    No asset data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Priority Assets */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Top 10 Maintenance Priority Assets
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Assets ranked by their Maintenance Priority Index (MPI).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Asset ID</th>
                <th className="px-4 py-3 font-medium">Asset Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Health Score</th>
                <th className="px-4 py-3 font-medium">Health Status</th>
                <th className="px-4 py-3 font-medium">MPI Score</th>
                <th className="px-4 py-3 font-medium">Priority</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {topPriorityAssets.map((asset) => (
                <tr key={asset._id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-800">
                    {asset.assetId}
                  </td>
                  <td className="px-4 py-4">{asset.assetName}</td>
                  <td className="px-4 py-4">{asset.category}</td>
                  <td className="px-4 py-4">{asset.healthScore}</td>
                  <td className="px-4 py-4">{asset.healthStatus}</td>
                  <td className="px-4 py-4 font-semibold">
                    {asset.maintenancePriorityScore}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {asset.maintenancePriority}
                  </td>
                </tr>
              ))}

              {topPriorityAssets.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-500">
                    No assessed assets available for ranking.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
