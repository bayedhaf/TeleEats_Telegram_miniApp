'use client'

import React, { useEffect, useState } from 'react'

interface User {
  _id: string
  name: string
  email: string
  role: string
  status: string
  joinedAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/c/e2b5-e557-455b-9ccb', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()
        setUsers(data.users || [])
      } catch (err) {
        console.error('Failed to fetch users', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6">
          👥 Manage Users
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-400">No users found.</p>
        ) : (
          <>
            {/* 🌐 Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="p-3 font-medium text-gray-800">{u.name}</td>
                      <td className="p-3 text-gray-600">{u.email}</td>
                      <td className="p-3 capitalize text-gray-700">{u.role}</td>
                      <td
                        className={`p-3 font-semibold ${
                          u.status === 'active'
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}
                      >
                        {u.status}
                      </td>
                      <td className="p-3 text-gray-500">
                        {new Date(u.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 📱 Mobile Card View */}
            <div className="grid md:hidden gap-3">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white rounded-xl border shadow-sm p-4 space-y-1 hover:shadow-md transition"
                >
                  <p className="text-lg font-semibold text-gray-800">{u.name}</p>
                  <p className="text-gray-600 text-sm">{u.email}</p>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="capitalize text-gray-700">{u.role}</span>
                    <span
                      className={`font-semibold ${
                        u.status === 'active'
                          ? 'text-green-600'
                          : 'text-red-500'
                      }`}
                    >
                      {u.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    Joined: {new Date(u.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
