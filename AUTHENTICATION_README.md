# SpaceTech Authentication System

This guide explains how to use the authentication system that has been integrated into your SpaceTech application.

## Features

✅ User Registration with validation
✅ User Login with credential verification
✅ Username display on Dashboard and Learn pages
✅ LocalStorage-based data persistence (for quick setup)
✅ Optional backend server with SQLite database (for production)
✅ Password validation and duplicate user checking
✅ User stats tracking (learning streak, XP, level, progress)

## Quick Start (LocalStorage Version)

The application is already configured to work with browser localStorage. No additional setup required!

### How It Works

1. **Register a new account**: Go to `/auth` route and click "Register" tab
2. **Fill in the form**:
   - Full Name
   - Email Address
   - Username (minimum 3 characters)
   - Password (minimum 6 characters)
   - Confirm Password
3. **Submit**: Click "Create Account →"
4. **Redirect**: You'll be automatically redirected to the dashboard
5. **See your username**: Your username will appear on Dashboard and Learn pages

### Login

1. Go to `/auth` route
2. Enter your email/username and password
3. Click "Initiate Login →"
4. You'll be redirected to the dashboard

### Data Storage

- User data is stored in browser's localStorage under the key `users`
- Current logged-in user is stored under `currentUser`
- Data persists across browser sessions
- Clearing browser data will delete all stored users

## Production Setup (Backend Server with SQLite)

For a production-ready solution with proper database management:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd space-tech/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Edit `.env` and set your JWT secret:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

### API Endpoints

#### Authentication

- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "identifier": "johndoe",
    "password": "password123"
  }
  ```

- **GET** `/api/auth/check-username/:username` - Check username availability
- **GET** `/api/auth/check-email/:email` - Check email availability

#### User Management (Protected)

- **GET** `/api/user/profile` - Get user profile
  - Requires: `Authorization: Bearer <token>` header

- **PATCH** `/api/user/stats` - Update user stats
  ```json
  {
    "learningStreak": 5,
    "totalXP": 1200,
    "level": 3,
    "progress": 45
  }
  ```

#### Health Check

- **GET** `/api/health` - Check if server is running

### Database

- SQLite database file: `server/spacetech.db`
- Automatically created on first run
- Users table schema:
  ```sql
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    learningStreak INTEGER DEFAULT 0,
    totalXP INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    progress INTEGER DEFAULT 0
  )
  ```

### Connecting Frontend to Backend

To use the backend API instead of localStorage, you would need to:

1. Create an API service file (`src/services/api.js`)
2. Update `AuthContext.jsx` to use API calls instead of localStorage
3. Store JWT tokens in localStorage for authentication
4. Add API base URL to environment variables

Example API service:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },
  
  login: async (identifier, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    return response.json();
  }
};
```

## File Structure

```
space-tech/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx          # Authentication context provider
│   ├── components/
│   │   ├── auth/
│   │   │   └── user.jsx             # Login/Register form
│   │   ├── Dashboard/
│   │   │   └── RealSpaceDashboard.jsx  # Dashboard with username
│   │   └── learn/
│   │       └── learn.jsx            # Learn page with username
│   └── App.jsx                      # App wrapped with AuthProvider
└── server/
    ├── server.js                    # Express server
    ├── package.json                 # Server dependencies
    ├── .env.example                 # Environment variables template
    └── spacetech.db                 # SQLite database (auto-generated)
```

## Features Explained

### Username Display

The username is displayed in two places:
1. **Dashboard**: "Welcome back, [username]"
2. **Learn Page**: "Welcome back, [username]!" with learning streak

### User Stats Tracking

Each user has:
- **Learning Streak**: Number of consecutive days learning
- **Total XP**: Experience points earned
- **Level**: Current level (starts at 1)
- **Progress**: Overall progress percentage

These are stored but not yet actively updated. You can implement logic to:
- Increment learning streak daily
- Award XP for completing quizzes
- Level up based on XP thresholds
- Track progress through course completion

### Security Notes

**Current Implementation (LocalStorage):**
- ⚠️ Passwords stored in plain text
- ⚠️ No encryption
- ✅ Good for development/demo
- ❌ Not suitable for production

**Backend Implementation:**
- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ Protected API endpoints
- ✅ Production-ready

## Testing

### Test the LocalStorage Version

1. Open the app in your browser
2. Go to `/auth`
3. Register with test data:
   - Full Name: Test User
   - Email: test@example.com
   - Username: testuser
   - Password: test123
   - Confirm Password: test123
4. You should be redirected to dashboard
5. Check that "testuser" appears instead of "User Name"
6. Navigate to `/learn` and verify username appears there too

### Test the Backend Server

1. Start the server: `npm start` (in server directory)
2. Test registration:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "username": "testuser",
       "password": "test123"
     }'
   ```
3. Test login:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "identifier": "testuser",
       "password": "test123"
     }'
   ```

## Troubleshooting

### "Username already exists" error
- The username or email is already registered
- Try a different username or email
- Or clear localStorage: Open DevTools → Application → Local Storage → Clear

### Data not persisting
- Make sure browser allows localStorage
- Check if private/incognito mode is blocking storage
- Verify AuthProvider wraps your app in `App.jsx`

### Backend server won't start
- Check if port 5000 is available
- Install dependencies: `npm install`
- Check Node.js version: `node --version` (should be v14+)

## Next Steps

Consider implementing:
1. **Logout functionality** - Add logout button in header
2. **Profile editing** - Allow users to update their info
3. **Password reset** - Email-based password recovery
4. **Remember me** - Extended session with refresh tokens
5. **User stats updates** - Automatically track learning progress
6. **Protected routes** - Redirect to login if not authenticated

## Support

If you encounter any issues, check:
- Browser console for errors
- Server logs if using backend
- Database file permissions
- Network tab for API calls

Happy coding! 🚀
