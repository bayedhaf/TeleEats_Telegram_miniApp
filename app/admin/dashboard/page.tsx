'use client'
import React, { useEffect, useState } from 'react'
import { FaUsers, FaUtensils, FaStore, FaMoneyBill, FaClipboardList } from 'react-icons/fa'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface Stats {
  users: number
  orders: number
  foods: number
  restaurants: number
  revenue: number
}

interface RecentOrder {
  _id: string
  userName: string
  foodName: string
  paymentStatus: string
  status: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    users: 0,
    orders: 0,
    foods: 0,
    restaurants: 0,
    revenue: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('http://localhost/teleeats-backend/api/dashboard.php', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await res.json()
        setStats(data.stats)
        setRecentOrders(data.recentOrders)
      } catch (err) {
        console.error('Error loading dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const salesData = [
    { day: 'Mon', sales: 240 },
    { day: 'Tue', sales: 320 },
    { day: 'Wed', sales: 280 },
    { day: 'Thu', sales: 360 },
    { day: 'Fri', sales: 410 },
    { day: 'Sat', sales: 380 },
    { day: 'Sun', sales: 290 },
  ]

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">📊 Admin Dashboard</h1>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Users" value={stats.users} icon={<FaUsers />} color="bg-blue-500" />
        <StatCard title="Orders" value={stats.orders} icon={<FaClipboardList />} color="bg-green-500" />
        <StatCard title="Foods" value={stats.foods} icon={<FaUtensils />} color="bg-orange-500" />
        <StatCard title="Restaurants" value={stats.restaurants} icon={<FaStore />} color="bg-purple-500" />
        <StatCard title="Revenue" value={`₵${stats.revenue.toLocaleString()}`} icon={<FaMoneyBill />} color="bg-yellow-500" />
      </div>

      {/* --- Sales Chart --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Weekly Sales</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* --- Recent Orders --- */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Recent Orders</h2>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order) => (
              <div key={order._id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <p className="font-semibold">{order.foodName}</p>
                <p className="text-gray-500 text-sm">By: {order.userName}</p>
                <p className={`text-sm font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {order.paymentStatus}
                </p>
                <p className="capitalize text-gray-600">{order.status}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No recent orders found.</p>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Food</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{order._id}</td>
                    <td className="p-3">{order.userName}</td>
                    <td className="p-3">{order.foodName}</td>
                    <td className={`p-3 font-semibold ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                      {order.paymentStatus}
                    </td>
                    <td className="p-3 capitalize">{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-3">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* --- Stat Card Component --- */
interface StatProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, icon, color }: StatProps) {
  return (
    <div className={`flex items-center justify-between ${color} text-white p-4 rounded-xl shadow-md`}>
      <div>
        <h3 className="text-sm uppercase font-medium opacity-90">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  )
}
