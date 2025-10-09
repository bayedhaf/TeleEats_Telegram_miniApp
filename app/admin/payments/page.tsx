'use client'

import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'

// ✅ Define a proper type instead of `any`
interface Payment {
  _id: string
  orderId: string
  amount: number
  method: string
  status: 'success' | 'failed' | 'pending'
  createdAt: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/payments.php`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const data = await res.json()
        setPayments(data.payments || [])
      } catch (err) {
        console.error('Error fetching payments:', err)
      }
    }
    fetchPayments()
  }, [])

  // Helper to show colored status icons
  const renderStatus = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="flex items-center gap-1 text-green-600 font-semibold"><FaCheckCircle /> Success</span>
      case 'failed':
        return <span className="flex items-center gap-1 text-red-600 font-semibold"><FaTimesCircle /> Failed</span>
      default:
        return <span className="flex items-center gap-1 text-yellow-500 font-semibold"><FaClock /> Pending</span>
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 text-center">💳 Payment Management</h1>

      <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-100">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
            <tr>
              <th className="p-3 text-left">Payment ID</th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{p._id.slice(-6)}</td>
                  <td className="p-3">{p.orderId}</td>
                  <td className="p-3 font-semibold text-gray-700">{p.amount} Br</td>
                  <td className="p-3 capitalize">{p.method}</td>
                  <td className="p-3">{renderStatus(p.status)}</td>
                  <td className="p-3">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
