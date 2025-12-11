export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  scent?: string
  tags?: string[]
  inStock: boolean
}

export interface Course {
  id: number
  name: string
  description: string
  price: number
  image: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  instructor: string
  category: string
}

export interface Supply {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  specifications?: string
  inStock: boolean
}

export const candles: Product[] = [
  {
    id: 1,
    name: "Floral Essence",
    description: "Delicate blooms and fresh petals create a garden sanctuary",
    price: 42,
    image: "/luxury-floral-candle-pink-roses.jpg",
    category: "Floral",
    scent: "Rose, Jasmine, Lily",
    tags: ["Best Seller", "New"],
    inStock: true,
  },
  {
    id: 2,
    name: "Woodland Retreat",
    description: "Earthy cedar and warm amber evoke forest tranquility",
    price: 45,
    image: "/luxury-wooden-candle-forest-scent.jpg",
    category: "Woody",
    scent: "Cedar, Amber, Sandalwood",
    tags: ["Best Seller"],
    inStock: true,
  },
  {
    id: 3,
    name: "Citrus Bliss",
    description: "Bright bergamot and sweet orange energize your space",
    price: 38,
    image: "/luxury-citrus-candle-orange-lemon.jpg",
    category: "Fresh",
    scent: "Bergamot, Orange, Lemon",
    tags: ["New"],
    inStock: true,
  },
  {
    id: 4,
    name: "Vanilla Dreams",
    description: "Rich vanilla and creamy tonka for ultimate comfort",
    price: 40,
    image: "/luxury-vanilla-candle-cream-aesthetic.jpg",
    category: "Gourmand",
    scent: "Vanilla, Tonka Bean, Caramel",
    tags: ["Best Seller"],
    inStock: true,
  },
  {
    id: 5,
    name: "Lavender Serenity",
    description: "Calming lavender fields meet soft chamomile",
    price: 40,
    image: "/luxury-lavender-candle.jpg",
    category: "Floral",
    scent: "Lavender, Chamomile, Sage",
    tags: [],
    inStock: true,
  },
  {
    id: 6,
    name: "Ocean Breeze",
    description: "Fresh sea salt and coastal air in every breath",
    price: 38,
    image: "/luxury-ocean-candle.jpg",
    category: "Fresh",
    scent: "Sea Salt, Driftwood, Ozone",
    tags: ["New"],
    inStock: true,
  },
]

export const courses: Course[] = [
  {
    id: 1,
    name: "Candle Making Basics",
    description: "Learn the fundamentals of candle making from selecting wax to perfecting your pour",
    price: 149,
    image: "/candle-making-process-hands-pouring.jpg",
    level: "Beginner",
    duration: "4 weeks",
    instructor: "Laura Anderson",
    category: "Fundamentals",
  },
  {
    id: 2,
    name: "Advanced Scent Blending",
    description: "Master the art of creating unique fragrance combinations",
    price: 249,
    image: "/perfume-bottles-fragrance-oils.jpg",
    level: "Advanced",
    duration: "6 weeks",
    instructor: "Laura Anderson",
    category: "Techniques",
  },
  {
    id: 3,
    name: "Candle Business Masterclass",
    description: "Turn your passion into profit with our comprehensive business course",
    price: 399,
    image: "/business-planning-laptop-candles.jpg",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Laura Anderson",
    category: "Business",
  },
  {
    id: 4,
    name: "Luxury Decor Design",
    description: "Create stunning candle displays and home decor arrangements",
    price: 199,
    image: "/candles-on-marble-table-flowers.jpg",
    level: "Intermediate",
    duration: "5 weeks",
    instructor: "Laura Anderson",
    category: "Design",
  },
]

export const supplies: Supply[] = [
  {
    id: 1,
    name: "Premium Soy Wax",
    description: "100% natural soy wax for clean, long-lasting burns",
    price: 24,
    image: "/soy-wax-flakes-bag.jpg",
    category: "Waxes",
    specifications: "5 lbs bag",
    inStock: true,
  },
  {
    id: 2,
    name: "Fragrance Oil Set",
    description: "Curated collection of 12 premium fragrance oils",
    price: 89,
    image: "/fragrance-oil-bottles-set.jpg",
    category: "Fragrance Oils",
    specifications: "12 x 10ml bottles",
    inStock: true,
  },
  {
    id: 3,
    name: "Glass Jar Collection",
    description: "Elegant glass jars perfect for luxury candles",
    price: 45,
    image: "/glass-candle-jars-set.jpg",
    category: "Jars",
    specifications: "Set of 6, 8oz each",
    inStock: true,
  },
  {
    id: 4,
    name: "Cotton Wicks",
    description: "Pre-tabbed cotton wicks for consistent burning",
    price: 15,
    image: "/candle-wicks-cotton.jpg",
    category: "Wicks",
    specifications: "100 pack",
    inStock: true,
  },
  {
    id: 5,
    name: "Candle Making Tool Kit",
    description: "Complete set of essential candle making tools",
    price: 65,
    image: "/candle-making-tools-kit.jpg",
    category: "Tools & Equipment",
    specifications: "10-piece set",
    inStock: true,
  },
  {
    id: 6,
    name: "Silicone Molds Set",
    description: "Versatile silicone molds for creative candle shapes",
    price: 35,
    image: "/silicone-candle-molds.jpg",
    category: "Molds",
    specifications: "Set of 4",
    inStock: true,
  },
]
