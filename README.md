This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Messaging System

This project includes a comprehensive messaging system that allows users to communicate with each other and with businesses.

### Features
- Real-time messaging between users
- Business-customer communication
- Image sharing support
- User handles for easy identification
- Connection-based messaging (only message people you have business relationships with)

### Setup

1. **Database Tables**: The system uses `conversations`, `messages`, `user_connections`, and `user_profiles` tables
2. **Storage**: Images are stored in the `message-images` bucket
3. **API Routes**: RESTful endpoints for conversations, messages, and connections

### Automatic Handle Generation

New users automatically get unique handles generated when they sign up. This is handled by database triggers:

```bash
# Run the SQL script in your Supabase SQL editor
npm run add-handle-trigger
```

The trigger will:
- Automatically create a `user_profile` record when someone signs up
- Generate a unique handle based on their email + random suffix
- Ensure handles are globally unique

### Migration Scripts

For existing users without handles:

```bash
# Generate handles for existing users
npm run generate-handles

# Create connections based on existing subscriptions
npm run populate-connections
```

### How It Works

1. Users sign up and automatically get a handle
2. Business-customer relationships create connections in `user_connections`
3. Users can only message people they have connections with
4. Messages are stored with real-time updates via Supabase subscriptions
5. Images are uploaded to storage and referenced in messages

### Security

- Row Level Security (RLS) policies protect all data
- Users can only access their own conversations and connections
- Image uploads are restricted to authenticated users
