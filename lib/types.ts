export interface Category {
  categoryId?: number;
  name: string;
  description: string;
}

export interface Product {
  productId: number;
  productName: string;
  price: number;
  qty: number;
  itemCost: number;
  description: string;
  imageUrl: string;
  verified: false;
  userId: number;
  category: Category;
  user: User;
}

export interface CartItem {
  userId: number;
  productDTO: Product;
  quantity?: number;
}

export interface OrderDetails {
  paymentInfoDTO: Payment;
  shoppingCart: ShoppingCart;
}

export interface ShoppingCart {
  id?: number;
  userId?: number;
  totalPrice: number;
  cartLines: Array<ProductLine>;
}

export interface Payment {
  cardNumber: string;
  nameOnCard: string;
  cardExpiry: string;
  ccv: string;
  amount?: number;
}

export interface ProductLine {
  id: number;
  quantity: number;
  productId: number;
  productInfo: string;
}

export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  telephoneNumber: string;
  username: string;
  verified: true;
  roles: Array<UserRole>;
  fullyVerified?: boolean;
}

export interface UserDetails {
  userId: number;
  name: string;
  email: string;
  telephoneNumber: string;
  username: string;
  isVerified: boolean;
  isFullyVerified: boolean;
  paymentCardNumber: null;
  verifiedBy: null;
  roles: any;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  authorities: any;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface Order {
  id: number;
  userId: number;
  orderStatus: string;
  orderDate: string;
  totalPrice: number;
  orderLines: Array<ProductLine>;
  userInfo: string;
}

export enum USER_ROLE {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  GUEST = "GUEST",
  REGISTERED_USER = "REGISTERED_USER",
}

export enum USER_ROLE_NAME {
  ADMIN = "Admin",
  VENDOR = "Vendor",
  REGISTERED_USER = "Customer",
}

export interface UserRole {
  roleId: number;
  roleName: USER_ROLE;
}
