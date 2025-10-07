'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CgSmartphoneShake } from "react-icons/cg"

interface FormData {
  phone: string
  password: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitMessage, setSubmitMessage] = useState<string>('')
  const router=useRouter()

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

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.password.trim()) newErrors.password = 'Password is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitMessage('')

    if (!validate()) return

    try {
      console.log('Submitting form:', formData)
      setSubmitMessage('✅ Login successful!')
      // Here you can add an API call (fetch/axios)
      const isLoginSuccessful = formData.phone === '0916656489' && formData.password === '1234'

      if (isLoginSuccessful) {
        setSubmitMessage('✅ Login successful! Redirecting...')
        setTimeout(() => {
          router.push('/dashboard') // ✅ Redirect user to dashboard
        }, 1000)
      } else {
        setSubmitMessage('❌ Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error(error)
      setSubmitMessage('❌ An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-sky-700 flex items-center gap-2">
            Welcome Back <CgSmartphoneShake className="text-4xl text-sky-500 animate-bounce" />
          </h1>
          <p className="text-gray-500 mt-2">Login to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              onChange={handleChange}
              value={formData.phone}
              type="number"
              name="phone"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter phone number..."
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <input
              onChange={handleChange}
              value={formData.password}
              type="password"
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="*********"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600 transition"
          >
            Login
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
          <p className="text-gray-600 inline">New here? </p>
          <Link href="/auth/signup" className="text-sky-500 font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center max-w-xs">
        By continuing, you agree to our <span className="underline cursor-pointer">Terms</span> &{' '}
        <span className="underline cursor-pointer">Privacy</span>.
      </p>
    </div>
  )
}
