export interface UserProfile {
  id: string;
  email: string;
  handle: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
  // Computed fields
  other_participant?: UserProfile;
  last_message?: Message;
  unread_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  message_type: 'text' | 'image';
  image_url: string | null;
  image_filename: string | null;
  image_size: number | null;
  image_mime_type: string | null;
  read_at: string | null;
  created_at: string;
  // Computed fields
  sender?: UserProfile;
  is_own_message?: boolean;
}

export interface UserConnection {
  id: string;
  user_id: string;
  connected_user_id: string;
  connection_type: 'business_customer' | 'customer_business';
  business_id: string | null;
  product_id: string | null;
  created_at: string;
  // Computed fields
  connected_user?: UserProfile;
  business?: {
    id: string;
    name: string;
    slug: string;
  };
  product?: {
    id: string;
    name: string;
  };
}

export interface ConversationWithParticipants extends Conversation {
  participant1: UserProfile;
  participant2: UserProfile;
}

export interface MessageWithSender extends Message {
  sender: UserProfile;
}

export interface NewMessage {
  conversation_id: string;
  content?: string;
  message_type: 'text' | 'image';
  image_file?: File;
}
