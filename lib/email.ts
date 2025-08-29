import { Resend } from 'resend';
import { createStyledEmail } from './email-styles';

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
    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge">🎉 Welcome to Monthly Club</div>
          <h1>Welcome to Monthly Club!</h1>
          <h2>Hi ${userName || 'there'},</h2>
        </div>
        
        <p>We're excited to have you on board! Monthly Club makes it easy to discover and manage amazing subscription services.</p>
        
        <div class="email-card">
          <h3>🚀 What you can do with Monthly Club:</h3>
          <ul style="color: #cbd5e1; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Discover amazing subscription services</li>
            <li style="margin-bottom: 8px;">Manage all your subscriptions in one place</li>
            <li style="margin-bottom: 8px;">Never miss a payment with our smart billing system</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com" class="email-button">Browse Our Services</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, 'Welcome to Monthly Club');

    return this.sendEmail({
      to: userEmail,
      subject: 'Welcome to Monthly Club!',
      html,
    });
  }

  static async sendSubscriptionConfirmation(data: SubscriptionNotification) {
    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge">✅ Subscription Confirmed</div>
          <h1>Subscription Confirmed!</h1>
          <h2>Hi there,</h2>
        </div>
        
        <p>Your subscription has been successfully set up! You're now part of something special.</p>
        
        <div class="email-card">
          <h3>📋 Subscription Details</h3>
          <div style="color: #e2e8f0;">
            <p style="margin-bottom: 12px;"><strong>Service:</strong> ${data.productName}</p>
            <p style="margin-bottom: 12px;"><strong>Business:</strong> ${data.businessName}</p>
            <p style="margin-bottom: 12px;"><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</p>
            <p style="margin-bottom: 12px;"><strong>Payment Day:</strong> ${data.paymentDay}${this.getOrdinalSuffix(data.paymentDay)} of each month</p>
            <p style="margin-bottom: 0;"><strong>Next Payment:</strong> ${this.getNextPaymentDate(data.paymentDay)}</p>
          </div>
        </div>

        <p>Your first payment will be taken on ${this.getNextPaymentDate(data.paymentDay)}.</p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/dashboard/subscriptions" class="email-button">Manage Subscription</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `Subscription Confirmed - ${data.productName}`);

    return this.sendEmail({
      to: data.userEmail,
      subject: `Subscription Confirmed - ${data.productName}`,
      html,
    });
  }

  static async sendPaymentNotification(data: PaymentNotification) {
    const statusIcon = data.status === 'success' ? '✅' : '❌';
    const statusText = data.status === 'success' ? 'Successful' : 'Failed';
    const badgeColor = data.status === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';

    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge" style="border-color: ${badgeColor};">${statusIcon} Payment ${statusText}</div>
          <h1>Payment ${statusText}!</h1>
          <h2>Hi there,</h2>
        </div>
        
        <p>Your payment has been processed. ${data.status === 'success' ? 'Thank you for your payment!' : 'We encountered an issue with your payment.'}</p>
        
        <div class="email-card">
          <h3>💳 Payment Details</h3>
          <div style="color: #e2e8f0;">
            <p style="margin-bottom: 12px;"><strong>Service:</strong> ${data.productName}</p>
            <p style="margin-bottom: 12px;"><strong>Business:</strong> ${data.businessName}</p>
            <p style="margin-bottom: 12px;"><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</p>
            <p style="margin-bottom: 12px;"><strong>Date:</strong> ${data.paymentDate}</p>
            <p style="margin-bottom: 12px;"><strong>Status:</strong> ${statusText}</p>
            ${data.failureReason ? `<p style="margin-bottom: 0;"><strong>Reason:</strong> ${data.failureReason}</p>` : ''}
          </div>
        </div>

        ${data.status === 'failed' ? `
          <div class="email-card" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.1);">
            <h3 style="color: #ef4444;">⚠️ Action Required</h3>
            <p style="color: #e2e8f0;">Your payment failed. Please update your payment method in your dashboard to continue your subscription.</p>
          </div>
        ` : ''}
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/dashboard/subscriptions" class="email-button">${data.status === 'success' ? 'View Dashboard' : 'Update Payment Method'}</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `Payment ${statusText} - ${data.productName}`);

    return this.sendEmail({
      to: data.userEmail,
      subject: `Payment ${statusText} - ${data.productName}`,
      html,
    });
  }

  static async sendSubscriptionCancelledEmail(userEmail: string, productName: string, businessName: string) {
    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge" style="border-color: rgba(107, 114, 128, 0.3);">📋 Subscription Cancelled</div>
          <h1>Subscription Cancelled</h1>
          <h2>Hi there,</h2>
        </div>
        
        <p>Your subscription has been cancelled as requested. We're sorry to see you go!</p>
        
        <div class="email-card">
          <h3>📋 Cancelled Subscription Details</h3>
          <div style="color: #e2e8f0;">
            <p style="margin-bottom: 12px;"><strong>Service:</strong> ${productName}</p>
            <p style="margin-bottom: 12px;"><strong>Business:</strong> ${businessName}</p>
            <p style="margin-bottom: 0;"><strong>Cancelled Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="email-card" style="border-color: rgba(107, 114, 128, 0.3); background: rgba(107, 114, 128, 0.1);">
          <h3>ℹ️ What happens next?</h3>
          <ul style="color: #cbd5e1; padding-left: 20px;">
            <li style="margin-bottom: 8px;">You won't be charged any further payments for this service</li>
            <li style="margin-bottom: 8px;">Your access will continue until the end of your current billing period</li>
            <li style="margin-bottom: 0;">You can always resubscribe from the business page if you change your mind</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/dashboard/subscriptions" class="email-button-secondary">View Dashboard</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `Subscription Cancelled - ${productName}`);

    return this.sendEmail({
      to: userEmail,
      subject: `Subscription Cancelled - ${productName}`,
      html,
    });
  }

  // Business notifications
  static async sendNewSubscriberNotification(data: BusinessNotification) {
    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge" style="border-color: rgba(34, 197, 94, 0.3);">🎉 New Subscriber!</div>
          <h1>Congratulations!</h1>
          <h2>You have a new subscriber!</h2>
        </div>
        
        <p>Great news! Someone just subscribed to your service. This is the start of a recurring revenue stream for your business.</p>
        
        <div class="email-card">
          <h3>📋 New Subscription Details</h3>
          <div style="color: #e2e8f0;">
            <p style="margin-bottom: 12px;"><strong>Service:</strong> ${data.productName}</p>
            <p style="margin-bottom: 12px;"><strong>Customer Email:</strong> ${data.subscriberEmail}</p>
            <p style="margin-bottom: 12px;"><strong>Subscription ID:</strong> ${data.subscriptionId}</p>
            <p style="margin-bottom: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="email-card" style="border-color: rgba(34, 197, 94, 0.3); background: rgba(34, 197, 94, 0.1);">
          <h3 style="color: #22c55e;">💡 What's next?</h3>
          <ul style="color: #cbd5e1; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Your customer will receive their first payment confirmation</li>
            <li style="margin-bottom: 8px;">You can start posting updates to your subscriber feed</li>
            <li style="margin-bottom: 0;">Track your growing subscriber base in your dashboard</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/dashboard/business" class="email-button">View Business Dashboard</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `New Subscriber - ${data.productName}`);

    return this.sendEmail({
      to: data.businessEmail,
      subject: `New Subscriber - ${data.productName}`,
      html,
    });
  }

  static async sendPaymentFailureNotification(data: PaymentFailureNotification) {
    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge" style="border-color: rgba(239, 68, 68, 0.3);">⚠️ Payment Failed</div>
          <h1>Payment Failed</h1>
          <h2>Hi there,</h2>
        </div>
        
        <p>A customer's payment has failed for your service. Don't worry - we'll automatically retry the payment next month.</p>
        
        <div class="email-card" style="border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.1);">
          <h3 style="color: #ef4444;">💳 Failed Payment Details</h3>
          <div style="color: #e2e8f0;">
            <p style="margin-bottom: 12px;"><strong>Service:</strong> ${data.productName}</p>
            <p style="margin-bottom: 12px;"><strong>Customer Email:</strong> ${data.customerEmail}</p>
            <p style="margin-bottom: 12px;"><strong>Amount:</strong> £${(data.amount / 100).toFixed(2)}</p>
            <p style="margin-bottom: 12px;"><strong>Failure Reason:</strong> ${data.failureReason}</p>
            <p style="margin-bottom: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="email-card">
          <h3>ℹ️ What happens next?</h3>
          <ul style="color: #cbd5e1; padding-left: 20px;">
            <li style="margin-bottom: 8px;">We'll automatically retry the payment next month</li>
            <li style="margin-bottom: 8px;">Your customer will be notified to update their payment method</li>
            <li style="margin-bottom: 0;">You don't need to take any action - we handle this automatically</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/dashboard/business" class="email-button-secondary">View Business Dashboard</a>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `Payment Failed - ${data.productName}`);

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
      ? `<div class="email-card" style="border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.1);">
           <h3 style="color: #3b82f6;">🏢 Business Context</h3>
           <p style="color: #e2e8f0; margin: 0;"><strong>Business:</strong> ${businessContext.name}</p>
         </div>`
      : '';

    const html = createStyledEmail(`
      <div class="email-header">
        <div style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">Monthly Club</div>
        <div style="font-size: 14px; color: #94a3b8; font-weight: 500;">The Future of Service Subscriptions</div>
      </div>
      
      <div class="email-main">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="email-badge" style="border-color: rgba(59, 130, 246, 0.3);">💬 New Message</div>
          <h1>New Message from ${senderName}</h1>
          <h2>Hi there,</h2>
        </div>
        
        <p>You have received a new message on Monthly Club. Don't miss out on important updates from your service providers!</p>
        
        ${businessInfo}
        
        <div class="email-card" style="border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.1);">
          <h3 style="color: #3b82f6;">💬 Message Preview</h3>
          <p style="font-style: italic; color: #cbd5e1; margin: 0; padding: 16px; background: rgba(15, 23, 42, 0.5); border-radius: 8px;">
            "${messageSnippet}"
          </p>
        </div>

        <div style="text-align: center; margin: 32px 0;">
          <a href="https://monthlyclubhq.com/messages" class="email-button">View Message</a>
        </div>

        <div class="email-card">
          <h3>💡 Stay Connected</h3>
          <p style="color: #cbd5e1; margin: 0;">You can visit your <a href="https://monthlyclubhq.com/messages" style="color: #22d3ee;">messages page</a> to continue the conversation and stay updated with your service providers.</p>
        </div>
        
        <p style="text-align: center; color: #cbd5e1;">Best regards,<br><strong>The Monthly Club Team</strong></p>
      </div>
      
      <div class="email-footer">
        <p style="color: #94a3b8; font-size: 14px; margin: 4px 0; font-weight: 600;">Monthly Club</p>
        <p style="color: #64748b; font-size: 12px; margin: 16px 0 0 0;">© ${new Date().getFullYear()} Monthly Club. All rights reserved.</p>
      </div>
    `, `New message from ${senderName} - Monthly Club`);

    return this.sendEmail({
      to: recipientEmail,
      subject: `New message from ${senderName} - Monthly Club`,
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
