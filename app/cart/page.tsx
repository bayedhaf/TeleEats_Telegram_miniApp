'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Bottom from '../components/Bottom'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cheese Burger',
      price: 150,
      quantity: 1,
      image: '/burger.png', // Add an image to your /public folder
    },
    {
      id: 2,
      name: 'Pizza Slice',
      price: 120,
      quantity: 2,
      image: '/pizza.png',
    },
  ])

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white pb-24">
      {/* Header */}
      <div className="bg-white shadow-md p-5 text-center font-semibold text-gray-800 text-lg">
        🛍️ My Cart
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-4 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white shadow-sm rounded-xl p-3 justify-between"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">ETB {item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setCartItems((prev) =>
                    prev.map((p) =>
                      p.id === item.id && p.quantity > 1
                        ? { ...p, quantity: p.quantity - 1 }
                        : p
                    )
                  )
                }
                className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-gray-700"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-semibold text-gray-800">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  setCartItems((prev) =>
                    prev.map((p) =>
                      p.id === item.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                    )
                  )
                }
                className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="fixed bottom-20 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-3px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between text-gray-800 font-semibold text-lg mb-3">
          <span>Total</span>
          <span>ETB {total}</span>
        </div>
        <button className="w-full bg-sky-500 text-white py-3 rounded-xl font-semibold hover:bg-sky-600 transition">
          Proceed to Checkout
        </button>
      </div>

      {/* Bottom Navigation */}
      <Bottom />
    </div>
  )
}
