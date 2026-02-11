# Event Reminder Email Notification Setup

This guide explains how to configure email notifications for event reminders in the Social Tech Space Platform.

## Features

✅ **Email Notifications**: Users receive beautiful HTML emails when they set event reminders
✅ **Database Storage**: All reminders are stored in SQLite database
✅ **User Authentication**: Only authenticated users can set reminders
✅ **Toggle Reminders**: Users can add or remove reminders easily
✅ **Persistent State**: Reminder status is preserved across sessions

## Email Configuration

### Option 1: Using Gmail (Recommended for Testing)

1. **Create a `.env` file** in the `server` directory:
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Get Gmail App Password**:
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification (enable if not already)
   - Scroll down to "App passwords"
   - Select "Mail" and "Windows Computer" (or Other)
   - Copy the generated 16-character password

3. **Update `.env` file**:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

### Option 2: Using Other Email Services

You can use any SMTP service. Update the transporter configuration in `server/server.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

Popular services:
- **Outlook/Hotmail**: `smtp.office365.com` (port 587)
- **Yahoo**: `smtp.mail.yahoo.com` (port 587)
- **SendGrid**: Use API key authentication
- **Mailgun**: Use API key authentication

## Running the Application

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```

The server will run on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd social-tech
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (or your configured port)

## How It Works

### User Flow

1. **Sign In**: User must be authenticated to set reminders
2. **Browse Events**: Navigate to the Events Calendar page
3. **Select Event**: Click on any event to view details
4. **Add Reminder**: Click the "Add Reminder" button
5. **Email Sent**: User receives a confirmation email immediately
6. **Manage Reminders**: Click again to remove the reminder

### Email Template

The email includes:
- Event title with icon
- Event date and time
- Location information
- Event description
- Beautiful space-themed design

### API Endpoints

#### Add Reminder
```
POST /api/reminders/add
Headers: Authorization: Bearer <token>
Body: {
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  eventDescription: string,
  eventIcon: string,
  location: string
}
```

#### Get User Reminders
```
GET /api/reminders
Headers: Authorization: Bearer <token>
```

#### Remove Reminder
```
DELETE /api/reminders/:id
Headers: Authorization: Bearer <token>
```

#### Check Reminder Status
```
POST /api/reminders/check
Headers: Authorization: Bearer <token>
Body: {
  eventTitle: string,
  eventDate: string
}
```

## Database Schema

### event_reminders Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| userId | INTEGER | Foreign key to users table |
| eventTitle | TEXT | Name of the event |
| eventDate | TEXT | Date of the event |
| eventTime | TEXT | Time of the event |
| eventDescription | TEXT | Event description |
| eventIcon | TEXT | Event emoji/icon |
| location | TEXT | User's location |
| reminderSent | BOOLEAN | Whether reminder email was sent |
| createdAt | DATETIME | Timestamp of creation |

## Troubleshooting

### Email Not Sending

1. **Check credentials**: Ensure EMAIL_USER and EMAIL_PASSWORD are correct in `.env`
2. **App password**: For Gmail, you MUST use an app password, not your regular password
3. **2FA enabled**: Gmail requires 2-factor authentication to generate app passwords
4. **Check logs**: Look at server console for error messages
5. **Test connection**: The server will log email sending status

### Common Errors

**"Invalid login"**: 
- Use app password instead of regular password
- Enable 2-factor authentication on Gmail

**"Connection timeout"**:
- Check your internet connection
- Verify SMTP server and port settings

**"User not authenticated"**:
- Make sure you're signed in
- Check if localStorage has user data

## Testing

### Test Email Functionality

1. Sign in to the application
2. Go to Events Calendar
3. Click on any event
4. Click "Add Reminder"
5. Check your email inbox (and spam folder)
6. Verify you received the confirmation email

### Test Reminder Persistence

1. Add a reminder for an event
2. Refresh the page
3. Click on the same event
4. Button should show "Reminder Set ✓"

## Security Notes

⚠️ **Important Security Considerations**:

1. **Never commit `.env` file** to version control
2. **Use environment variables** in production
3. **Rotate secrets regularly**
4. **Use strong JWT secrets**
5. **Implement rate limiting** for email sending
6. **Validate all user inputs**

## Future Enhancements

Potential improvements:
- [ ] Schedule reminder emails before event (e.g., 1 day before)
- [ ] SMS notifications via Twilio
- [ ] Push notifications for web/mobile
- [ ] Reminder frequency settings (daily, weekly)
- [ ] Batch email sending for multiple reminders
- [ ] Email templates customization
- [ ] Unsubscribe functionality

## Support

For issues or questions:
1. Check server logs for errors
2. Verify all environment variables are set
3. Test with a simple email first
4. Check email service status

---

**Happy Stargazing! 🌌✨**
