// app/admin/types.ts
export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'customer' | 'restaurant' | 'delivery'
  status: 'active' | 'suspended'
  joinedAt: string
}

export interface Order {
  _id: string
  userId: string
  userName?: string
  items: Array<{ foodId: string; name: string; qty: number; price: number }>
  address: string
  total: number
  paymentStatus: 'paid' | 'pending' | 'failed'
  paymentMethod?: string
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'
  createdAt: string
}

export interface Food {
  _id?: string
  name: string
  price: number
  type: string
  imageUrl?: string
  enabled?: boolean
}

export interface Restaurant {
  _id?: string
  name: string
  address?: string
  phone?: string
  logoUrl?: string
  enabled?: boolean
}
