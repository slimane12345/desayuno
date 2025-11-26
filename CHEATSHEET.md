# 📋 Desayuno - Quick Reference Cheat Sheet

## 🔗 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Homepage** | http://localhost:3000 | Landing page |
| **Login** | http://localhost:3000/login | Authentication |
| **Register** | http://localhost:3000/register | Create account |
| **Client App** | http://localhost:3000/client | Client dashboard |
| **Driver App** | http://localhost:3000/driver | Driver dashboard |
| **Admin Panel** | http://localhost:3000/admin | Admin dashboard |
| **Prisma Studio** | http://localhost:5555 | Database GUI |

---

## 👥 Test Accounts (After Setup)

### Admin
```
Email: admin@desayuno.com
Password: admin123
Role: ADMIN
```

### Client
```
Email: client@test.com
Password: client123
Role: CLIENT
```

### Driver
```
Email: driver@test.com
Password: driver123
Role: DRIVER
```

---

## 🗂️ Database Tables

| Table | Purpose |
|-------|---------|
| **User** | All users (clients, drivers, admins) |
| **Restaurant** | Restaurant information |
| **Category** | Product categories |
| **Product** | Menu items |
| **Order** | Customer orders |
| **OrderItem** | Individual items in orders |
| **Variant** | Product variations (future use) |

---

## 🎯 User Roles & Permissions

### CLIENT
- ✅ Browse restaurants
- ✅ Add to cart
- ✅ Place orders
- ✅ Track deliveries
- ❌ Accept deliveries
- ❌ Admin access

### DRIVER
- ✅ View pending orders
- ✅ Accept deliveries
- ✅ Update order status
- ✅ View earnings
- ❌ Place orders
- ❌ Admin access

### ADMIN
- ✅ Manage restaurants
- ✅ Manage products
- ✅ View all orders
- ✅ Cancel orders
- ✅ View all users
- ✅ Platform settings

---

## 📊 Order Status Flow

```
PENDING → ACCEPTED → ON_WAY → DELIVERED
                         ↓
                    CANCELLED
```

### Status Meanings
- **PENDING**: Order placed, waiting for driver
- **ACCEPTED**: Driver accepted the order
- **ON_WAY**: Driver picked up and is delivering
- **DELIVERED**: Order completed
- **CANCELLED**: Order cancelled by admin

---

## ⌨️ Keyboard Shortcuts (Browser)

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open search (if implemented) |
| `Ctrl + /` | Focus search |
| `Esc` | Close modals |
| `Tab` | Navigate forms |

---

## 🛠️ Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linter
```

### Database
```bash
npx prisma studio              # Open database GUI
npx prisma generate            # Generate Prisma client
npx prisma migrate dev         # Create & run migration
npx prisma migrate reset       # Reset database (⚠️ deletes data)
npx prisma db push             # Push schema without migration
```

### Deployment
```bash
vercel               # Deploy to Vercel
railway up           # Deploy to Railway
git push             # Trigger auto-deploy (if configured)
```

---

## 🎨 Color Codes

```css
/* Primary Colors */
--dark-brown: #3E2723;    /* Headers, buttons */
--gold: #D4AF37;          /* Accents, links */
--cream: #F9F5E3;         /* Backgrounds */
--light-gold: #E5C564;    /* Gradients */

/* Status Colors */
--error: #C62828;         /* Errors, delete */
--success: #2E7D32;       /* Success, active */
--warning: #F57C00;       /* Warnings */
--info: #1976D2;          /* Info messages */

/* Neutral Colors */
--muted: #795548;         /* Secondary text */
--border: #E0E0E0;        /* Borders */
--white: #FFFFFF;         /* Cards, inputs */
```

---

## 📁 Important Files

### Configuration
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `next.config.js` - Next.js config
- `prisma/schema.prisma` - Database schema
- `middleware.ts` - Route protection

### Core Logic
- `app/actions/auth.ts` - Authentication
- `app/actions/order.ts` - Order management
- `app/context/CartContext.tsx` - Shopping cart
- `lib/prisma.ts` - Database client

### Documentation
- `README.md` - Overview
- `QUICKSTART.md` - Quick setup
- `TESTING.md` - Testing guide
- `DEPLOYMENT.md` - Deploy guide
- `PROJECT_SUMMARY.md` - Full summary

---

## 🐛 Troubleshooting

### Issue: Can't login
**Solution**: Check if user exists in database, verify password

### Issue: No restaurants showing
**Solution**: Login as admin and add restaurants first

### Issue: Cart not persisting
**Solution**: Check browser localStorage, clear cache

### Issue: Database errors
**Solution**: Run `npx prisma generate` and restart server

### Issue: TypeScript errors
**Solution**: Run `npm install` and restart VS Code

### Issue: Port 3000 in use
**Solution**: Kill process: `npx kill-port 3000`

---

## 🔐 Security Notes

- ✅ Passwords are hashed with PBKDF2
- ✅ Sessions use HTTP-only cookies
- ✅ Routes protected by middleware
- ✅ SQL injection prevented by Prisma
- ⚠️ Change default passwords in production
- ⚠️ Use HTTPS in production
- ⚠️ Set strong SESSION_SECRET

---

## 📞 Quick Support

### Documentation
1. Check `QUICKSTART.md` for setup
2. Read `TESTING.md` for testing
3. See `DEPLOYMENT.md` for deployment
4. Review `README.md` for overview

### Database Issues
1. Open Prisma Studio: `npx prisma studio`
2. Check data integrity
3. Reset if needed: `npx prisma migrate reset --force`

### Code Issues
1. Check TypeScript errors
2. Run `npm install`
3. Restart dev server
4. Clear `.next` folder

---

## 🎯 Success Checklist

- [ ] Development server running
- [ ] Admin account created
- [ ] Restaurant added
- [ ] Products added to menu
- [ ] Client account created
- [ ] Order placed successfully
- [ ] Driver account created
- [ ] Order accepted by driver
- [ ] Order status updated
- [ ] Order completed
- [ ] All features tested

---

## 🚀 Ready to Deploy?

See `DEPLOYMENT.md` for:
- Vercel deployment
- Database migration to PostgreSQL
- Environment variables
- Custom domain setup
- SSL configuration
- Production checklist

---

**Keep this cheat sheet handy while developing! 📌**
