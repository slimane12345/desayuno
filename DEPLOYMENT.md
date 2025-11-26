# 🚀 Deployment Guide - Desayuno Platform

This guide will help you deploy the Desayuno platform to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested all features locally
- [ ] Created at least one admin account
- [ ] Added sample restaurants and products
- [ ] Verified authentication works
- [ ] Tested the complete order flow
- [ ] Reviewed security settings

## 🌐 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

**Pros:**
- Optimized for Next.js
- Free tier available
- Automatic deployments from Git
- Built-in SSL
- Global CDN

**Steps:**

1. **Prepare Database**
   - SQLite won't work on Vercel (serverless)
   - Switch to PostgreSQL (recommended)

2. **Update Database Configuration**

   Install PostgreSQL adapter:
   ```bash
   npm install @prisma/adapter-neon
   ```

   Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Set Up PostgreSQL Database**

   **Option A: Neon (Free tier)**
   - Go to https://neon.tech
   - Create a new project
   - Copy the connection string

   **Option B: Supabase (Free tier)**
   - Go to https://supabase.com
   - Create a new project
   - Get the connection string from Settings → Database

   **Option C: Railway (Free trial)**
   - Go to https://railway.app
   - Create a PostgreSQL database
   - Copy the connection string

4. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Deploy
   vercel
   ```

   Or use the Vercel dashboard:
   - Go to https://vercel.com
   - Click "Import Project"
   - Connect your Git repository
   - Add environment variables (see below)
   - Deploy!

5. **Environment Variables**

   Add these in Vercel dashboard (Settings → Environment Variables):
   ```
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=production
   ```

6. **Run Migrations**

   After deployment, run migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

### Option 2: Railway

**Pros:**
- Easy database setup
- Free trial ($5 credit)
- Supports SQLite or PostgreSQL
- Simple deployment

**Steps:**

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will create and link it automatically

4. **Configure Environment**
   - Railway auto-detects Next.js
   - Add any custom environment variables

5. **Deploy**
   - Railway deploys automatically on push
   - View logs to monitor deployment

---

### Option 3: DigitalOcean App Platform

**Pros:**
- Full control
- Predictable pricing
- Managed database options

**Steps:**

1. **Create App**
   - Go to DigitalOcean
   - Create new App
   - Connect GitHub repository

2. **Add Database**
   - Create managed PostgreSQL database
   - Link to your app

3. **Configure Build**
   ```yaml
   build_command: npm run build
   run_command: npm start
   ```

4. **Deploy**
   - DigitalOcean handles the rest

---

## 🔧 Production Configuration

### 1. Environment Variables

Create `.env.production`:
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Security (optional)
SESSION_SECRET=your-random-secret-key-here
```

### 2. Update Middleware

For production, update `middleware.ts`:
```typescript
export function middleware(request: NextRequest) {
    // ... existing code ...
    
    // Add security headers
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
}
```

### 3. Update Auth Actions

In `app/actions/auth.ts`, ensure cookies are secure:
```typescript
cookieStore.set('auth_session', JSON.stringify({ 
    userId: user.id, 
    role: user.role 
}), {
    httpOnly: true,
    secure: true, // Always true in production
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
});
```

### 4. Database Migration

After deploying with PostgreSQL:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed initial data
npx prisma db seed
```

---

## 🔒 Security Hardening

### 1. Rate Limiting

Install rate limiting:
```bash
npm install @upstash/ratelimit @upstash/redis
```

Add to API routes:
```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
```

### 2. CORS Configuration

Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'your-domain.com' },
        ],
      },
    ];
  },
};
```

### 3. Environment Validation

Create `lib/env.ts`:
```typescript
function validateEnv() {
  const required = ['DATABASE_URL'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

validateEnv();
```

---

## 📊 Monitoring & Analytics

### 1. Error Tracking

**Sentry** (Recommended):
```bash
npm install @sentry/nextjs
```

Initialize in `app/layout.tsx`:
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Analytics

**Vercel Analytics**:
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Performance Monitoring

Use Vercel Speed Insights:
```bash
npm install @vercel/speed-insights
```

---

## 🗄️ Database Backup

### Automated Backups

**For PostgreSQL on Railway/Neon:**
- Enable automatic backups in dashboard
- Set retention period (7-30 days)

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📱 Domain Configuration

### 1. Add Custom Domain

**On Vercel:**
- Go to Project Settings → Domains
- Add your domain
- Update DNS records as instructed

**DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. SSL Certificate

- Vercel/Railway provide automatic SSL
- Certificate auto-renews
- Force HTTPS in production

---

## 🧪 Post-Deployment Testing

### 1. Smoke Tests

- [ ] Homepage loads
- [ ] Registration works
- [ ] Login works
- [ ] Client can browse restaurants
- [ ] Client can place order
- [ ] Driver can accept order
- [ ] Admin can manage platform
- [ ] Logout works

### 2. Performance Tests

Use Lighthouse:
```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

Target scores:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

---

## 🚨 Troubleshooting

### Common Issues

**Issue**: Database connection fails
**Solution**: Check DATABASE_URL format and firewall rules

**Issue**: Build fails on Vercel
**Solution**: Check build logs, ensure all dependencies are in `package.json`

**Issue**: Authentication not working
**Solution**: Verify cookie settings (secure: true in production)

**Issue**: Slow page loads
**Solution**: Enable caching, optimize images, use CDN

---

## 📈 Scaling Considerations

### When to Scale

- **Traffic**: >10,000 users/day
- **Database**: >1GB data
- **Orders**: >1,000/day

### Scaling Options

1. **Database**: Upgrade to larger PostgreSQL instance
2. **Caching**: Add Redis for sessions and cart data
3. **CDN**: Use Cloudflare for static assets
4. **Load Balancing**: Multiple server instances
5. **Queue System**: Bull/BullMQ for order processing

---

## 💰 Cost Estimation

### Free Tier (Good for testing)
- **Vercel**: Free (hobby plan)
- **Neon PostgreSQL**: Free (0.5GB)
- **Total**: $0/month

### Small Business (100-1000 orders/day)
- **Vercel Pro**: $20/month
- **Neon Scale**: $19/month
- **Total**: ~$40/month

### Medium Business (1000-10000 orders/day)
- **Vercel Enterprise**: Custom pricing
- **Managed PostgreSQL**: $50-200/month
- **Redis**: $10-30/month
- **Total**: ~$100-300/month

---

## ✅ Launch Checklist

Before going live:

- [ ] Database migrated to PostgreSQL
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Error tracking setup (Sentry)
- [ ] Analytics configured
- [ ] Backup strategy in place
- [ ] Admin account created
- [ ] Sample data added
- [ ] All features tested in production
- [ ] Performance optimized (Lighthouse >90)
- [ ] Security headers configured
- [ ] GDPR compliance reviewed (if applicable)
- [ ] Terms of Service added
- [ ] Privacy Policy added

---

## 🎉 You're Ready to Launch!

Your Desayuno platform is production-ready. Follow this guide to deploy with confidence.

**Need help?** Check the troubleshooting section or review the logs in your hosting platform.

---

*Good luck with your breakfast delivery platform! 🥐*
