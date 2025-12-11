# DecorStudioByLA - Complete System Documentation

## Overview
DecorStudioByLA is a fully functional luxury candle e-commerce platform with integrated Admin and User Dashboards. This frontend-only system is designed to be easily integrated with a backend API in the future.

## ✅ Implemented Features

### 1. Main Website
- **Home Page** (`/`)
  - Hero section with call-to-action
  - Featured collections showcase
  - Brand story section
  - Customer testimonials
  - Instagram grid integration
  - Recently viewed products
  - Newsletter signup

- **Shop Pages**
  - `/candles` - Candles marketplace with filters
  - `/courses` - Course listings with categories
  - `/supplies` - Candle-making supplies catalog
  - Product filtering by category, price range
  - Search functionality
  - Quick view modals
  - Wishlist integration

- **Product Detail Pages**
  - `/product/[id]` - Full product information
  - Multiple product images gallery with zoom
  - Size and color selection
  - Quantity controls
  - Add to cart functionality
  - Customer reviews
  - Related products
  - Gift options and personalization

- **Course Detail Pages**
  - `/course/[id]` - Complete course information
  - Curriculum breakdown
  - Instructor profile
  - Student reviews
  - Enrollment functionality

### 2. Shopping Experience
- **Cart System** (`/cart`)
  - View all cart items
  - Update quantities
  - Remove items
  - Cart persistence (localStorage)
  - Real-time price calculations
  - Free shipping threshold indicator

- **Checkout Flow** (`/checkout`)
  - Multi-step process (3 steps)
  - Shipping information form
  - Shipping method selection
  - Payment information (mock)
  - Order summary sidebar
  - Form validation
  - Order confirmation page

### 3. Authentication System
- **Login/Signup** (`/(auth)/login`, `/(auth)/signup`)
  - Email/password authentication (mock)
  - Form validation
  - Demo account information displayed
  - Role-based access (user/admin)
  - Persistent sessions (localStorage)

- **Demo Accounts**
  - User: user@example.com / password
  - Admin: admin@example.com / password

### 4. User Dashboard (`/dashboard/user`)
- **Overview Page**
  - Welcome message
  - Country/currency selector
  - Quick stats (orders, products, enrollments, wishlist)
  - Recent activity feed

- **Marketplace** (`/dashboard/user/marketplace`)
  - Browse products
  - Search and filter functionality
  - Quick add to cart

- **Orders** (`/dashboard/user/orders`)
  - Order history
  - Order status tracking
  - Order details

- **Enrollments** (`/dashboard/user/enrollments`)
  - Enrolled courses list
  - Course progress
  - Enrollment status
  - Access course materials

- **Profile** (`/dashboard/user/profile`)
  - Edit personal information
  - Change password
  - Account settings

### 5. Admin Dashboard (`/dashboard/admin` or `/admin`)
- **Overview Page**
  - Key metrics (products, users, sales, orders, enrollments)
  - Monthly sales chart (Recharts)
  - Recent orders list
  - Theme toggle (light/dark mode)
  - Country selector in top bar

- **Products Management** (`/dashboard/admin/products`)
  - View all products (candles)
  - Add new products (modal form)
  - Edit existing products
  - Delete products
  - Search and filter
  - Stock status management

- **Courses Management** (`/dashboard/admin/courses`)
  - View all courses
  - Add new courses
  - Edit course details
  - Delete courses
  - Price management with currency conversion
  - Category and level filtering

- **Modules Management** (`/dashboard/admin/modules`)
  - View course modules
  - Add new modules
  - Edit module content
  - Delete modules
  - Link modules to courses
  - Order/sequence management

- **Users Management** (`/dashboard/admin/users`)
  - View all users
  - User details
  - Role management
  - Action buttons (view/edit/delete)

- **Orders Management** (`/dashboard/admin/orders`)
  - View all orders
  - Order details
  - Update order status
  - Filter by status
  - Order timeline

