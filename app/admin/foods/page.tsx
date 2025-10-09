'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface Food {
  name: string
  price: number
  type: string
  image: File | null
  preview?: string
}

export default function FoodsPage() {
  const [food, setFood] = useState<Food>({ name: '', price: 0, type: '', image: null })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('name', food.name)
    formData.append('price', food.price.toString())
    formData.append('type', food.type)
    if (food.image) formData.append('image', food.image)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/add_food.php`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    })

    const data = await res.json()
    setLoading(false)
    alert(data.message || '✅ Food added successfully!')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-white p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
        🍔 Add New Food
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm sm:max-w-md space-y-4 border border-gray-100"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Food Name</label>
          <input
            type="text"
            placeholder="e.g. Beef Burger"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price (Birr)</label>
          <input
            type="number"
            placeholder="e.g. 150"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setFood({ ...food, price: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Type</label>
          <input
            type="text"
            placeholder="Burger, Pizza, Pasta..."
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => setFood({ ...food, type: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null
              setFood({
                ...food,
                image: file,
                preview: file ? URL.createObjectURL(file) : undefined,
              })
            }}
          />
        </div>

        {food.preview && (
          <div className="flex justify-center mt-2">
            <Image
              src={food.preview}
              alt="Preview"
              width={100}
              height={100}
              className="rounded-xl object-cover border"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-xl font-semibold text-white transition ${
            loading ? 'bg-sky-500 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-700'
          }`}
        >
          {loading ? 'Adding...' : 'Add Food'}
        </button>
      </form>
    </div>
  )
}
