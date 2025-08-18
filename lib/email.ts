import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface CronJobReport {
  totalProcessed: number;
  succeededCount: number;
  failedCount: number;
  totalAmount: number;
  totalFees: number;
  skippedCount: number;
  skipReasons: string[];
  errors: string[];
}

export interface PaymentNotification {
  userEmail: string;
  businessName: string;
  productName: string;
  amount: number;
  status: 'success' | 'failed';
  failureReason?: string;
  paymentDate: string;
}

export interface SubscriptionNotification {
  userEmail: string;
  businessName: string;
  productName: string;
  amount: number;
  paymentDay: number;
  subscriptionId: string;
}

export interface BusinessNotification {
  businessEmail: string;
  businessName: string;
  subscriberEmail: string;
  productName: string;
  subscriptionId: string;
}

export interface PaymentFailureNotification {
  businessEmail: string;
  businessName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  failureReason: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = 'noreply@monthlyclubhq.com';
  private static readonly OWNER_EMAIL = process.env.OWNER_EMAIL || 'gareth@monthlyclubhq.com';

  static async sendEmail(data: EmailData) {
    try {
      const result = await resend.emails.send({
        from: data.from || this.FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.html,
      });
      
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  // Owner notifications
  static async sendNewUserSignupNotification(userEmail: string, userId: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">🎉 New User Signup</h2>
        <p>A new user has signed up for MonthlyClub!</p>
        <ul>
          <li><strong>Email:</strong> ${userEmail}</li>
          <li><strong>User ID:</strong> ${userId}</li>
          <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      </div>
    `;

    return this.sendEmail({
      to: this.OWNER_EMAIL,
      subject: 'New MonthlyClub User Signup',
      html,
    });
  }

  static async sendBusinessActivatedNotification(businessName: string, businessId: string, ownerEmail: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">✅ Business Activated</h2>
        <p>A new business has been activated on MonthlyClub!</p>
        <ul>
          <li><strong>Business Name:</strong> ${businessName}</li>
          <li><strong>Business ID:</strong> ${businessId}</li>
          <li><strong>Owner Email:</strong> ${ownerEmail}</li>
          <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      </div>
    `;

    return this.sendEmail({
      to: this.OWNER_EMAIL,
      subject: 'New Business Activated on MonthlyClub',
      html,
    });
  }

  static async sendCronJobReport(report: CronJobReport) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">📊 Daily Billing Report</h2>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>Summary</h3>
        <ul>
          <li><strong>Total Processed:</strong> ${report.totalProcessed}</li>
          <li><strong>Successful Payments:</strong> ${report.succeededCount}</li>
          <li><strong>Failed Payments:</strong> ${report.failedCount}</li>
          <li><strong>Skipped Payments:</strong> ${report.skippedCount}</li>
          <li><strong>Total Amount:</strong> £${(report.totalAmount / 100).toFixed(2)}</li>
          <li><strong>Total Fees:</strong> £${(report.totalFees / 100).toFixed(2)}</li>
        </ul>

        ${report.skipReasons.length > 0 ? `
          <h3>Skipped Reasons</h3>
          <ul>
            ${report.skipReasons.map(reason => `<li>${reason}</li>`).join('')}
          </ul>
        ` : ''}

        ${report.errors.length > 0 ? `
          <h3>Errors</h3>
          <ul>
            ${report.errors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `;

    return this.sendEmail({
      to: this.OWNER_EMAIL,
      subject: `Daily Billing Report - ${new Date().toLocaleDateString()}`,
      html,
    });
  }

  // User notifications
  static async sendWelcomeEmail(userEmail: string, userName?: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Welcome to MonthlyClub! 🎉</h2>
        <p>Hi ${userName || 'there'},</p>
        <p>Welcome to MonthlyClub! We're excited to have you on board.</p>
        <p>With MonthlyClub, you can:</p>
        <ul>
          <li>Discover amazing subscription services</li>
          <li>Manage all your subscriptions in one place</li>
          <li>Never miss a payment with our smart billing system</li>
        </ul>
        <p>Ready to get started? <a href="https://monthlyclubhq.com" style="color: #6366f1;">Browse our services</a></p>
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: userEmail,
      subject: 'Welcome to MonthlyClub!',
      html,
    });
  }

  static async sendSubscriptionConfirmation(data: SubscriptionNotification) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Subscription Confirmed! ✅</h2>
        <p>Hi there,</p>
        <p>Your subscription has been successfully set up!</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Subscription Details</h3>
          <ul>
            <li><strong>Service:</strong> ${data.productName}</li>
            <li><strong>Business:</strong> ${data.businessName}</li>
            <li><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</li>
            <li><strong>Payment Day:</strong> ${data.paymentDay}${this.getOrdinalSuffix(data.paymentDay)} of each month</li>
            <li><strong>Next Payment:</strong> ${this.getNextPaymentDate(data.paymentDay)}</li>
          </ul>
        </div>