- **Enrollments Management** (`/dashboard/admin/enrollments`)
  - View all course enrollments
  - Student information
  - Enrollment status
  - Update enrollment status
  - Filter by course

- **Settings** (`/dashboard/admin/settings`)
  - Store configuration
  - Default country/currency
  - Theme preferences
  - Notification settings

### 6. Currency & Internationalization
- **Global Currency System**
  - Supported Countries: USA, UK, Canada, Australia, India, UAE
  - Supported Currencies: USD, GBP, CAD, AUD, INR, AED
  - Automatic price conversion
  - Country selector modal on first visit
  - Persistent country selection (localStorage)
  - Currency display throughout site

- **Mock Conversion Rates**
  - USD: 1.0 (base)
  - GBP: 0.79
  - CAD: 1.36
  - AUD: 1.53
  - INR: 83.12
  - AED: 3.67

### 7. Additional Features
- **Wishlist System**
  - Add/remove products from wishlist
  - Wishlist page
  - Wishlist counter in navigation
  - localStorage persistence

- **Recently Viewed**
  - Track viewed products
  - Display recently viewed section
  - Auto-updates on product visits

- **Comparison Tool**
  - Compare multiple products
  - Comparison drawer
  - Feature comparison

- **Error Handling**
  - Error boundary components
  - Loading states for all pages
  - Skeleton loaders
  - Toast notifications

- **Responsive Design**
  - Mobile-optimized layouts
  - Tablet breakpoints
  - Desktop full experience
  - Touch-friendly interactions
  - Mobile navigation drawer

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Inter (body), Playfair Display (headings)

### State Management
- **React Context API** for global state:
  - AuthContext - Authentication state
  - CartContext - Shopping cart
  - WishlistContext - Saved items
  - CurrencyContext - Country/currency selection
  - RecentlyViewedContext - Browsing history
  - ThemeContext - Dark/light mode (admin)

### Data Storage
- **localStorage** for client-side persistence:
  - Cart items
  - Wishlist
  - Recently viewed
  - User session
  - Country selection
  - Products, courses, orders (mock data)
  - Enrollments

