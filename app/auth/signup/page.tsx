'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CgSmartphoneShake } from "react-icons/cg"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

interface FormData {
  name: string
  phone: string
  password: string
}

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    password: ''
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitMessage, setSubmitMessage] = useState<string>('')

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  // Validation
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'
    else if (formData.password.length < 4) newErrors.password = 'Password must be at least 4 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage('')

    if (!validate()) return

    try {
      console.log('Signing up with:', formData)

      // 🧠 Simulated API call (replace with your backend POST request)
      const isSignupSuccessful = true

      if (isSignupSuccessful) {
        setSubmitMessage('✅ Account created successfully! Redirecting...')
        setTimeout(() => router.push('/dashboard'), 1200)
      } else {
        setSubmitMessage('❌ Signup failed. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setSubmitMessage('⚠️ An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 flex items-center gap-2">
            Create Account <CgSmartphoneShake className="text-4xl text-sky-500 animate-bounce" />
          </h1>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

       
          <div>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Phone Number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

    
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Sign Up
          </button>
        </form>

        {submitMessage && (
          <p
            className={`mt-4 text-center font-medium ${
              submitMessage.includes('✅') ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {submitMessage}
          </p>
        )}

        <div className="mt-4 text-center">
          <p className="text-gray-600 inline">Already have an account? </p>
          <Link href="/auth/login" className="text-sky-500 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
        By signing up, you agree to our{' '}
        <span className="underline cursor-pointer">Terms</span> &{' '}
        <span className="underline cursor-pointer">Privacy</span>.
      </p>
    </div>
  )
}
