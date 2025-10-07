'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { CgSmartphoneShake } from "react-icons/cg"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-300 p-4">
      
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 flex items-center gap-2">
            Create Account <CgSmartphoneShake className="text-4xl text-sky-500 animate-bounce" />
          </h1>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        <form action="" className="space-y-4">
          <input 
            type="text" 
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" 
            placeholder="Full Name" 
          />
          
          <input 
            type="number" 
            name="phone" 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" 
            placeholder="Phone Number" 
          />


          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400" 
              placeholder="Password" 
            />
            <button
              type="button"
              className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Sign Up
          </button>
        </form>


        <div className="mt-4 text-center">
          <p className="text-gray-600 inline">Already have an account? </p>
          <Link 
            href="/auth/login" 
            className="text-sky-500 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

   
      <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
        By signing up, you agree to our <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy</span>.
      </p>
    </div>
  )
}