        <p>Your first payment will be taken on ${this.getNextPaymentDate(data.paymentDay)}.</p>
        <p>You can manage your subscription anytime from your <a href="https://monthlyclubhq.com/dashboard/subscriptions" style="color: #6366f1;">dashboard</a>.</p>
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: data.userEmail,
      subject: `Subscription Confirmed - ${data.productName}`,
      html,
    });
  }

  static async sendPaymentNotification(data: PaymentNotification) {
    const statusColor = data.status === 'success' ? '#10b981' : '#ef4444';
    const statusIcon = data.status === 'success' ? '✅' : '❌';
    const statusText = data.status === 'success' ? 'Successful' : 'Failed';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${statusColor};">Payment ${statusText} ${statusIcon}</h2>
        <p>Hi there,</p>
        <p>Your payment has been processed.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Payment Details</h3>
          <ul>
            <li><strong>Service:</strong> ${data.productName}</li>
            <li><strong>Business:</strong> ${data.businessName}</li>
            <li><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</li>
            <li><strong>Date:</strong> ${data.paymentDate}</li>
            <li><strong>Status:</strong> ${statusText}</li>
            ${data.failureReason ? `<li><strong>Reason:</strong> ${data.failureReason}</li>` : ''}
          </ul>
        </div>

        ${data.status === 'failed' ? `
          <p style="color: #ef4444; font-weight: bold;">
            Your payment failed. Please update your payment method in your 
            <a href="https://monthlyclubhq.com/dashboard/subscriptions" style="color: #6366f1;">dashboard</a>.
          </p>
        ` : `
          <p>Thank you for your payment!</p>
        `}
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: data.userEmail,
      subject: `Payment ${statusText} - ${data.productName}`,
      html,
    });
  }

  static async sendSubscriptionCancelledEmail(userEmail: string, productName: string, businessName: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6b7280;">Subscription Cancelled</h2>
        <p>Hi there,</p>
        <p>Your subscription has been cancelled as requested.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Cancelled Subscription</h3>
          <ul>
            <li><strong>Service:</strong> ${productName}</li>
            <li><strong>Business:</strong> ${businessName}</li>
            <li><strong>Cancelled Date:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
        </div>

        <p>You won't be charged any further payments for this service.</p>
        <p>If you change your mind, you can always resubscribe from the business page.</p>
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: userEmail,
      subject: `Subscription Cancelled - ${productName}`,
      html,
    });
  }

  // Business notifications
  static async sendNewSubscriberNotification(data: BusinessNotification) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">🎉 New Subscriber!</h2>
        <p>Hi there,</p>
        <p>Congratulations! You have a new subscriber to your service.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>New Subscription Details</h3>
          <ul>
            <li><strong>Service:</strong> ${data.productName}</li>
            <li><strong>Customer Email:</strong> ${data.subscriberEmail}</li>
            <li><strong>Subscription ID:</strong> ${data.subscriptionId}</li>
            <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
        </div>

        <p>You can view all your subscribers in your <a href="https://monthlyclubhq.com/dashboard/business" style="color: #6366f1;">business dashboard</a>.</p>
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: data.businessEmail,
      subject: `New Subscriber - ${data.productName}`,
      html,
    });
  }

  static async sendPaymentFailureNotification(data: PaymentFailureNotification) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">⚠️ Payment Failed</h2>
        <p>Hi there,</p>
        <p>A customer's payment has failed for your service.</p>
        
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
          <h3>Failed Payment Details</h3>
          <ul>
            <li><strong>Service:</strong> ${data.productName}</li>
            <li><strong>Customer Email:</strong> ${data.customerEmail}</li>
            <li><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</li>
            <li><strong>Failure Reason:</strong> ${data.failureReason}</li>
            <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
        </div>

        <p>We'll automatically retry the payment next month. You don't need to take any action.</p>
        <p>You can view all payment details in your <a href="https://monthlyclubhq.com/dashboard/business" style="color: #6366f1;">business dashboard</a>.</p>
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: data.businessEmail,
      subject: `Payment Failed - ${data.productName}`,
      html,
    });
  }

  // Message notifications
  static async sendMessageNotification(
    recipientEmail: string,
    senderName: string,
    messageContent: string,
    messageType: 'text' | 'image',
    conversationId: string,
    businessContext?: { name: string; slug: string }
  ) {
    const isImageMessage = messageType === 'image';
    const messageSnippet = isImageMessage 
      ? (messageContent ? `📷 Image with caption: "${messageContent}"` : '📷 Image')
      : messageContent.length > 100 
        ? `${messageContent.substring(0, 100)}...` 
        : messageContent;

    const businessInfo = businessContext 
      ? `<p style="color: #6b7280; font-size: 14px; margin: 10px 0;">
           <strong>Business:</strong> ${businessContext.name}
         </p>`
      : '';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">💬 New Message from ${senderName}</h2>
        <p>Hi there,</p>
        <p>You have received a new message on MonthlyClub.</p>
        
        ${businessInfo}
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
          <h3>Message Preview</h3>
          <p style="font-style: italic; color: #6b7280; margin: 0;">
            "${messageSnippet}"
          </p>
        </div>

        <p style="text-align: center; margin: 30px 0;">
          <a href="https://monthlyclubhq.com/messages" 
             style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
            View Message
          </a>
        </p>

        <p style="font-size: 14px; color: #6b7280;">
          You can visit your 
          <a href="https://monthlyclubhq.com/messages" style="color: #6366f1;">messages page</a> 
          to continue the conversation.
        </p>
        
        <p>Best regards,<br>The MonthlyClub Team</p>
      </div>
    `;

    return this.sendEmail({
      to: recipientEmail,
      subject: `New message from ${senderName} - MonthlyClub`,
      html,
    });
  }

  // Helper methods
  private static getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  private static getNextPaymentDate(day: number): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getDate() <= day ? today.getMonth() : today.getMonth() + 1;
    const nextDate = new Date(year, month, day);
    
    return nextDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
