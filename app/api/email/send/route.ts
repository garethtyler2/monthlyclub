import { NextResponse } from "next/server";
import { EmailService } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    switch (type) {
      case 'new_user_signup':
        await EmailService.sendNewUserSignupNotification(data.userEmail, data.userId);
        break;
      
      case 'business_activated':
        await EmailService.sendBusinessActivatedNotification(data.businessName, data.businessId, data.ownerEmail);
        break;
      
      case 'cron_report':
        await EmailService.sendCronJobReport(data.report);
        break;
      
      case 'welcome_email':
        await EmailService.sendWelcomeEmail(data.userEmail, data.userName);
        break;
      
      case 'subscription_confirmation':
        await EmailService.sendSubscriptionConfirmation(data);
        break;
      
      case 'payment_notification':
        await EmailService.sendPaymentNotification(data);
        break;
      
      case 'subscription_cancelled':
        await EmailService.sendSubscriptionCancelledEmail(data.userEmail, data.productName, data.businessName);
        break;
      
      case 'new_subscriber':
        await EmailService.sendNewSubscriberNotification(data);
        break;
      
      case 'payment_failure':
        await EmailService.sendPaymentFailureNotification(data);
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
