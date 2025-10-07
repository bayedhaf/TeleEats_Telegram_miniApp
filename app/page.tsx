import { FaPizzaSlice, FaHamburger } from "react-icons/fa"
import { GiNoodles } from "react-icons/gi"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-b from-sky-500 to-sky-100">
      
     
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        
       
        <div className="flex space-x-3">
          <FaPizzaSlice className="text-yellow-400 w-12 h-12 animate-bounce" />
          <FaHamburger className="text-red-500 w-12 h-12 animate-bounce delay-150" />
          <GiNoodles className="text-orange-400 w-12 h-12 animate-bounce delay-300" />
        </div>
        
    
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 drop-shadow-lg">
          TeleEats
        </h1>
      </div>
      
 
      <p className="text-gray-700 mt-4 text-lg sm:text-xl">
        Your favorite meals, delivered smarter.
      </p>
      
  
      <button className="mt-6 px-8 py-3 bg-white hover:bg-gray-100 text-sky-500 font-semibold rounded-xl shadow-md transition-colors duration-300">
       <Link href='/auth/login'>     Get Started!</Link>
      </button>
    </main>
  )
}
