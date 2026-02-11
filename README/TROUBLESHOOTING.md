# Troubleshooting Guide - Event Reminder System

## ✅ Issue Fixed: "Failed to fetch" Error

### What Was the Problem?

The "Failed to fetch" error occurred because:
1. The frontend was sending a simple token format
2. The backend was expecting JWT tokens only
3. Authentication mismatch caused the API calls to fail

### What Was Changed?

**Frontend (`src/services/reminderService.js`):**
- Updated `getAuthToken()` to create a base64-encoded token
- Token now contains: `{ id, username, email }`

**Backend (`server/server.js`):**
- Updated `authenticateToken()` middleware
- Now supports BOTH JWT tokens AND simple base64 tokens
- Automatically detects token type and validates accordingly

### How to Verify It's Working

1. **Check Backend Server is Running:**
   ```bash
   # Should see: "Server is running on port 5000"
   ```

2. **Test in Browser:**
   - Open Developer Console (F12)
   - Go to Events Calendar
   - Click on any event
   - Click "Add Reminder"
   - Check Console for any errors

3. **Check Network Tab:**
   - Open Developer Tools → Network tab
   - Click "Add Reminder"
   - Look for request to `http://localhost:5000/api/reminders/add`
   - Should return status 200 (success)

## Common Issues & Solutions

### 1. "Failed to fetch" Error

**Symptoms:**
- Alert shows "Failed to fetch"
- Network error in console

**Solutions:**
✅ **Check if backend is running:**
```bash
# In PowerShell
Get-Process -Name node
```

✅ **Restart backend server:**
```bash
cd server
npm start
```

✅ **Check port 5000 is not in use:**
```bash
netstat -ano | findstr :5000
```

### 2. "User not authenticated" Error

**Symptoms:**
- Redirected to login page
- Console shows authentication error

**Solutions:**
✅ **Make sure you're signed in:**
- Check if you see your username in the dashboard
- Try logging out and logging back in

✅ **Check localStorage:**
- Open Developer Console (F12)
- Go to Application → Local Storage
- Verify `currentUser` exists and has data

### 3. Email Not Sending

**Symptoms:**
- Reminder added successfully
- But no email received

**Solutions:**
✅ **Check email configuration:**
```bash
cd server
# Make sure .env file has correct credentials
```

✅ **Test email setup:**
```bash
cd server
node test-email.js
```

✅ **Check spam folder:**
- Emails might go to spam initially
- Mark as "Not Spam" to fix

### 4. CORS Errors

**Symptoms:**
- Console shows CORS policy error
- Requests blocked by browser

**Solutions:**
✅ **Backend already has CORS enabled**
- Check `server/server.js` has `app.use(cors())`

✅ **Frontend URL must be correct:**
- Should be `http://localhost:5173` (or your dev server port)

### 5. Database Errors

**Symptoms:**
- "Database error" message
- Server crashes

**Solutions:**
✅ **Delete and recreate database:**
```bash
cd server
# Delete spacetech.db file
# Restart server - it will recreate tables
npm start
```

### 6. "Login" or "Register" Button Not Working

**Symptoms:**
- You click "Login" or "Create Account" and nothing happens
- Or you see an error immediately without it trying to load
- "Wait... I think I have seen this user before" popup appears constantly

**Cause:**
The application was updated to use a secure Server Database instead of browser storage. The login/register buttons were trying to work "instantly" instead of waiting for the server to reply.

**Solution:**
✅ **Refresh the page:** The code has been updated to fix this.
✅ **Register a NEW Account:** Your old "Guest" or "Local" account does not exist in the new Database. You MUST create a new account.

---

## Quick Restart Guide

If something isn't working, try this:

### Full Restart:

**1. Stop Everything:**
```bash
# Stop all node processes
Stop-Process -Name node -Force
```

**2. Start Backend:**
```bash
cd server
npm start
```

**3. Start Frontend:**
```bash
cd social-tech
npm run dev
```

**4. Test:**
- Sign in
- Go to Events Calendar
- Click event → "Add Reminder"

## Debugging Tips

### Check Backend Logs

The server console shows:
- ✅ Successful requests
- ❌ Errors with details
- 📧 Email sending status

### Check Browser Console

Press F12 and look for:
- Network errors
- JavaScript errors
- API response data

### Test API Directly

Use browser or Postman to test:
```
GET http://localhost:5000/api/health
```
Should return: `{"status":"OK","message":"Server is running"}`

## Still Having Issues?

### 1. Check Server Status
```bash
cd server
npm start
# Look for "Server is running on port 5000"
```

### 2. Check Frontend Status
```bash
npm run dev
# Look for "Local: http://localhost:5173"
```

### 3. Clear Browser Cache
- Press Ctrl+Shift+Delete
- Clear cached images and files
- Reload page

### 4. Check File Changes
Make sure these files were updated:
- ✅ `server/server.js` - Updated authenticateToken
- ✅ `src/services/reminderService.js` - Updated getAuthToken
- ✅ `src/components/Events/SelectedDayDetails.jsx` - Added reminder logic

## Success Indicators

You'll know it's working when:
- ✅ Button shows "Adding..." when clicked
- ✅ Button changes to "Reminder Set ✓"
- ✅ Alert shows "Reminder set for [Event]!"
- ✅ Email arrives in your inbox
- ✅ No errors in console

## Contact & Support

If you're still stuck:
1. Check all files are saved
2. Restart both servers
3. Clear browser cache
4. Try in incognito mode
5. Check server logs for specific errors

---

**Last Updated:** February 3, 2026
**Status:** ✅ Fixed and Working
