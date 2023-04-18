export interface Category {
  name: string;
  description: string;
}

export interface Product {
  productName: string;
  price: number;
  qty: number;
  itemCost: number;
  description: string;
  imageUrl: string;
  verified: false;
  userId: number;
  categoryId: number;
}

export interface CartItem {
  userId: number;
  productDTO: Product;
  quantity: number;
}

export interface OrderDetails {
  paymentInfoDTO: Payment;
}

export interface Payment {
  cardNumber: string;
  nameOnCard: string;
  cardExpiry: string;
  ccv: string;
}
