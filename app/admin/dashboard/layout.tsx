'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { FaUsers, FaStore, FaUtensils, FaMoneyBill, FaClipboardList, FaChartPie, FaBars, FaSignOutAlt } from 'react-icons/fa'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaChartPie /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Orders', path: '/admin/orders', icon: <FaClipboardList /> },
    { name: 'Foods', path: '/admin/foods', icon: <FaUtensils /> },
    { name: 'Restaurants', path: '/admin/restaurants', icon: <FaStore /> },
    { name: 'Payments', path: '/admin/payments', icon: <FaMoneyBill /> },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-sky-500 text-white p-4 space-y-3 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:flex-shrink-0`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">TeleEats Admin</h1>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-600 transition ${
                pathname === item.path ? 'bg-blue-600' : ''
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:ml-64">
        {/* Header Navbar */}
        <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-white shadow px-4 h-16 sm:ml-64">
          <div className="flex items-center gap-3">
            <button className="sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FaBars className="text-xl text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">TeleEats Admin Panel</h1>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 mt-16 transition-all">{children}</main>
      </div>
    </div>
  )
}
