# Messaging System Setup Guide

This guide explains how to set up the new messaging system for Monthly Club.

## What's Been Added

### Database Tables
- `conversations` - Stores chat conversations between users
- `messages` - Stores individual messages (text and images)
- `user_connections` - Tracks business relationships for messaging permissions
- Updated `user_profiles` - Added handle, display_name, and avatar_url fields

### Storage
- New Supabase storage bucket: `message-images` (for message images)

### API Routes
- `/api/messaging/conversations` - Manage conversations
- `/api/messaging/messages` - Send/receive messages
- `/api/messaging/connections` - Get user connections

### UI Components
- `/messages` page - Complete messaging interface
- Navigation links added to navbar

## Setup Steps

### 1. Run Migration Scripts

First, generate handles for existing users:

```bash
npm run generate-handles
```

This will:
- Find all users without handles
- Generate unique handles based on email prefix + random suffix
- Update the `user_profiles` table

### 2. Populate User Connections

Next, create connections based on existing subscriptions:

```bash
npm run populate-connections
```

This will:
- Find all subscriptions (active and cancelled)
- Create `user_connections` records linking business owners and customers
- Enable messaging between connected users

### 3. Test the System

1. Navigate to `/messages` in your app
2. You should see your connections (businesses you subscribe to, or customers if you're a business owner)
3. Start a conversation and send messages

## How It Works

### Connection Logic
- **Business Owners** can message any customer who has/had a subscription to their products
- **Customers** can message any business they have/had a subscription with
- Connections are automatically created when subscriptions are made

### Handle System
- Handles are auto-generated as `email_prefix_randomstring` (e.g., `john_abc123`)
- Handles are globally unique
- Users can see each other's handles in conversations

### Messaging Features
- Real-time messaging with Supabase subscriptions
- Text messages
- Image messages (5MB limit, auto-compression)
- Read receipts
- Unread message counts
- Search connections by name/handle/business

## File Structure

```
scripts/
├── generate-handles.ts          # Generate handles for existing users
└── populate-connections.ts      # Create user connections from subscriptions

app/
├── api/messaging/
│   ├── conversations/route.ts   # Conversation management
│   ├── messages/route.ts        # Message handling
│   └── connections/route.ts     # User connections
└── messages/page.tsx            # Main messaging interface

types/
└── messaging.ts                 # TypeScript types

lib/
└── utils.ts                     # Handle generation utilities
```

## Troubleshooting

### Common Issues

1. **"Users are not connected" error**
   - Run `npm run populate-connections` to create connections
   - Check that subscriptions exist in the database

2. **Handles not showing**
   - Run `npm run generate-handles` to create handles for existing users
   - Check that `user_profiles` table has handle column

3. **Real-time not working**
   - Verify Supabase RLS policies are set correctly
   - Check browser console for subscription errors

### Database Queries

Check connections:
```sql
SELECT * FROM user_connections WHERE user_id = 'your_user_id';
```

Check conversations:
```sql
SELECT * FROM conversations WHERE participant1_id = 'your_user_id' OR participant2_id = 'your_user_id';
```

## Security

- Users can only message people they have business connections with
- RLS policies ensure users can only see their own conversations
- Image uploads are restricted to conversation participants
- All API routes require authentication

## Next Steps

The messaging system is now fully functional! Users can:
- See their business connections
- Start conversations
- Send text and image messages
- Receive real-time updates

Consider adding:
- Push notifications for new messages
- Message search functionality
- File attachments beyond images
- Group conversations for multiple business owners
