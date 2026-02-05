---
description: How to send email notifications for event reminders
---

This workflow explains how the SpaceScope application sends email notifications when a user sets a reminder for a celestial event or mission.

### 🔌 1. Backend Configuration (Nodemailer)
The application uses **Nodemailer** with **Gmail** to send emails. The configuration is located in `server/server.js`.

**Requirements:**
- `EMAIL_USER`: Your Gmail address.
- `EMAIL_PASSWORD`: A Gmail **App Password** (not your regular account password).

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### 🛰️ 2. Setting up Reminders (API Endpoint)
When a user clicks "Add Reminder" on the frontend, a POST request is sent to `/reminders/add`.

**Flow:**
1. User authenticates via JWT.
2. Reminder is saved to the PostgreSQL database.
3. If the save is successful, the `transporter.sendMail()` function is called.

```javascript
app.post("/reminders/add", authenticateToken, async (req, res) => {
  // ... (database logic) ...

  const mailOptions = {
    from: '"SpaceScope" <' + process.env.EMAIL_USER + '>',
    to: userEmail,
    subject: `SpaceScope Reminder: ${eventTitle}`,
    html: `...` // Styled HTML template
  };

  transporter.sendMail(mailOptions);
});
```

### 💻 3. Frontend Implementation
The frontend calls this backend service through `src/services/reminderService.js`.

1. **Service Call:**
   ```javascript
   export const addEventReminder = async (eventData) => {
       const response = await fetch(`${API_URL}/reminders/add`, {
           method: 'POST',
           headers: { 'Authorization': getAuthToken() },
           body: JSON.stringify(eventData)
       });
       return response.json();
   }
   ```

2. **UI Integration:**
   Components like `SelectedDayDetails.jsx` or `UpcomingMissionsList.jsx` use this service to trigger notifications.

### 🧪 4. Troubleshooting
If emails are not being sent:
1. Check if `.env` in the `server/` folder contains the correct `EMAIL_USER` and `EMAIL_PASSWORD`.
2. Ensure you are using a **Gmail App Password** if you have 2FA enabled.
3. Check the server logs (using `npm run dev`) for any `Nodemailer` errors.
4. Verify that the backend API URL is correctly set in the frontend `.env`.
