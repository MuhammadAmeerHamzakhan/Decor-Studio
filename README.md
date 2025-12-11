# DecorStudioByLA - Luxury Candle E-Commerce Platform

A complete, production-ready frontend application for a luxury candle e-commerce business with integrated admin and user dashboards, multi-currency support, and full shopping cart functionality.

## 🌟 Features

### For Customers
- Browse luxury candles, candle-making courses, and supplies
- Multi-currency support (USD, GBP, CAD, AUD, INR, AED)
- Shopping cart with persistent storage
- Multi-step checkout process
- User dashboard with order history and course enrollments
- Wishlist and recently viewed products
- Product comparison tool

### For Administrators
- Comprehensive admin dashboard with analytics
- Manage products, courses, and modules
- View and update orders and enrollments
- User management
- Multi-currency price conversion
- Dark mode support

## 🚀 Quick Start

### Demo Accounts
- **User**: user@example.com / password
- **Admin**: admin@example.com / password

### Access Points
- **Main Website**: `/`
- **User Dashboard**: `/dashboard/user` (after login)
- **Admin Dashboard**: `/admin` or `/dashboard/admin`
- **Shop**: `/candles`, `/courses`, `/supplies`
- **Cart**: `/cart`
- **Checkout**: `/checkout`

## 📁 Project Structure

\`\`\`
app/
├── (auth)/              # Authentication pages
├── (dashboard)/         # Dashboard pages
│   ├── admin/          # Admin dashboard
│   └── user/           # User dashboard
├── candles/            # Candles shop
├── courses/            # Courses listing
├── supplies/           # Supplies shop
├── cart/               # Shopping cart
├── checkout/           # Checkout flow
└── product/[id]/       # Product details

components/
├── dashboard/          # Dashboard components
├── ui/                 # UI components (shadcn)
└── [features]/         # Feature components

contexts/              # React Context providers
lib/                   # Utilities and data
\`\`\`

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **Charts**: Recharts
- **State**: React Context API
- **Storage**: localStorage (mock backend)
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display

## 💾 Data Management

All data is currently stored in localStorage for demonstration purposes. The application is designed with clear API integration points for easy backend connection.

### Mock Data Includes:
- Products (candles)
- Courses
- Modules
- Users
- Orders
- Enrollments
- Cart items
- Wishlist

## 🌍 Multi-Currency Support

Supported currencies with automatic conversion:
- 🇺🇸 USD (base currency)
- 🇬🇧 GBP
- 🇨🇦 CAD
- 🇦🇺 AUD
- 🇮🇳 INR
- 🇦🇪 AED

## 🔌 Backend Integration

The application is ready for backend integration with clearly marked API points:

\`\`\`typescript
// Examples of integration points:
// POST /api/auth/login
// GET /api/products
// POST /api/orders
// PUT /api/admin/courses/:id
\`\`\`

See `SYSTEM_DOCUMENTATION.md` for complete API endpoint list.

## 📱 Responsive Design

Fully responsive with breakpoints for:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🎨 Design System

### Colors
- Primary: Blush Pink (#f2c0ca)
- Secondary: Cream (#FFF8F6)
- Background: White
- Foreground: Black

### Typography
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## ✅ Production Checklist

- ✅ Responsive design  
- ✅ Cart and checkout flow  
- ✅ Authentication (Supabase integrated)  
- ✅ Admin dashboard  
- ✅ User dashboard  
- ✅ Currency conversion  
- ✅ Error handling  
- ✅ Loading states  
- ✅ Form validation  
- ✅ Backend API integration (Completed)  
- ✅ Payment processing (Stripe fully integrated & tested)  
- ⏳ Email notifications (Pending Hostinger password update)  
- ⏳ LMS integration  

## 📖 Documentation

- `SYSTEM_DOCUMENTATION.md` - Complete system documentation
- `README.md` - This file
- Inline code comments - Throughout codebase

## 🤝 Contributing

This is a frontend-only application designed for easy backend integration. API integration points are marked with TODO comments throughout the codebase.

## 📄 License

Proprietary - DecorStudioByLA

---

Built with ❤️ using Next.js and v0.dev
