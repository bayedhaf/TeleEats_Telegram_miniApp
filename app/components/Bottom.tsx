'use client'

import Link from 'next/link'
import React from 'react'
import { FaHome } from "react-icons/fa"
import { BsCartCheck } from "react-icons/bs"
import { MdBorderColor } from "react-icons/md"
import { CgProfile } from "react-icons/cg"

export default function Bottom() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center py-3 rounded-t-2xl">

      <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <FaHome size={22} />
        <Link href="/dashboard">
          <p className="text-xs mt-1 font-medium">Home</p>
        </Link>
      </div>

      
      <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <BsCartCheck size={22} />
        <Link href="/cart">
          <p className="text-xs mt-1 font-medium">Cart</p>
        </Link>
      </div>

      <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <MdBorderColor size={22} />
        <Link href="/cart">
          <p className="text-xs mt-1 font-medium">Orders</p>
        </Link>
      </div>

     
      <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition">
        <CgProfile size={22} />
        <Link href="/profile">
          <p className="text-xs mt-1 font-medium">Profile</p>
        </Link>
      </div>
    </div>
  )
}
