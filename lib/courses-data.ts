export interface Course {
  id: string
  title: string
  description: string
  fullDescription: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Masterclass"
  type: "Live Workshop" | "Self-Paced" | "1-on-1 Mentoring" | "Intensive Weekend"
  duration: string
  price: number
  originalPrice?: number
  students: number
  rating: number
  reviewCount: number
  image: string
  instructor: {
    name: string
    title: string
    bio: string
    photo: string
  }
  nextSession?: string
  category: string
  whatYouLearn: string[]
  requirements: string
  included: string[]
  curriculum: {
    session: number
    title: string
    duration: string
    description: string
  }[]
  reviews: {
    name: string
    rating: number
    date: string
    comment: string
    verified: boolean
  }[]
  isTrending?: boolean
  isNew?: boolean
}

export const coursesData: Course[] = [
  {
    id: "soy-candle-fundamentals",
    title: "Soy Candle Making Fundamentals",
    description: "Master the art of creating beautiful soy candles from scratch",
    fullDescription:
      "Discover the timeless craft of soy candle making in this comprehensive beginner course. You'll learn everything from selecting the perfect wax blend to achieving professional-quality finishes. This hands-on workshop will guide you through each step of the candle-making process, ensuring you leave with the confidence and skills to create stunning candles at home.",
    level: "Beginner",
    type: "Live Workshop",
    duration: "3 hours",
    price: 79,
    originalPrice: 99,
    students: 1250,
    rating: 4.8,
    reviewCount: 245,
    image: "/candle-making-process-hands-pouring.jpg",
    instructor: {
      name: "Laura Anderson",
      title: "Master Candle Artisan & Founder",
      bio: "Laura has been crafting luxury candles for over 10 years and has taught thousands of students the art of candle making. Her passion for sustainable, beautiful design shines through in every course.",
      photo: "/professional-woman-instructor.jpg",
    },
    nextSession: "December 15, 2024",
    category: "Candle Making 101",
    whatYouLearn: [
      "Understanding different wax types and their properties",
      "Proper wick selection and placement techniques",
      "Fragrance oil blending and scent throw optimization",
      "Professional pouring and finishing methods",
      "Troubleshooting common candle-making issues",
      "Safety protocols and best practices",
    ],
    requirements: "No prior experience required. All materials and tools provided.",
    included: [
      "3-hour live workshop session",
      "Complete starter kit with supplies",
      "Lifetime access to course recordings",
      "Downloadable resource guide",
      "Certificate of completion",
      "Access to private student community",
    ],
    curriculum: [
      {
        session: 1,
        title: "Introduction & Wax Selection",
        duration: "45 minutes",
        description:
          "Learn about different wax types, their properties, and how to choose the right wax for your candles.",
      },
      {
        session: 2,
        title: "Wick Selection & Container Prep",
        duration: "30 minutes",
        description: "Master wick sizing, placement techniques, and proper container preparation.",
      },
      {
        session: 3,
        title: "Fragrance Blending & Pouring",
        duration: "60 minutes",
        description: "Create custom scent blends and learn professional pouring techniques.",
      },
      {
        session: 4,
        title: "Finishing & Troubleshooting",
        duration: "45 minutes",
        description: "Perfect your candles with finishing touches and learn to solve common issues.",
      },
    ],
    reviews: [
      {
        name: "Sarah Mitchell",
        rating: 5,
        date: "November 2024",
        comment:
          "This course exceeded my expectations! Laura's teaching style is clear and encouraging. I made my first perfect candle and can't wait to make more.",
        verified: true,
      },
      {
        name: "Emily Chen",
        rating: 5,
        date: "October 2024",
        comment:
          "Absolutely loved this workshop. The starter kit was generous and the techniques taught were professional-grade. Highly recommend!",
        verified: true,
      },
      {
        name: "Jessica Brown",
        rating: 4,
        date: "October 2024",
        comment:
          "Great course for beginners. Would have loved more time on fragrance blending, but overall very informative.",
        verified: true,
      },
    ],
    isTrending: true,
  },
  {
    id: "advanced-candle-techniques",
    title: "Advanced Candle Design Techniques",
    description: "Master complex designs, layering, and professional finishing",
    fullDescription:
      "Take your candle-making skills to the next level with advanced techniques used by professional artisans. Learn intricate layering, embedding, and specialty finishes that will set your candles apart.",
    level: "Advanced",
    type: "Intensive Weekend",
    duration: "2 days",
    price: 449,
    students: 680,
    rating: 4.9,
    reviewCount: 156,
    image: "/luxury-layered-candle-artistic.jpg",
    instructor: {
      name: "Laura Anderson",
      title: "Master Candle Artisan & Founder",
      bio: "Laura has been crafting luxury candles for over 10 years and has taught thousands of students the art of candle making.",
      photo: "/professional-woman-instructor.jpg",
    },
    nextSession: "January 20-21, 2025",
    category: "Advanced Techniques",
    whatYouLearn: [
      "Multi-layer candle creation with perfect color transitions",
      "Embedding techniques for flowers, crystals, and decorative elements",
      "Specialty wax effects and textures",
      "Professional-grade finishing and presentation",
      "Advanced troubleshooting for complex designs",
    ],
    requirements: "Basic candle-making experience required. Completion of Fundamentals course or equivalent knowledge.",
    included: [
      "2-day intensive workshop (12 hours total)",
      "Advanced materials kit",
      "Lifetime access to recordings",
      "Advanced technique guide",
      "Certificate of completion",
      "1-month mentorship access",
    ],
    curriculum: [
      {
        session: 1,
        title: "Advanced Layering Techniques",
        duration: "3 hours",
        description: "Master the art of creating stunning multi-layer candles with perfect color transitions.",
      },
      {
        session: 2,
        title: "Embedding & Decoration",
        duration: "3 hours",
        description: "Learn to safely embed flowers, crystals, and other decorative elements.",
      },
      {
        session: 3,
        title: "Specialty Wax Effects",
        duration: "3 hours",
        description: "Create unique textures and effects using advanced wax manipulation techniques.",
      },
      {
        session: 4,
        title: "Professional Finishing",
        duration: "3 hours",
        description: "Perfect your presentation with professional finishing and packaging techniques.",
      },
    ],
    reviews: [
      {
        name: "Amanda Rodriguez",
        rating: 5,
        date: "November 2024",
        comment:
          "This intensive workshop was worth every penny. The techniques I learned have completely transformed my candle business.",
        verified: true,
      },
    ],
    isNew: true,
  },
  {
    id: "candle-business-masterclass",
    title: "Candle Business Masterclass",
    description: "Turn your passion into profit with proven business strategies",
    fullDescription:
      "Learn how to build a successful candle business from the ground up. This comprehensive course covers everything from product development to marketing, branding, and scaling your operations.",
    level: "Intermediate",
    type: "Self-Paced",
    duration: "8 weeks",
    price: 599,
    students: 890,
    rating: 4.7,
    reviewCount: 203,
    image: "/candle-business.jpg",
    instructor: {
      name: "Laura Anderson",
      title: "Master Candle Artisan & Founder",
      bio: "Laura has been crafting luxury candles for over 10 years and has taught thousands of students the art of candle making.",
      photo: "/professional-woman-instructor.jpg",
    },
    category: "Business & Entrepreneurship",
    whatYouLearn: [
      "Product line development and pricing strategies",
      "Brand identity and visual design",
      "Marketing and social media strategies",
      "E-commerce setup and online sales",
      "Wholesale and retail partnerships",
      "Scaling production and operations",
    ],
    requirements: "Basic candle-making knowledge recommended. Passion for entrepreneurship required!",
    included: [
      "8 weeks of self-paced content",
      "40+ video lessons",
      "Business plan templates",
      "Marketing toolkit",
      "Lifetime course access",
      "Private business community",
      "Monthly Q&A sessions",
    ],
    curriculum: [
      {
        session: 1,
        title: "Business Foundations",
        duration: "Self-paced",
        description: "Set up your business structure, understand legal requirements, and create your business plan.",
      },
      {
        session: 2,
        title: "Product Development",
        duration: "Self-paced",
        description: "Develop your signature product line and pricing strategy.",
      },
      {
        session: 3,
        title: "Branding & Design",
        duration: "Self-paced",
        description: "Create a compelling brand identity that resonates with your target market.",
      },
      {
        session: 4,
        title: "Marketing Strategies",
        duration: "Self-paced",
        description: "Master social media marketing, content creation, and customer acquisition.",
      },
    ],
    reviews: [
      {
        name: "Rachel Thompson",
        rating: 5,
        date: "October 2024",
        comment:
          "This course gave me the confidence to launch my candle business. The business templates alone are worth the investment!",
        verified: true,
      },
    ],
    isTrending: true,
  },
  {
    id: "fragrance-blending-mastery",
    title: "Fragrance Blending Mastery",
    description: "Create signature scents and master the art of perfumery",
    fullDescription:
      "Dive deep into the world of fragrance creation. Learn to blend essential oils and fragrance oils like a professional perfumer, understanding scent notes, throw, and creating memorable signature scents.",
    level: "Intermediate",
    type: "Live Workshop",
    duration: "5 hours",
    price: 399,
    students: 540,
    rating: 4.8,
    reviewCount: 128,
    image: "/fragrance-oils.jpg",
    instructor: {
      name: "Laura Anderson",
      title: "Master Candle Artisan & Founder",
      bio: "Laura has been crafting luxury candles for over 10 years and has taught thousands of students the art of candle making.",
      photo: "/professional-woman-instructor.jpg",
    },
    nextSession: "December 22, 2024",
    category: "Fragrance Blending",
    whatYouLearn: [
      "Understanding fragrance notes (top, middle, base)",
      "Scent throw optimization techniques",
      "Creating balanced fragrance blends",
      "Working with essential oils vs fragrance oils",
      "Seasonal scent development",
      "Signature scent creation",
    ],
    requirements: "Basic candle-making knowledge helpful but not required.",
    included: [
      "5-hour intensive workshop",
      "Fragrance blending kit with 20+ oils",
      "Scent wheel and blending guide",
      "Recipe journal",
      "Certificate of completion",
    ],
    curriculum: [
      {
        session: 1,
        title: "Fragrance Fundamentals",
        duration: "90 minutes",
        description: "Learn about fragrance families, notes, and how scents interact.",
      },
      {
        session: 2,
        title: "Blending Techniques",
        duration: "2 hours",
        description: "Hands-on practice creating balanced fragrance blends.",
      },
      {
        session: 3,
        title: "Signature Scent Creation",
        duration: "90 minutes",
        description: "Develop your own unique signature scent from scratch.",
      },
    ],
    reviews: [
      {
        name: "Olivia Martinez",
        rating: 5,
        date: "November 2024",
        comment:
          "I learned so much about fragrance in just one day! Now I can create custom scents for my candle line.",
        verified: true,
      },
    ],
  },
]
