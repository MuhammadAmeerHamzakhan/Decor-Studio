export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
  inStock?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

// Enrollment interface
export interface Enrollment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  productId: string;
  productName: string;
  productType: "course" | "service";
  message?: string;
  date: string;
  status: "pending" | "approved" | "completed";
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Lavender Dreams Candle",
    price: 32,
    category: "Floral",
    description: "A soothing lavender-scented candle perfect for relaxation",
    image: "/images/lavender-candle.png", // Ensure these images exist in public folder
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    title: "Ocean Breeze Candle",
    price: 28,
    category: "Fresh",
    description: "Fresh ocean scent brings the sea to your home",
    image: "/images/ocean-candle.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "3",
    title: "Sandalwood Serenity",
    price: 35,
    category: "Woody",
    description: "Rich sandalwood aroma for meditation and peace",
    image: "/images/sandalwood-candle.png",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "4",
    title: "Honey Almond Bliss",
    price: 30,
    category: "Sweet",
    description: "Sweet honey and almond fragrance",
    image: "/images/honey-almond-candle.jpg",
    rating: 4.7,
    inStock: false,
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "user",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@decorstudiobyla.com",
    role: "admin",
    createdAt: "2023-12-01",
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    date: "2024-03-15",
    status: "delivered",
    total: 92,
    items: [
      { productId: "1", productName: "Lavender Dreams Candle", quantity: 2, price: 32 },
      { productId: "2", productName: "Ocean Breeze Candle", quantity: 1, price: 28 },
    ],
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: "ENR-001",
    userId: "1",
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    phone: "+1-555-0123",
    productId: "course-1",
    productName: "Beginner Candle Making",
    productType: "course",
    message: "Excited to start learning candle making!",
    date: "2024-03-20",
    status: "approved",
  },
];