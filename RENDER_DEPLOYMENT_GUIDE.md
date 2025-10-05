# Zyvolt Shop - Render Deployment Guide

## 📋 Prerequisites

Before deploying to Render, ensure you have:

1. ✅ A GitHub/GitLab/Bitbucket account
2. ✅ Your code pushed to a Git repository
3. ✅ A Render account (sign up at [render.com](https://render.com))
4. ✅ Razorpay API keys (for payment gateway)

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes** to your local repository:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   ```

2. **Push to your remote repository**:
   ```bash
   git push origin main
   ```

### Step 2: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up using your GitHub/GitLab/Bitbucket account
3. Authorize Render to access your repositories

### Step 3: Deploy Using Blueprint (Recommended)

Render will automatically detect the `render.yaml` file in your repository.

1. **Go to Render Dashboard**
2. Click **"New +"** → **"Blueprint"**
3. **Connect your repository**:
   - Select your Git provider
   - Choose the repository containing your Zyvolt Shop code
4. **Configure the Blueprint**:
   - Render will detect `render.yaml`
   - Review the services (web service + PostgreSQL database)
   - Click **"Apply"**

### Step 4: Configure Environment Variables

After deployment starts, you need to set additional environment variables:

1. Go to your **web service** in Render dashboard
2. Navigate to **"Environment"** tab
3. Add the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `APP_BASE_URL` | `https://your-app.onrender.com` | Your Render service URL |
| `RAZORPAY_KEY_ID` | `your_razorpay_key_id` | Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | `your_razorpay_key_secret` | Razorpay API Secret |
| `SESSION_SECRET` | (auto-generated) | Session encryption key |

> **Note**: `DB_*` variables and `JWT_SECRET` are automatically configured from the database connection.

### Step 5: Manual Deployment (Alternative)

If you prefer manual setup instead of Blueprint:

#### 5.1 Create PostgreSQL Database

1. Click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `zyvoltshop-db`
   - **Database**: `evershop`
   - **User**: `evershop_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free (for testing) or Starter (for production)
3. Click **"Create Database"**
4. Wait for database to provision

#### 5.2 Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your repository
3. Configure:
   - **Name**: `zyvoltshop`
   - **Environment**: `Node`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (for testing) or Starter (for production)

4. **Add Environment Variables**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add all variables from Step 4 above
   - For database variables, use the connection details from your PostgreSQL service

5. Click **"Create Web Service"**

## 🔧 Post-Deployment Configuration

### 1. Run Database Migrations

After first deployment, you may need to initialize the database:

1. Go to your web service
2. Click **"Shell"** tab
3. Run setup command:
   ```bash
   npm run setup
   ```

### 2. Configure Custom Domain (Optional)

1. Go to your web service
2. Navigate to **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Follow instructions to configure DNS

### 3. Set Up SSL Certificate

Render automatically provides free SSL certificates for:
- Your `.onrender.com` subdomain
- Custom domains (after DNS verification)

### 4. Configure Razorpay Webhook

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **Webhooks**
3. Add webhook URL:
   ```
   https://your-app.onrender.com/api/razorpayWebhook
   ```
4. Select events to track:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `refund.created`
5. Save the webhook secret and add it to Render environment variables as `RAZORPAY_WEBHOOK_SECRET`

## 📊 Monitoring & Logs

### View Logs

1. Go to your web service in Render dashboard
2. Click **"Logs"** tab
3. View real-time application logs

### Monitor Performance

1. Navigate to **"Metrics"** tab
2. Monitor:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Set Up Alerts

1. Go to **"Settings"** → **"Notifications"**
2. Configure alerts for:
   - Deploy failures
   - Service health issues
   - High resource usage

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` file to Git
2. **Database**: Use SSL mode (`DB_SSLMODE=require`) in production
3. **API Keys**: Rotate Razorpay keys regularly
4. **HTTPS**: Always use HTTPS (enabled by default on Render)
5. **Backups**: Enable automatic database backups in Render

## 💰 Pricing Considerations

### Free Tier Limitations

- **Web Service**: Spins down after 15 minutes of inactivity
- **Database**: 90-day expiration, 1GB storage
- **Bandwidth**: 100GB/month

### Recommended Production Setup

- **Web Service**: Starter ($7/month) or Standard ($25/month)
- **Database**: Starter ($7/month) - includes 256MB RAM, 1GB storage
- **Total**: ~$14-32/month for small to medium traffic

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build command fails
**Solution**: 
- Check `package.json` scripts
- Ensure all dependencies are listed
- Review build logs for specific errors

### Database Connection Errors

**Issue**: Cannot connect to database
**Solution**:
- Verify database environment variables
- Check database is running
- Ensure `DB_SSLMODE=require` for Render PostgreSQL

### Application Not Starting

**Issue**: Service starts but crashes
**Solution**:
- Check logs for error messages
- Verify start command: `npm start`
- Ensure port 3000 is exposed
- Check all required environment variables are set

### Razorpay Integration Issues

**Issue**: Payments not working
**Solution**:
- Verify Razorpay API keys are correct
- Check webhook URL is configured
- Ensure `APP_BASE_URL` is set correctly
- Review Razorpay dashboard for payment logs

## 📝 Maintenance

### Update Deployment

1. Push changes to your Git repository:
   ```bash
   git push origin main
   ```
2. Render automatically detects changes and redeploys

### Manual Redeploy

1. Go to your web service
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Rollback

1. Go to **"Events"** tab
2. Find previous successful deploy
3. Click **"Rollback to this version"**

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [EverShop Documentation](https://docs.evershop.io)
- [Razorpay Documentation](https://razorpay.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)

## 📞 Support

- **Render Support**: [support@render.com](mailto:support@render.com)
- **EverShop Community**: [GitHub Discussions](https://github.com/evershopcommerce/evershop/discussions)
- **Razorpay Support**: [support@razorpay.com](mailto:support@razorpay.com)

---

## ✅ Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Render account created
- [ ] Blueprint deployed or services created manually
- [ ] Database provisioned and connected
- [ ] Environment variables configured
- [ ] Database initialized (`npm run setup`)
- [ ] Application accessible via Render URL
- [ ] Razorpay webhook configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate verified
- [ ] Monitoring and alerts set up
- [ ] Backup strategy implemented

**Congratulations! Your Zyvolt Shop is now live on Render! 🎉**
