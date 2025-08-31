import { NextResponse } from "next/server";
import { EmailService } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

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
        console.log('Received subscription_cancelled email request:', data);
        await EmailService.sendSubscriptionCancelledEmail(data.userEmail, data.productName, data.businessName);
        console.log('Subscription cancellation email sent successfully');
        break;
      
      case 'new_subscriber': {
        // If businessEmail is not provided, derive the business owner's email from productId or businessId
        let businessEmail = data.businessEmail as string | undefined;
        let businessName = data.businessName as string | undefined;
        const subscriberEmail = data.subscriberEmail as string | undefined;
        const productName = data.productName as string | undefined;
        const subscriptionId = data.subscriptionId as string | undefined;
        const price = data.price as number | undefined;

        if (!businessEmail) {
          const supabase = await createClient();

          // Prefer businessId, otherwise compute via productId, or lookup by business name
          let ownerUserId: string | undefined;
          if (data.businessId) {
            const { data: biz } = await supabase
              .from('businesses')
              .select('id, name, user_id')
              .eq('id', data.businessId)
              .single();
            if (biz) {
              businessName = businessName || biz.name;
              ownerUserId = biz.user_id;
            }
          } else if (data.productId) {
            const { data: prod } = await supabase
              .from('products')
              .select('id, name, business_id, businesses:business_id(name, user_id)')
              .eq('id', data.productId)
              .single();
            if (prod && (prod as any).businesses) {
              const biz = (prod as any).businesses as { name?: string; user_id?: string };
              businessName = businessName || biz.name;
              ownerUserId = biz.user_id;
            }
          } else if (businessName) {
            // Lookup business by name as fallback
            const { data: biz } = await supabase
              .from('businesses')
              .select('id, name, user_id')
              .eq('name', businessName)
              .single();
            if (biz) {
              ownerUserId = biz.user_id;
            }
          }

          if (ownerUserId) {
            const { data: owner } = await supabase
              .from('user_profiles')
              .select('email')
              .eq('id', ownerUserId)
              .single();
            businessEmail = owner?.email || businessEmail;
          }
        }

        if (businessEmail) {
          await EmailService.sendNewSubscriberNotification({
            businessEmail,
            businessName: businessName || 'Business',
            subscriberEmail: subscriberEmail || 'unknown@unknown',
            productName: productName || 'Product',
            subscriptionId: subscriptionId || 'unknown',
            price,
          });
          return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Owner email not found' }, { status: 400 });
      }
      
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
