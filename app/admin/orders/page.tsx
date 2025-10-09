'use client'
import React, { useEffect, useState } from 'react'

interface Order {
  _id: string
  userName: string
  foodName: string
  address: string
  paymentStatus: string
  status: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('https://dummyjson.com/c/46d7-6003-48b2-a6dd', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await res.json()
      setOrders(data.orders || [])
    }
    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          📦 Manage Orders
        </h1>

        {/* Table for larger screens */}
        <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">User</th>
                <th className="p-3">Food</th>
                <th className="p-3">Address</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-t hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3">{o._id}</td>
                  <td className="p-3 font-medium">{o.userName}</td>
                  <td className="p-3">{o.foodName}</td>
                  <td className="p-3">{o.address}</td>
                  <td
                    className={`p-3 font-semibold ${
                      o.paymentStatus === 'paid'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {o.paymentStatus}
                  </td>
                  <td
                    className={`p-3 ${
                      o.status === 'delivered'
                        ? 'text-green-600 font-semibold'
                        : 'text-yellow-600'
                    }`}
                  >
                    {o.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden space-y-4">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-xl shadow p-4 border border-blue-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-blue-700">{o.foodName}</h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    o.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">User:</span> {o.userName}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Address:</span> {o.address}
              </p>
              <p className="text-sm mt-1">
                <span
                  className={`font-semibold ${
                    o.paymentStatus === 'paid'
                      ? 'text-green-600'
                      : 'text-red-500'
                  }`}
                >
                  {o.paymentStatus}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-2">ID: {o._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
