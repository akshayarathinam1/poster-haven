// ============================================================
// POSTER HAVEN — Type Definitions
// ============================================================

export type ProductCategory =
  | "abstract"
  | "photography"
  | "minimalist"
  | "vintage"
  | "nature"
  | "cityscape"
  | "typography"
  | "pop-art";

export type ProductSize = "A4" | "A3" | "A2" | "A1" | "50x70" | "70x100";

export type ProductFinish = "matte" | "glossy" | "satin" | "canvas";

export interface ProductVariant {
  size: ProductSize;
  finish: ProductFinish;
  price: number;
  originalPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  artistName: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  tags: string[];
  variants: ProductVariant[];
  basePrice: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  colors: string[];
  dimensions?: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface OrderItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  estimatedDelivery: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestseller";

export interface FilterState {
  categories: ProductCategory[];
  sizes: ProductSize[];
  finishes: ProductFinish[];
  priceRange: [number, number];
  rating: number | null;
  tags: string[];
  sortBy: SortOption;
}
