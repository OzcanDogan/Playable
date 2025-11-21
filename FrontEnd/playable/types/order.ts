export interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}