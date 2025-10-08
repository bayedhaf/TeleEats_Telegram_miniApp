'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function RestorantList() {
   const foods = [
      { name: 'Zola International Hotel', sellsPercent: '20% off burger deals today!', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/2b/07/85/img-20170806-161604-largejpg.jpg?w=900&h=500&s=1' },
      { name: 'Zola International Hote', sellsPercent: '20% off burger deals today!', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4e/cb/34/hotel-overview-picture.jpg?w=400&h=400&s=1' },
      { name: 'Zola International Hotl', sellsPercent: '20% off burger deals today!', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7c/e2/33/inside-hemen-pizza-and.jpg?w=900&h=-1&s=1' },
      { name: 'Zola International Hoel', sellsPercent: '20% off burger deals today!', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/c4/73/dd/poolside-cabanas.jpg?w=600&h=-1&s=1' },
  ]
  
    const [activeResaurant, setactiveResaurant] = useState('Burger')
 
  return (
       <div className="w-full px-4 mt-10">
        <h1 className="text-center text-black text-2xl font-bold mb-5"> Popular Resaurants</h1>
      <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory">
        {foods.map((item) => (
          <div
            key={item.name}
            onClick={() => setactiveResaurant(item.name)}
            className={`flex-shrink-0 snap-start cursor-pointer text-left transition-all duration-200
              w-[calc(100%/2.2)] md:w-[calc(100%/3.2)]
              ${activeResaurant === item.name ? 'scale-105' : 'hover:scale-105'}
            `}
          >
            <div
              className={`rounded-2xl overflow-hidden w-full h-44 md:h-52 shadow-md transition-all duration-300
                ${activeResaurant === item.name
                  ? 'ring-2 ring-sky-500 ring-offset-2'
                  : 'bg-gray-200 hover:ring-1 hover:ring-sky-400'}
              `}
            >
              <Image
                className="w-full h-full object-cover"
                width={600}
                height={600}
                src={item.image}
                alt={item.name}
              />
            </div>

            <p
              className={`mt-2 text-sm md:text-base text-center font-medium transition-colors duration-200
                ${activeResaurant === item.name
                  ? 'text-sky-600 font-semibold'
                  : 'text-gray-700 hover:text-sky-500'}
              `}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
