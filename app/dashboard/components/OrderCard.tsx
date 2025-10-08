'use client'

import Image from 'next/image'

interface FoodItem {
  name: string
  sellsPercent: string
  image: string
}

interface OrderCardProps {
  foods: FoodItem[]
  activeCategory: string
}

export default function OrderCard({ foods, activeCategory }: OrderCardProps) {
  if (!foods?.length) {
    return <p className="text-center text-gray-500 mt-10">No food data available.</p>
  }

  return (
    <div className="w-full mt-10">
      {foods
        .filter((item: FoodItem) => item.name === activeCategory)
        .map((item: FoodItem) => (
          <div
            key={item.name}
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover brightness-75"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-16 text-white space-y-4">
              <h3 className="text-3xl md:text-5xl font-bold drop-shadow-md">{item.name}</h3>
              <p className="text-lg md:text-xl font-medium text-emerald-200">{item.sellsPercent}</p>
              <button
                className="mt-4 px-8 py-3 bg-gradient-to-r from-emerald-500 to-sky-500 
                           hover:from-emerald-600 hover:to-sky-600 text-white font-semibold 
                           text-base rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
