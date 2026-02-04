// Test script to verify email configuration
// Run this with: node test-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

const testEmail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself for testing
    subject: '🌌 Test Email - Social Tech Space Platform',
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%); color: #fff; padding: 30px; border-radius: 10px;">
      <h1 style="color: #00d4ff; text-align: center;">✅ Email Configuration Successful!</h1>
      
      <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="font-size: 16px; line-height: 1.6;">
          Congratulations! Your email notification system is properly configured.
        </p>
        
        <p style="font-size: 14px; color: #a0a0a0;">
          You can now receive event reminder notifications from the Social Tech Space Platform.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #00d4ff; font-size: 18px;">🚀 Ready to explore the cosmos!</p>
      </div>
    </div>
  `
};

console.log('🔄 Testing email configuration...');
console.log('📧 Sending test email to:', process.env.EMAIL_USER);

transporter.sendMail(testEmail, (error, info) => {
    if (error) {
        console.error('❌ Error sending email:', error.message);
        console.error('\n📝 Troubleshooting tips:');
        console.error('1. Make sure EMAIL_USER and EMAIL_PASSWORD are set in .env file');
        console.error('2. For Gmail, use an App Password (not your regular password)');
        console.error('3. Enable 2-factor authentication on your Gmail account');
        console.error('4. Generate an App Password from: https://myaccount.google.com/apppasswords');
        process.exit(1);
    } else {
        console.log('✅ Test email sent successfully!');
        console.log('📬 Message ID:', info.messageId);
        console.log('📧 Check your inbox at:', process.env.EMAIL_USER);
        console.log('\n🎉 Email configuration is working correctly!');
        process.exit(0);
    }
});
