'use client'

import { useEffect, useState } from 'react'
import { FaPizzaSlice, FaHamburger, FaArrowRight, FaTimes } from 'react-icons/fa'
import { GiNoodles, GiFoodTruck } from 'react-icons/gi'
import Link from 'next/link'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
   
    if (typeof window !== 'undefined') {
      import('@twa-dev/sdk').then((WebApp) => {
        WebApp.default.ready()
        WebApp.default.expand()
        WebApp.default.setBackgroundColor('#f8fafc')
      })
    }
  }, [])

  const handleCloseApp = () => {
    if (typeof window !== 'undefined') {
      import('@twa-dev/sdk').then((WebApp) => {
        WebApp.default.close()
      })
    }
  }

  
  if (!isClient) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading TeleEats...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 text-white relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-6">
        
       
        <div className="w-full max-w-md flex justify-end mb-8 sm:mb-12">
          <button
            onClick={handleCloseApp}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 border border-white/30"
          >
            <FaTimes className="w-4 h-4" />
            Close App
          </button>
        </div>

      
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 max-w-md w-full hover:shadow-3xl transition-all duration-500">
          
    
          <div className="flex justify-center space-x-4 mb-6">
            <div className="relative group">
              <FaPizzaSlice className="text-yellow-300 w-16 h-16 animate-bounce group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Pizza
              </div>
            </div>
            <div className="relative group">
              <FaHamburger className="text-red-400 w-16 h-16 animate-bounce delay-150 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-400 text-red-900 text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Burger
              </div>
            </div>
            <div className="relative group">
              <GiNoodles className="text-orange-300 w-16 h-16 animate-bounce delay-300 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-400 text-orange-900 text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Noodles
              </div>
            </div>
          </div>

        
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              TeleEats
            </h1>
            <div className="flex items-center justify-center gap-2 text-cyan-200">
              <GiFoodTruck className="w-6 h-6" />
              <span className="text-lg font-medium">Food Delivery</span>
            </div>
          </div>

       
          <p className="text-white/90 text-lg sm:text-xl font-medium mb-8 leading-relaxed">
            Your favorite meals, delivered smarter and faster than ever before 🚀
          </p>

          
          <Link
            href="/auth/login"
            className="group relative inline-flex items-center justify-center gap-3 w-full py-4 bg-white text-sky-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span>Get Started</span>
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

        
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl">🚀</div>
              <div className="text-white/80 text-sm font-medium mt-1">Fast</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">🍕</div>
              <div className="text-white/80 text-sm font-medium mt-1">Fresh</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">💰</div>
              <div className="text-white/80 text-sm font-medium mt-1">Easy Pay</div>
            </div>
          </div>
        </div>

       
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Service</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </main>
  )
}