### File Structure
\`\`\`
app/
├── (auth)/                 # Authentication pages
│   ├── login/
│   └── signup/
├── (dashboard)/            # Dashboard pages
│   ├── admin/             # Admin dashboard
│   │   ├── courses/
│   │   ├── enrollments/
│   │   ├── modules/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── settings/
│   │   └── users/
│   └── user/              # User dashboard
│       ├── enrollments/
│       ├── marketplace/
│       ├── orders/
│       └── profile/
├── about/
├── candles/
├── cart/
├── checkout/
├── contact/
├── course/[id]/
├── courses/
├── product/[id]/
├── supplies/
└── admin/                 # Redirect to admin dashboard

components/
├── dashboard/             # Dashboard-specific components
├── ui/                    # shadcn/ui components
├── auth/                  # Auth-related components
└── [feature-components]   # Feature components

contexts/                  # React Context providers
lib/                       # Utilities and data
├── admin-data.ts         # Admin mock data with CRUD helpers
├── auth.ts               # Authentication utilities
├── courses-data.ts       # Courses data
├── currency.ts           # Currency conversion utilities
├── mock-data.ts          # Mock data for users, orders, enrollments
├── products-data.ts      # Products/candles data
└── utils.ts              # General utilities
\`\`\`

## 🔌 API Integration Points

All CRUD operations are currently stubbed with comments indicating where backend API calls should be integrated. Key integration points:

### Authentication
\`\`\`typescript
// lib/auth.ts
// TODO: Replace with actual API call to POST /api/auth/login
// TODO: Replace with actual API call to POST /api/auth/signup
\`\`\`

### Products
\`\`\`typescript
// lib/admin-data.ts
// TODO: Replace with fetch('/api/products', { method: 'GET' })
// TODO: Replace with fetch('/api/products', { method: 'POST', body: ... })
// TODO: Replace with fetch(`/api/products/${id}`, { method: 'PUT', body: ... })
// TODO: Replace with fetch(`/api/products/${id}`, { method: 'DELETE' })
\`\`\`

### Courses
\`\`\`typescript
// lib/admin-data.ts
// TODO: Replace with fetch('/api/courses', { method: 'GET' })
// TODO: Replace with fetch('/api/courses', { method: 'POST', body: ... })
\`\`\`

### Orders
\`\`\`typescript
// checkout/page.tsx
// TODO: Replace with fetch('/api/orders', { method: 'POST', body: orderData })
\`\`\`

### Enrollments
\`\`\`typescript
// components/enroll-modal.tsx
// TODO: Replace with fetch('/api/enrollments', { method: 'POST', body: ... })
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Blush Pink (#f2c0ca)
- **Secondary**: Cream (#FFF8F6)
- **Background**: White (#FFFFFF)
- **Foreground**: Black (#000000)
- **Muted**: Light Gray (#F5F5F5)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
- Following Tailwind's spacing scale
- Consistent padding/margins throughout

## 🚀 Getting Started

### Development
1. Install dependencies (automatic in v0.dev)
2. Run development server (automatic in v0.dev)
3. Access admin dashboard at `/admin` or `/dashboard/admin`
4. Login with demo credentials

### Testing Accounts
- **Regular User**: user@example.com / password
- **Admin User**: admin@example.com / password

### Key User Flows
1. **Shopping**: Browse → Add to Cart → Checkout → Order Confirmation
2. **Course Enrollment**: Browse Courses → View Details → Enroll → View in Dashboard
3. **Admin Management**: Login as Admin → Manage Products/Courses/Orders
4. **Currency Selection**: First visit selects country → Prices auto-convert

## 📝 Notes for Backend Integration

### Data Models Needed
1. **User** (id, name, email, password, role, created_at)
2. **Product** (id, name, description, price, category, image, stock, created_at)
3. **Course** (id, title, description, price, level, instructor_id, created_at)
4. **Module** (id, course_id, title, content, order, created_at)
5. **Order** (id, user_id, items, total, status, shipping_address, created_at)
6. **Enrollment** (id, user_id, course_id, status, enrolled_at)
7. **Cart** (id, user_id, items, created_at)

### API Endpoints Required
- Auth: `/api/auth/login`, `/api/auth/signup`, `/api/auth/logout`
- Products: `/api/products` (GET, POST, PUT, DELETE)
- Courses: `/api/courses` (GET, POST, PUT, DELETE)
- Modules: `/api/modules` (GET, POST, PUT, DELETE)
- Orders: `/api/orders` (GET, POST, PUT)
- Enrollments: `/api/enrollments` (GET, POST, PUT)
- Users: `/api/users` (GET, PUT, DELETE)

## ✅ Production Readiness Checklist

### Completed
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Cart and checkout flow
- ✅ Authentication system (mock)
- ✅ Admin and user dashboards
- ✅ Currency conversion
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Form validation
- ✅ localStorage persistence
- ✅ SEO-friendly structure

### For Production (Backend Required)
- ⏳ Connect to real authentication API
- ⏳ Replace mock data with database
- ⏳ Implement actual payment processing
- ⏳ Add email notifications
- ⏳ Set up analytics tracking
- ⏳ Implement image upload for products
- ⏳ Add search with backend indexing
- ⏳ Implement real-time inventory management

## 🎯 Summary

The DecorStudioByLA platform is a complete, production-ready frontend application with:
- **16+ pages** fully implemented
- **5 dashboard** pages for users
- **7 dashboard** pages for admins
- **Full shopping** cart and checkout flow
- **Authentication** and role-based access
- **Currency** conversion for 6 countries
- **Responsive** design for all devices
- **Ready for backend** integration with clear API placeholders

The system provides a seamless experience for customers browsing and purchasing candles/courses, while giving administrators full control over products, courses, orders, and users through a comprehensive dashboard.
