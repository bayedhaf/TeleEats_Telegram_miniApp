'use client'

import Image from 'next/image'

interface FoodItem {
  name: string
  sellsPercent: string
  image: string
}

interface FoodItemsProps {
  foods: FoodItem[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function FoodItems({
  foods,
  activeCategory,
  setActiveCategory,
}: FoodItemsProps) {
  return (
    <div className="w-full px-4 mt-8">
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory">
        {foods.map((item: FoodItem) => (
          <div
            key={item.name}
            onClick={() => setActiveCategory(item.name)}
            className={`flex-shrink-0 snap-start text-center cursor-pointer transition-all duration-300 ease-out 
              ${
                activeCategory === item.name
                  ? 'scale-110'
                  : 'hover:scale-105 hover:brightness-105'
              }`}
          >
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-md 
                transition-all duration-300 ease-out
                ${
                  activeCategory === item.name
                    ? 'bg-gradient-to-br from-emerald-500 to-sky-500 ring-4 ring-sky-300 ring-offset-2'
                    : 'bg-gray-200 hover:ring-2 hover:ring-sky-400'
                }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-inner"
              />
              {activeCategory === item.name && (
                <div className="absolute inset-0 rounded-full bg-white/10 blur-md animate-pulse"></div>
              )}
            </div>

            <p
              className={`mt-3 text-sm sm:text-base font-semibold transition-colors duration-200 
                ${
                  activeCategory === item.name
                    ? 'text-sky-600'
                    : 'text-gray-700 hover:text-sky-500'
                }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
