import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { type, data } = body

    // Validate required fields
    if (!type) {
      return NextResponse.json({ error: 'Email type is required' }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Email data is required' }, { status: 400 })
    }

    let emailResult

    switch (type) {
      case 'welcome_email':
        if (!data.userEmail || !data.userName) {
          return NextResponse.json({ 
            error: 'Welcome email requires userEmail and userName' 
          }, { status: 400 })
        }

        emailResult = await resend.emails.send({
          from: 'noreply@monthlyclubhq.com',
          to: data.userEmail,
          subject: 'Welcome to Monthly Club! 🎉',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #7c3aed;">Welcome to Monthly Club!</h1>
              <p>Hi ${data.userName},</p>
              <p>Thank you for joining Monthly Club! We're excited to help you transform your business with smart subscriptions.</p>
              <p>Here's what you can do next:</p>
              <ul>
                <li>Create your first business</li>
                <li>Set up subscription products</li>
                <li>Start building recurring revenue</li>
              </ul>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p>Best regards,<br>The Monthly Club Team</p>
            </div>
          `,
        })
        break

      case 'new_user_signup':
        if (!data.userEmail || !data.userId) {
          return NextResponse.json({ 
            error: 'New user notification requires userEmail and userId' 
          }, { status: 400 })
        }

        emailResult = await resend.emails.send({
          from: 'noreply@monthlyclubhq.com',
          to: 'owner@monthlyclubhq.com', // Send to owner
          subject: 'New User Signup 🆕',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #7c3aed;">New User Signup</h1>
              <p>A new user has signed up for Monthly Club!</p>
              <p><strong>User ID:</strong> ${data.userId}</p>
              <p><strong>Email:</strong> ${data.userEmail}</p>
              <p><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
              <p>This is an automated notification from the Monthly Club system.</p>
            </div>
          `,
        })
        break

      default:
        return NextResponse.json({ 
          error: `Invalid email type: ${type}. Supported types: welcome_email, new_user_signup` 
        }, { status: 400 })
    }

    if (emailResult.error) {
      console.error('Resend API error:', emailResult.error)
      return NextResponse.json({ 
        error: 'Failed to send email' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      messageId: emailResult.data?.id 
    })

  } catch (error) {
    console.error('Email API error:', error)
    
    if (error instanceof SyntaxError) {
      return NextResponse.json({ 
        error: 'Invalid JSON in request body' 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
