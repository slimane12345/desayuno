# 🥐 Desayuno - Moroccan Breakfast Delivery Platform

A complete full-stack breakfast delivery platform built with Next.js, featuring separate interfaces for Clients, Drivers, and Administrators.

## 🌟 Features

### 🔐 Authentication System
- User registration with role selection (Client/Driver/Admin)
- Secure login with PBKDF2 password hashing
- Session-based authentication with HTTP-only cookies
- Role-based access control via middleware
- Protected routes for each user type

### 👤 Client Application
- **Browse Restaurants**: View all active restaurants with details
- **Menu Exploration**: Browse products by category for each restaurant
- **Shopping Cart**: Add items to cart with local storage persistence
- **Order Placement**: Checkout and create orders
- **Order Tracking**: Real-time order status with visual progress bar
- **Profile Management**: View account details and logout

### 🛵 Driver Application
- **Order Dashboard**: View all pending delivery requests
- **Accept Orders**: Claim deliveries and start routes
- **Status Updates**: Update order status (Picked Up, On Way, Delivered)
- **Earnings Tracker**: View total earnings and delivery history
- **Profile**: Manage driver information

### ⚙️ Admin Dashboard
- **Restaurant Management**: Add and manage restaurants
- **Menu Management**: Add products to restaurant menus with categories
- **Order Oversight**: View all platform orders and cancel if needed
- **User Management**: View all drivers and clients
- **Platform Settings**: Configure delivery fees and service areas

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Vanilla CSS with Moroccan-inspired design
- **Authentication**: Custom implementation with Node.js crypto

## 📁 Project Structure

```
desayuno/
├── app/
│   ├── (admin)/          # Admin dashboard routes
│   ├── (client)/         # Client app routes (unused wrapper)
│   ├── (driver)/         # Driver app routes
│   ├── actions/          # Server actions
│   │   ├── auth.ts       # Authentication logic
│   │   ├── checkout.ts   # Order creation
│   │   ├── order.ts      # Order management
│   │   ├── product.ts    # Product management
│   │   └── restaurant.ts # Restaurant management
│   ├── cart/             # Shopping cart page
│   ├── client/           # Client home page
│   ├── context/          # React contexts
│   │   └── CartContext.tsx
│   ├── login/            # Login page
│   ├── orders/           # Order tracking page
│   ├── profile/          # Client profile page
│   ├── register/         # Registration page
│   └── restaurant/       # Restaurant details pages
├── prisma/
│   └── schema.prisma     # Database schema
├── middleware.ts         # Route protection
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Clone and install dependencies**:
```bash
cd desayuno
npm install
```

2. **Set up the database**:
```bash
npx prisma generate
npx prisma migrate dev
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Access the application**:
- Main page: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register

## 📖 Usage Guide

### First Time Setup

1. **Create an Admin Account**:
   - Go to `/register`
   - Fill in details (you'll need to manually set role to ADMIN in database)
   - Or register as Client/Driver through the UI

2. **Add Restaurants** (Admin):
   - Login as admin
   - Navigate to "Restaurants"
   - Click "Add New Restaurant"
   - Fill in restaurant details

3. **Add Menu Items** (Admin):
   - Click "Manage Menu" on a restaurant
   - Add products with name, price, and category
   - Products will appear in the client app

### Client Flow

1. **Register/Login** as a Client
2. **Browse** restaurants on the home page
3. **Select** a restaurant to view menu
4. **Add items** to cart
5. **Checkout** to place order
6. **Track** order status in "Orders" page

### Driver Flow

1. **Register/Login** as a Driver
2. **View** pending orders on dashboard
3. **Accept** a delivery
4. **Update status** as you progress:
   - Mark as "Picked Up" when you collect the order
   - Mark as "Delivered" when complete
5. **View earnings** in the Earnings page

### Admin Flow

1. **Login** as Admin
2. **Manage** restaurants and menus
3. **Monitor** all orders
4. **View** driver and client lists
5. **Configure** platform settings

## 🎨 Design Philosophy

The platform features a **Moroccan-inspired aesthetic**:
- Warm color palette (#3E2723, #D4AF37, #F9F5E3)
- Clean, modern UI with smooth transitions
- Mobile-first responsive design
- Intuitive navigation patterns

## 🔒 Security Features

- Password hashing with PBKDF2 (1000 iterations)
- HTTP-only session cookies
- Role-based access control
- Protected API routes
- Input validation on forms

## 📊 Database Schema

### User
- Supports multiple roles: CLIENT, DRIVER, ADMIN
- Email and phone authentication
- Hashed password storage

### Restaurant
- Name, description, address
- Opening/closing times
- Active status flag

### Product
- Name, price, description
- Category association
- Availability status

### Order
- Status tracking (PENDING → ACCEPTED → ON_WAY → DELIVERED)
- Client and driver associations
- Order items with quantities

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time notifications (WebSockets)
- [ ] Image upload for restaurants and products
- [ ] Advanced search and filtering
- [ ] Order rating and reviews
- [ ] Delivery route optimization
- [ ] Multi-language support (Arabic/French)
- [ ] SMS notifications
- [ ] Analytics dashboard

## 📝 Notes

- Database resets during migrations will clear all data
- Guest checkout is supported for testing
- Mock data is used in some areas (delivery fees, etc.)
- Production deployment requires environment configuration

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive error handling
- Implementing proper logging
- Setting up monitoring
- Adding automated tests
- Configuring production database
- Setting up CI/CD pipeline

## 📄 License

This project is for educational and demonstration purposes.

---

Built with ❤️ using Next.js and TypeScript
