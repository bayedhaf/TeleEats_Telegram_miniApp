'use client'

import React from 'react'
import Image from 'next/image'
import Bottom from '../components/Bottom'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center pb-20">
  
      <div className="w-full bg-white shadow-md p-6 flex flex-col items-center rounded-b-3xl ">
        <Image
          src="/profile-avatar.png" 
          alt="Profile Picture"
          width={90}
          height={90}
          className="rounded-full border-4 border-blue-500 shadow"
        />
        <h2 className="text-xl font-semibold mt-3 text-gray-800">Bayisa Balcha</h2>
        <p className="text-gray-500 text-sm">bayisa@example.com</p>
      </div>

     
      <div className="w-[90%] mt-6 space-y-4 mb-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Account Settings</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>📱 Phone Number: +251 900 000 000</li>
            <li>🏠 Address: Adama, Ethiopia</li>
            <li>🎂 Birthday: Jan 1, 2000</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Preferences</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>🌙 Dark Mode: Off</li>
            <li>🔔 Notifications: On</li>
          </ul>
        </div>

        <button className="w-full bg-sky-500 text-white py-2 rounded-xl mt-6 hover:bg-sky-600 transition">
          Log Out
        </button>
      </div>

     
      <Bottom />
    </div>
  )
}
