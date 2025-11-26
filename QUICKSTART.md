# 🚀 Quick Start - Desayuno Platform

## Your Platform is Running! ✅

- **Frontend**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (if opened)

---

## ⚡ 3-Minute Setup

### Step 1: Create Admin Account (1 min)

**Option A: Via Registration + Database**
1. Go to http://localhost:3000/register
2. Fill in:
   - Name: `Admin User`
   - Email: `admin@desayuno.com`
   - Phone: `0600000001`
   - Password: `admin123`
   - Role: `Client` (we'll change this)
3. Open Prisma Studio: http://localhost:5555
4. Click `User` table → Find your user → Change `role` to `ADMIN` → Save

**Option B: Direct in Prisma Studio**
1. Open http://localhost:5555
2. Click `User` table → `Add record`
3. Fill in:
   ```
   phone: 0600000001
   email: admin@desayuno.com
   name: Admin User
   role: ADMIN
   password: (leave empty for now, register first to get hashed password)
   ```

### Step 2: Add Restaurant (1 min)

1. Login at http://localhost:3000/login with admin credentials
2. Click "Restaurants" in sidebar
3. Add restaurant:
   - Name: `Chez Fatima`
   - Description: `Traditional Moroccan breakfast`
   - Address: `123 Rue Mohamed V, Casablanca`
4. Click "Add Restaurant"

### Step 3: Add Menu Items (1 min)

1. Click "Manage Menu" on your restaurant
2. Add these products:
   - **Msemen**: 15 MAD, Category: Breads
   - **Mint Tea**: 10 MAD, Category: Drinks
   - **Baghrir**: 20 MAD, Category: Breads
   - **Orange Juice**: 15 MAD, Category: Drinks
   - **Harcha**: 12 MAD, Category: Breads

---

## 🎯 Test the Complete Flow

### As Client (5 min)

1. **Logout** from admin
2. **Register** at `/register`:
   - Email: `client@test.com`
   - Password: `client123`
   - Role: `Client`
3. **Browse** restaurant → **Add items** to cart
4. **Checkout** → Order created!
5. **View Orders** → See your pending order

### As Driver (5 min)

1. **Logout** from client
2. **Register** at `/register`:
   - Email: `driver@test.com`
   - Password: `driver123`
   - Role: `Driver`
3. **View** pending orders
4. **Accept** the order
5. **Update status**: Pick Up → On Way → Delivered
6. **Check earnings**

### Verify (2 min)

1. **Login as client** → Check order status (should be "Delivered")
2. **Login as admin** → View all orders, users, stats

---

## 🎨 Explore the Platform

### Client Features
- 🏠 **Home**: http://localhost:3000/client
- 🛒 **Cart**: http://localhost:3000/cart
- 📦 **Orders**: http://localhost:3000/orders
- 👤 **Profile**: http://localhost:3000/profile

### Driver Features
- 🛵 **Dashboard**: http://localhost:3000/driver
- 💰 **Earnings**: http://localhost:3000/driver/earnings
- ⚙️ **Profile**: http://localhost:3000/driver/profile

### Admin Features
- 📊 **Dashboard**: http://localhost:3000/admin
- 🏪 **Restaurants**: http://localhost:3000/admin/restaurants
- 📋 **Orders**: http://localhost:3000/admin/orders
- 👥 **Drivers**: http://localhost:3000/admin/drivers
- 👥 **Clients**: http://localhost:3000/admin/clients
- ⚙️ **Settings**: http://localhost:3000/admin/settings

---

## 🔧 Useful Commands

```bash
# View/Edit Database
npx prisma studio

# Reset Database (WARNING: Deletes all data)
npx prisma migrate reset --force

# Generate Prisma Client (after schema changes)
npx prisma generate

# Run Migrations
npx prisma migrate dev

# Build for Production
npm run build

# Start Production Server
npm start
```

---

## 📖 Need Help?

- **Testing Guide**: See `TESTING.md` for detailed steps
- **Deployment**: See `DEPLOYMENT.md` for production setup
- **Overview**: See `README.md` for platform features
- **Summary**: See `PROJECT_SUMMARY.md` for complete overview

---

## 🎉 You're All Set!

The platform is ready to use. Start by creating an admin account and adding your first restaurant!

**Happy testing! 🥐☕**
