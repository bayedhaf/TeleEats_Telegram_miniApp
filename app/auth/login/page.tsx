'use client'

import Link from 'next/link'
import React from 'react'
import { CgSmartphoneShake } from "react-icons/cg";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-300 p-4">
      
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
       
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 flex items-center gap-2">
            Welcome Back <CgSmartphoneShake className="text-4xl text-sky-500 animate-bounce" />
          </h1>
          <p className="text-gray-500 mt-2">Login to continue to your account</p>
        </div>

      
        <form action="" className="space-y-4">
          <input 
            type="number" 
            name="phone" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" 
            placeholder="Enter phone number..." 
          />
          <input 
            type="password" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" 
            placeholder="*********" 
          />
          <button 
            type="submit" 
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Login
          </button>
        </form>

     
        <div className="mt-4 text-center">
          <p className="text-gray-600 inline">New here? </p>
          <Link 
            href="/auth/signup" 
            className="text-sky-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

     
      <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
        By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy</span>.
      </p>
    </div>
  )
}
