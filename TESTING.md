# 🚀 Quick Start Testing Guide

The development server is now running at **http://localhost:3000**

## 📋 Step-by-Step Testing Flow

### 1️⃣ Create Admin Account (Manual Database Edit)

Since we need an admin to set up the platform, you'll need to create one manually:

**Option A: Register as Client then Update Database**
1. Go to http://localhost:3000/register
2. Register with:
   - Name: Admin User
   - Email: admin@desayuno.com
   - Phone: 0600000001
   - Password: admin123
   - Role: Client (we'll change this)

3. Update the role in the database:
```bash
npx prisma studio
```
- Open the `User` table
- Find your user
- Change `role` from `CLIENT` to `ADMIN`
- Save

**Option B: Direct Database Insert**
```bash
npx prisma studio
```
- Click on `User` table
- Click "Add record"
- Fill in:
  - phone: 0600000001
  - email: admin@desayuno.com
  - name: Admin User
  - role: ADMIN
  - password: (copy a hashed password from another user, or register first then copy)

### 2️⃣ Set Up Platform Data (As Admin)

1. **Login as Admin**:
   - Go to http://localhost:3000/login
   - Email: admin@desayuno.com
   - Password: admin123

2. **Add a Restaurant**:
   - Click "Restaurants" in sidebar
   - Fill in the form:
     - Name: Chez Fatima
     - Description: Traditional Moroccan breakfast
     - Address: 123 Rue Mohamed V, Casablanca
   - Click "Add Restaurant"

3. **Add Menu Items**:
   - Click "Manage Menu" on the restaurant
   - Add products:
     - **Msemen**: 15 MAD, Category: Breads
     - **Mint Tea**: 10 MAD, Category: Drinks
     - **Baghrir**: 20 MAD, Category: Breads
     - **Orange Juice**: 15 MAD, Category: Drinks
   - Add 4-5 items to have a good menu

### 3️⃣ Create Client Account

1. **Logout** from admin (click profile icon → Log Out)
2. **Register as Client**:
   - Go to http://localhost:3000/register
   - Name: Test Client
   - Email: client@test.com
   - Phone: 0611111111
   - Password: client123
   - Role: Client
3. You'll be automatically logged in and redirected to `/client`

### 4️⃣ Test Client Flow

1. **Browse Restaurant**:
   - You should see "Chez Fatima" on the home page
   - Click on it to view the menu

2. **Add to Cart**:
   - Click "Add +" on several items
   - Watch the cart badge update in the header

3. **View Cart**:
   - Click the cart icon (🛒) in the header
   - Review your items
   - See the total

4. **Checkout**:
   - Click "Checkout 💳"
   - Order should be created successfully
   - You'll be redirected to `/client`

5. **Track Order**:
   - Click "Orders" in the bottom navigation
   - See your order with "PENDING" status
   - Note the progress bar

### 5️⃣ Create Driver Account

1. **Logout** from client
2. **Register as Driver**:
   - Go to http://localhost:3000/register
   - Name: Test Driver
   - Email: driver@test.com
   - Phone: 0622222222
   - Password: driver123
   - Role: Driver
3. You'll be redirected to `/driver`

### 6️⃣ Test Driver Flow

1. **View Pending Orders**:
   - You should see the order you just created
   - It shows restaurant name, total, and items

2. **Accept Order**:
   - Click "Accept Delivery"
   - Order moves to "Active Order" section

3. **Update Status**:
   - Click "Mark as Picked Up"
   - Status changes to "ON_WAY"
   - Click "Complete Delivery"
   - Status changes to "DELIVERED"

4. **Check Earnings**:
   - Click "Earnings" in bottom nav
   - See the completed delivery
   - View total earnings

### 7️⃣ Verify Updates (As Client)

1. **Logout** from driver
2. **Login as Client** (client@test.com / client123)
3. **Check Orders**:
   - Go to "Orders" page
   - Your order should now show "DELIVERED"
   - It should be in "Past Orders" section

### 8️⃣ Admin Monitoring

1. **Logout** and **Login as Admin**
2. **View All Orders**:
   - Click "Orders" in sidebar
   - See all platform orders
   - View status, client, driver info

3. **View Users**:
   - Click "Drivers" → See your test driver
   - Click "Clients" → See your test client

4. **Platform Settings**:
   - Click "Settings"
   - View configuration options

## ✅ Testing Checklist

- [ ] Admin can add restaurants
- [ ] Admin can add products to menus
- [ ] Client can browse restaurants
- [ ] Client can add items to cart
- [ ] Cart persists after page refresh
- [ ] Client can checkout
- [ ] Driver can see pending orders
- [ ] Driver can accept orders
- [ ] Driver can update order status
- [ ] Client sees updated order status
- [ ] Earnings update for drivers
- [ ] Admin can view all orders
- [ ] Admin can cancel orders
- [ ] Logout works for all roles
- [ ] Route protection works (try accessing /admin as client)

## 🐛 Common Issues

**Issue**: Can't login
- **Solution**: Make sure you registered with the correct role
- Check database with `npx prisma studio`

**Issue**: No restaurants showing
- **Solution**: Login as admin and add restaurants first

**Issue**: Order not appearing
- **Solution**: Refresh the page, or check if order was created in admin panel

**Issue**: TypeScript errors
- **Solution**: Run `npx prisma generate` to regenerate the client

**Issue**: Database errors
- **Solution**: Run `npx prisma migrate reset --force` to reset database

## 🎯 Advanced Testing

1. **Test Cart Restrictions**:
   - Add items from one restaurant
   - Try to add items from another restaurant
   - Should prompt to clear cart

2. **Test Route Protection**:
   - Logout
   - Try to access `/admin` → Should redirect to login
   - Login as client
   - Try to access `/admin` → Should redirect to login

3. **Test Order Cancellation**:
   - As admin, cancel a pending order
   - Verify it shows as CANCELLED everywhere

## 📊 Database Access

To view/edit data directly:
```bash
npx prisma studio
```
This opens a GUI at http://localhost:5555

## 🔄 Reset Everything

If you want to start fresh:
```bash
npx prisma migrate reset --force
```
This will delete all data and recreate the database.

---

Happy testing! 🎉
