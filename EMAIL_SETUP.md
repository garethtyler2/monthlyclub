# Email System Setup Guide

## Overview
MonthlyClub now has a comprehensive email notification system using Resend as the email service provider. The system sends emails for various events including user signups, business activations, subscription confirmations, payment notifications, and more.

## Email Service Provider: Resend
We're using [Resend](https://resend.com) for email delivery. It's modern, developer-friendly, and has excellent deliverability.

## Setup Instructions

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain (monthlyclubhq.com)
4. Get your API key from the dashboard

### 2. Environment Variables
Add these environment variables to your `.env.local` file:

```bash
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=gareth@monthlyclubhq.com

# Site URL (used for email links)
NEXT_PUBLIC_SITE_URL=https://monthlyclubhq.com
```

### 3. Domain Verification
In your Resend dashboard:
1. Add your domain: `monthlyclubhq.com`
2. Add the required DNS records (TXT and MX records)
3. Wait for verification (usually takes a few minutes)

## Email Types Implemented

### Owner Notifications (to you)
- **New User Signup**: Sent when someone creates an account
- **Business Activated**: Sent when a business completes Stripe setup and becomes active
- **Daily Billing Report**: Sent after each cron job run with payment statistics

### User Notifications
- **Welcome Email**: Sent to new users after signup
- **Subscription Confirmation**: Sent when user subscribes to a product
- **Payment Notification**: Sent for successful/failed payments
- **Subscription Cancelled**: Sent when user cancels a subscription

### Business Notifications
- **New Subscriber**: Sent to business owners when they get a new customer
- **Payment Failure**: Sent when a customer's payment fails

## Email Templates
All email templates are defined in `lib/email.ts` and include:
- Professional HTML formatting
- Brand colors and styling
- Clear call-to-action buttons
- Responsive design

## Testing
To test the email system:
1. Set up your environment variables
2. Create a test user account
3. Complete the business setup process
4. Create a subscription
5. Check your email inbox

## Monitoring
- Email sending logs are available in your Resend dashboard
- Failed emails are logged to the console
- You can track delivery rates and bounces in Resend

## Additional Email Ideas
Consider adding these emails in the future:
- **Payment Reminders**: 3 days before payment is due
- **Subscription Renewal**: When a subscription is about to renew
- **Credit Balance Updates**: When credit balance changes significantly
- **Business Performance Reports**: Monthly summaries for business owners
- **Abandoned Cart**: When users start but don't complete subscription
- **Referral Program**: When users refer friends
- **Seasonal Promotions**: Holiday or special event emails
- **Feature Updates**: When new features are released
- **Account Security**: Login notifications, password changes
- **Support Tickets**: When support requests are created/updated

## Troubleshooting
- Check that your RESEND_API_KEY is correct
- Verify your domain is properly configured in Resend
- Check the console for email sending errors
- Ensure NEXT_PUBLIC_SITE_URL is set correctly for email links
