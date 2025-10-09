'use client'

import React, { useEffect, useState } from 'react'
import { FaUtensils, FaPhoneAlt, FaMapMarkerAlt, FaPlusCircle } from 'react-icons/fa'
import Image from 'next/image'
import type { Restaurant } from '../types'

export default function RestaurantsPage() {
  const [list, setList] = useState<Restaurant[]>([])
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    logo: null as File | null,
  })
  const [loading, setLoading] = useState(false)

  // ✅ Fetch restaurants list
  useEffect(() => {
    const fetchRest = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/c/f315-08df-4256-927c`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const d = await res.json()
        setList(d.restaurants || [])
      } catch {
        console.error('Error fetching restaurants')
      }
    }
    fetchRest()
  }, [])

  // ✅ Submit form handler
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const fd = new FormData()
    fd.append('name', form.name)
    fd.append('address', form.address)
    fd.append('phone', form.phone)
    if (form.logo) fd.append('logo', form.logo)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/add_restaurant.php`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: fd,
      })
      const d = await res.json()
      if (d.success) {
        setList((prev) => [d.restaurant, ...prev])
        setForm({ name: '', address: '', phone: '', logo: null })
      } else {
        alert(d.message || 'Failed to add restaurant')
      }
    } catch {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-6 px-4">
      {/* ---- Form Card ---- */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <FaUtensils className="text-2xl" />
          <h1 className="text-2xl font-bold">Manage Restaurants and Hotels and Others Food story</h1>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaPhoneAlt className="text-gray-400" />
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, logo: e.target.files ? e.target.files[0] : null })}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            disabled={loading}
            className="w-full bg-sky-500 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-sky-600 transition disabled:bg-gray-400"
          >
            <FaPlusCircle />
            <span>{loading ? 'Adding...' : 'Add Restaurant'}</span>
          </button>
        </form>
      </div>

      {/* ---- List Section ---- */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center sm:text-left">
          📋 Restaurant List
        </h2>

        {/* Mobile Cards */}
        <div className="grid sm:hidden gap-4">
          {list.length === 0 ? (
            <p className="text-center text-gray-500">No restaurants found.</p>
          ) : (
            list.map((r) => (
              <div
                key={r._id}
                className="bg-white rounded-xl shadow p-4 flex items-center space-x-4"
              >
                <div className="flex-shrink-0">
                  {r.logoUrl ? (
                    <Image
                      src={r.logoUrl}
                      alt={r.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      🏬
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{r.name}</h3>
                  <p className="text-gray-500 text-sm">{r.address}</p>
                  <p className="text-gray-500 text-sm">{r.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3">Logo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {r.logoUrl ? (
                      <Image
                        src={r.logoUrl}
                        alt={r.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-3 font-medium">{r.name}</td>
                  <td className="p-3">{r.address}</td>
                  <td className="p-3">{r.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
