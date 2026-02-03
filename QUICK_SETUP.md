# Quick Setup Guide - Event Reminder System

## 🚀 Quick Start (5 minutes)

### Step 1: Configure Email Settings

1. Create `.env` file in the `server` folder:
   ```bash
   cd server
   copy .env.example .env
   ```

2. Edit `.env` and add your Gmail credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

### Step 2: Get Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to https://myaccount.google.com/apppasswords
4. Select **Mail** and **Windows Computer**
5. Copy the 16-character password
6. Paste it in `.env` as `EMAIL_PASSWORD`

### Step 3: Test Email Configuration

```bash
cd server
node test-email.js
```

You should see: ✅ Test email sent successfully!

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd social-tech
npm run dev
```

## 🎯 How to Use

1. **Sign In** to your account
2. Go to **Events Calendar** page
3. Click on any **celestial event**
4. Click **"Add Reminder"** button
5. Check your **email inbox** for confirmation! 📧

## ✨ Features

- ✅ Email notifications sent instantly
- ✅ Beautiful HTML email templates
- ✅ Reminders saved in database
- ✅ Toggle reminders on/off
- ✅ Works only for authenticated users

## 🔧 Troubleshooting

**Email not sending?**
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable **2-Factor Authentication** on Gmail
- Check `.env` file has correct credentials
- Look at server console for error messages

**Button not working?**
- Make sure you're **signed in**
- Check browser console for errors
- Verify backend server is running on port 5000

## 📝 Notes

- Reminders are stored per user in SQLite database
- Each user can have multiple reminders
- Email is sent immediately when reminder is added
- Future enhancement: Send reminder email 1 day before event

---

**Need help?** Check `EMAIL_SETUP_README.md` for detailed documentation.
