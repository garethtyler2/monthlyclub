'use client';

import { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Conversation, Message, UserConnection } from '@/types/messaging';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Image as ImageIcon, Plus, X, MessageCircle } from 'lucide-react';
import { Check, CheckCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

function MessagesPageContent() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connections, setConnections] = useState<UserConnection[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [textFieldHeight, setTextFieldHeight] = useState(40); // Default height for text field
  const [handleSearch, setHandleSearch] = useState('');
  const [handleSearchResults, setHandleSearchResults] = useState<any[]>([]);
  const [isSearchingHandle, setIsSearchingHandle] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch('/api/messaging/conversations');
      const data = await response.json();
      if (response.ok) {
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await fetch('/api/messaging/connections');
      const data = await response.json();
      if (response.ok) {
        setConnections(data.connections);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchMessages = useCallback(async (conversationId: string) => {
    console.log('fetchMessages called with conversationId:', conversationId);
    try {
      const response = await fetch(`/api/messaging/messages?conversation_id=${conversationId}`);
      const data = await response.json();
      if (response.ok) {
        console.log('Fetched messages:', data.messages);
        setMessages(data.messages);
        // Refresh conversations to update unread counts
        console.log('Refreshing conversations after fetching messages');
        fetchConversations();
        // Notify navbar to refresh unread count
        window.dispatchEvent(new CustomEvent('messagesRead'));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [fetchConversations]);

  const startNewConversation = useCallback(async (connection: UserConnection) => {
    try {
      const response = await fetch('/api/messaging/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participant1_id: currentUser?.id,
          participant2_id: connection.connected_user_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Fetch the conversation with full participant details
        const convResponse = await fetch(`/api/messaging/conversations/${data.conversation.id}`);
        if (convResponse.ok) {
          const convData = await convResponse.json();
          setSelectedConversation(convData.conversation);
        } else {
          setSelectedConversation(data.conversation);
        }
        
        setShowNewChat(false);
        await fetchConversations();
        
        // Notify navbar to refresh unread count
        window.dispatchEvent(new CustomEvent('messagesRead'));
        
        // Clear URL parameters after starting conversation
        const url = new URL(window.location.href);
        url.searchParams.delete('business');
        url.searchParams.delete('customer');
        window.history.replaceState({}, '', url.toString());
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  }, [currentUser?.id, fetchConversations]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getCurrentUser();
    fetchConversations();
    fetchConnections();
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Refresh conversations when page gains focus (user returns from another tab/window)
    const handleFocus = () => {
      fetchConversations();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      setTextFieldHeight(40); // Reset text field height for new conversation
      // Set up real-time subscription
      const subscription = supabase
        .channel(`messages:${selectedConversation.id}`)
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${selectedConversation.id}` },
          (payload) => {
            console.log('New message received:', payload.new);
            setMessages(prev => [...prev, payload.new as Message]);
            // Refresh conversations to update unread counts
            fetchConversations();
          }
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'messages', filter: `conversation_id=eq.${selectedConversation.id}` },
          (payload) => {
            const updated = payload.new as Message;
            setMessages(prev => prev.map(m => m.id === updated.id ? { ...m, read_at: (updated as any).read_at } : m));
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedConversation, fetchMessages, fetchConversations]);

  // Set up global real-time subscription for new messages
  useEffect(() => {
    if (currentUser) {
      const subscription = supabase
        .channel('global_messages')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            console.log('New message received globally:', payload.new);
            // Refresh conversations to update unread counts
            fetchConversations();
          }
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'messages' },
          (payload) => {
            console.log('Message updated globally:', payload.new);
            // Update local message state if we're viewing this conversation
            if (selectedConversation) {
              const updated = payload.new as Message;
              setMessages(prev => prev.map(m => m.id === updated.id ? { ...m, read_at: (updated as any).read_at } : m));
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentUser, selectedConversation, fetchConversations]);

  useEffect(() => {
    // Handle URL parameters for starting conversations
    const businessId = searchParams.get('business');
    const customerId = searchParams.get('customer');
    
    if (businessId && currentUser && connections.length > 0) {
      // Customer wants to message business owner
      const connection = connections.find(conn => conn.business_id === businessId);
      if (connection) {
        startNewConversation(connection);
      }
    } else if (customerId && currentUser && connections.length > 0) {
      // Business owner wants to message customer
      const connection = connections.find(conn => conn.connected_user_id === customerId);
      if (connection) {
        startNewConversation(connection);
      }
    }
  }, [searchParams, currentUser, connections, startNewConversation]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be smaller than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const searchUserByHandle = async (handle: string) => {
    if (!handle.trim()) {
      setHandleSearchResults([]);
      return;
    }

    setIsSearchingHandle(true);
    try {
      const response = await fetch(`/api/messaging/search-users?handle=${encodeURIComponent(handle.trim())}`);
      if (response.ok) {
        const data = await response.json();
        setHandleSearchResults(data.users || []);
      } else {
        setHandleSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setHandleSearchResults([]);
    } finally {
      setIsSearchingHandle(false);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    
    // Auto-expand text area
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = window.innerHeight * 0.5; // 50% of screen height
    const newHeight = Math.min(scrollHeight, maxHeight);
    
    setTextFieldHeight(newHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${currentUser?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('message-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('message-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const sendMessage = async () => {
    if ((!newMessage.trim() && !selectedImage) || uploadingImage) return;

    try {
      setUploadingImage(true);
      let imageUrl = null;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) {
          alert('Failed to upload image');
          return;
        }
      }

      const response = await fetch('/api/messaging/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: selectedConversation?.id,
          content: newMessage.trim() || '',
          message_type: imageUrl ? 'image' : 'text',
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
        setSelectedImage(null);
        setImagePreview(null);
        setTextFieldHeight(40); // Reset text field height
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        await fetchConversations(); // Refresh conversations to update last message
        // Notify navbar to refresh unread count
        window.dispatchEvent(new CustomEvent('messagesRead'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setUploadingImage(false);
    }
  };

  const startConversationWithUser = async (userId: string, userHandle: string) => {
    try {
      // Directly start the conversation without requiring a prior connection
      const response = await fetch('/api/messaging/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participant1_id: currentUser?.id,
          participant2_id: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Fetch the conversation with full participant details
        const convResponse = await fetch(`/api/messaging/conversations/${data.conversation.id}`);
        if (convResponse.ok) {
          const convData = await convResponse.json();
          setSelectedConversation(convData.conversation);
        } else {
          setSelectedConversation(data.conversation);
        }
        
        setShowNewChat(false);
        setHandleSearch('');
        setHandleSearchResults([]);
        await fetchConversations();
        
        // Notify navbar to refresh unread count
        window.dispatchEvent(new CustomEvent('messagesRead'));
      } else {
        const err = await response.json().catch(() => ({}));
        console.error('Failed to create conversation:', err);
        alert(err?.error || 'Failed to create conversation');
      }
    } catch (error) {
      console.error('Error starting conversation with user:', error);
      alert('Error starting conversation');
    }
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (!conversation || !currentUser) return null;
    // Type assertion to access computed fields from API
    const conv = conversation as any;
    return conv.participant1_id === currentUser.id 
      ? conv.participant2 
      : conv.participant1;
  };

  const getOtherParticipantBusiness = (conversation: Conversation) => {
    if (!conversation || !currentUser) return null;
    // Find the connection for this conversation to get business info
    const otherParticipantId = conversation.participant1_id === currentUser.id 
      ? conversation.participant2_id 
      : conversation.participant1_id;
    
    // For debugging - log what we found
    console.log('Current user ID:', currentUser.id);
    console.log('Other participant ID:', otherParticipantId);
    console.log('All connections:', connections);
    
    // Find the connection where the OTHER participant is the business owner
    // This gives us the business they own, not the business the current user owns
    const connection = connections.find(conn => {
      console.log('Checking connection:', {
        conn_user_id: conn.user_id,
        conn_connected_user_id: conn.connected_user_id,
        conn_type: conn.connection_type,
        conn_business: conn.business,
        matches_connected_user_id: conn.connected_user_id === otherParticipantId,
        matches_type: conn.connection_type === 'customer_business',
        is_match: conn.connected_user_id === otherParticipantId && conn.connection_type === 'customer_business'
      });
      return conn.connected_user_id === otherParticipantId && conn.connection_type === 'customer_business';
    });
    
    console.log('Business connection found:', connection);
    
    return connection;
  };

  const getOtherParticipantAvatar = (conversation: Conversation) => {
    if (!conversation || !currentUser) return null;
    
    const business = getOtherParticipantBusiness(conversation);
    const otherParticipant = getOtherParticipant(conversation);
    
    // Priority: 1. Profile avatar (from SSO like Google), 2. Fallback letter
    // TODO: Add business image support when business.image_url is available in the API
    if (otherParticipant?.avatar_url) {
      return { type: 'image', src: otherParticipant.avatar_url, fallback: null };
    }
    
    // Fallback to capitalized letter
    const letter = otherParticipant?.display_name?.[0] || otherParticipant?.handle?.[0] || '?';
    return { type: 'letter', src: null, fallback: letter.toUpperCase() };
  };

  const filteredConnections = connections.filter(connection =>
    (() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;
      const name = connection.connected_user?.display_name?.toLowerCase() || '';
      const handle = connection.connected_user?.handle?.toLowerCase() || '';
      const business = connection.business?.name?.toLowerCase() || '';
      return name.includes(q) || handle.includes(q) || business.includes(q);
    })()
  );

  const filteredConversations = conversations.filter(conversation => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const anyConv: any = conversation as any;
    const otherParticipant = getOtherParticipant(conversation) || anyConv.other_participant || {};
    const name = (otherParticipant.display_name || '').toLowerCase();
    const handle = (otherParticipant.handle || '').toLowerCase();
    const email = (otherParticipant.email || '').toLowerCase();
    const lastMessage = (anyConv.last_message?.content || '').toLowerCase();
    return name.includes(q) || handle.includes(q) || email.includes(q) || lastMessage.includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowNewChat(!showNewChat)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations Sidebar */}
        <div className={`${isMobile && selectedConversation ? 'hidden' : 'flex'} flex-col w-full lg:w-80 bg-gray-800 border-r border-gray-700`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-700 flex-shrink-0">
            {/* New Chat Button */}
            <div className="mb-3">
              <Button
                onClick={() => setShowNewChat(!showNewChat)}
                className={`w-full ${showNewChat ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
              >
                {showNewChat ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </>
                )}
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {showNewChat ? (
              <div className="p-4">
                <h3 className="text-sm font-medium text-white mb-3">Start a new conversation</h3>
                
                {/* Single Search Bar */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search connections or type a handle (e.g., @username)"
                      value={handleSearch}
                      onChange={(e) => {
                        const value = e.target.value;
                        setHandleSearch(value);
                        if (value.startsWith('@')) {
                          searchUserByHandle(value.substring(1));
                        } else if (value) {
                          searchUserByHandle(value);
                        } else {
                          setHandleSearchResults([]);
                        }
                      }}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  {/* Handle Search Results */}
                  {handleSearch && handleSearch.trim() && handleSearchResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {handleSearchResults.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => startConversationWithUser(user.id, user.handle)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors border border-gray-600"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar_url || ''} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {user.display_name?.[0] || user.handle?.[0] || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {user.display_name || user.handle}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              @{user.handle}
                            </p>
                          </div>
                          <div className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                            New Chat
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* No Results Message */}
                  {handleSearch && handleSearch.trim() && !isSearchingHandle && handleSearchResults.length === 0 && (
                    <div className="mt-3 text-center py-4">
                      <p className="text-gray-400 text-sm">No user found with that handle</p>
                      <p className="text-gray-500 text-xs mt-1">Make sure you typed the exact handle</p>
                    </div>
                  )}
                  
                  {/* Loading State */}
                  {handleSearch && handleSearch.trim() && isSearchingHandle && (
                    <div className="mt-3 text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-400 text-sm mt-2">Searching...</p>
                    </div>
                  )}
                  
                  {/* Search Instructions */}
                  {handleSearch && !handleSearch.trim() && (
                    <div className="mt-3 text-center py-4">
                      <p className="text-gray-400 text-sm">Type a handle to search for users</p>
                      <p className="text-gray-500 text-xs mt-1">You can message any user on the platform</p>
                    </div>
                  )}
                </div>

                {/* Connections List - Only show when not searching */}
                {!handleSearch && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                      Your Connections
                    </h4>
                    <div className="space-y-2">
                      {filteredConnections.map((connection) => (
                        <div
                          key={connection.id}
                          onClick={() => startNewConversation(connection)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={connection.connected_user?.avatar_url || ''} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {connection.connected_user?.display_name?.[0] || connection.connected_user?.handle?.[0] || '?'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {connection.connected_user?.display_name || connection.connected_user?.handle}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {connection.business?.name || 'No business'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2">
                {filteredConversations.map((conversation) => {
                  const otherParticipant = getOtherParticipant(conversation);
                  const isSelected = selectedConversation?.id === conversation.id;
                  
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-blue-900 border border-blue-700' 
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={getOtherParticipantAvatar(conversation)?.src || ''} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-medium">
                          {getOtherParticipantAvatar(conversation)?.fallback || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium truncate ${
                            isSelected ? 'text-blue-200' : 'text-white'
                          }`}>
                            {(() => {
                              const business = getOtherParticipantBusiness(conversation);
                              const otherParticipant = getOtherParticipant(conversation);
                              
                              // If we found a business connection, show the business name
                              if (business?.business?.name) {
                                return business.business.name;
                              }
                              
                              // Otherwise show the person's name/email
                              return otherParticipant?.display_name || otherParticipant?.email || 'Unknown';
                            })()}
                          </p>
                          {(conversation as any).unread_count > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {(conversation as any).unread_count}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs truncate ${
                          isSelected ? 'text-blue-300' : 'text-gray-300'
                        }`}>
                          @{getOtherParticipant(conversation)?.handle || 'unknown'}
                        </p>
                        <p className={`text-xs mt-2 truncate ${
                          isSelected ? 'text-blue-300' : 'text-gray-300'
                        }`}>
                          {conversation.last_message?.content || 'No messages yet'}
                        </p>
                        {conversation.last_message_at && (
                          <p className={`text-xs mt-1 ${
                            isSelected ? 'text-blue-400' : 'text-gray-400'
                          }`}>
                            {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${isMobile && !selectedConversation ? 'hidden' : 'flex'} flex-1 flex flex-col bg-gray-900`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {isMobile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden p-2 text-white hover:bg-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={getOtherParticipantAvatar(selectedConversation)?.src || ''} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-medium">
                        {getOtherParticipantAvatar(selectedConversation)?.fallback || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        {(() => {
                          const business = getOtherParticipantBusiness(selectedConversation);
                          const otherParticipant = getOtherParticipant(selectedConversation);
                          
                          // If we found a business connection, show the business name
                          if (business?.business?.name) {
                            return business.business.name;
                          }
                          
                          // Otherwise show the person's name/email
                          const displayName = otherParticipant?.display_name;
                          const email = otherParticipant?.email;
                          
                          if (displayName) {
                            return displayName;
                          }
                          
                          if (email) {
                            // Truncate email on small screens
                            if (isMobile && email.length > 20) {
                              return email.substring(0, 20) + '...';
                            }
                            return email;
                          }
                          
                          return 'Unknown';
                        })()}
                      </h2>
                      <p className="text-xs text-gray-300">
                        @{getOtherParticipant(selectedConversation)?.handle || 'unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.sender_id === currentUser?.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-white border border-gray-700 shadow-sm'
                    } rounded-2xl px-4 py-3`}>
                       {message.image_url ? (
                         <div className="space-y-2">
                           <Image 
                             src={message.image_url} 
                             alt="Message image" 
                             width={300}
                             height={200}
                             className="max-w-full h-auto rounded-lg"
                           />
                           {message.content && (
                             <p className="text-sm leading-relaxed">{message.content}</p>
                           )}
                           <p className="text-sm opacity-90">📷 Image</p>
                         </div>
                       ) : (
                         <p className="text-sm leading-relaxed">{message.content}</p>
                       )}
                       
                       {/* Message footer with timestamp and read receipt */}
                       <div className={`flex items-center justify-end gap-2 mt-2 ${
                         message.sender_id === currentUser?.id 
                           ? 'text-blue-100' 
                           : 'text-gray-500'
                       }`}>
                         <span className="text-xs">
                           {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                         </span>
                         {message.sender_id === currentUser?.id && (
                           <span className="inline-flex items-center ml-1">
                             {message.read_at ? (
                               <>
                                 <span title="Read">
                                   <CheckCheck className="h-3.5 w-3.5 text-blue-200" />
                                 </span>
                                 <span className="sr-only">Read</span>
                               </>
                             ) : (
                               <>
                                 <span title="Delivered">
                                   <Check className="h-3.5 w-3.5 text-blue-200" />
                                 </span>
                                 <span className="sr-only">Delivered</span>
                               </>
                             )}
                           </span>
                         )}
                       </div>
                     </div>
                   </div>
                 ))}
                 <div ref={messagesEndRef} />
               </div>

               {/* Image Preview */}
               {imagePreview && (
                 <div className="border-t border-gray-700 p-4 bg-gray-800 flex-shrink-0">
                   <div className="flex items-center justify-between mb-3">
                     <span className="text-sm font-medium text-white">Image preview</span>
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       onClick={removeSelectedImage}
                       className="p-1 h-8 w-8"
                     >
                       <X className="h-4 w-4" />
                     </Button>
                   </div>
                   <div className="flex items-center space-x-3">
                     <Image 
                       src={imagePreview} 
                       alt="Preview" 
                       width={64}
                       height={64}
                       className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                     />
                     <div className="flex-1">
                       <p className="text-sm text-gray-300">
                         {selectedImage?.name || 'Image'}
                       </p>
                       <p className="text-xs text-gray-400">
                         {selectedImage?.size ? (selectedImage.size / 1024 / 1024).toFixed(2) : '0'} MB
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {/* Message Input */}
               <div className="border-t border-gray-700 p-4 bg-gray-800 flex-shrink-0">
                 {/* Image and Send buttons row - separate from text input on mobile */}
                 <div className="flex items-center justify-between mb-3">
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => fileInputRef.current?.click()}
                     disabled={uploadingImage}
                     className="p-3 h-12 w-12 text-gray-400 hover:text-blue-400 hover:bg-blue-50/10 transition-colors rounded-full"
                   >
                     <ImageIcon className="h-6 w-6" />
                   </Button>
                   
                   <Button
                     onClick={sendMessage}
                     disabled={(!newMessage.trim() && !selectedImage) || uploadingImage}
                     className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                   >
                     {uploadingImage ? (
                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                     ) : (
                       <Send className="h-5 w-5 mr-2" />
                     )}
                     Send
                   </Button>
                 </div>
                 
                 {/* Text input area */}
                 <div className="relative">
                   <Textarea
                     placeholder="Type a message..."
                     value={newMessage}
                     onChange={handleTextAreaChange}
                     onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                     className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 resize-none rounded-xl px-4 py-3 text-base"
                     style={{ height: `${textFieldHeight}px` }}
                     disabled={uploadingImage}
                     rows={1}
                   />
                   
                   {/* Hidden file input */}
                   <input
                     type="file"
                     ref={fileInputRef}
                     onChange={handleImageSelect}
                     accept="image/*"
                     className="hidden"
                   />
                 </div>
               </div>
             </>
           ) : (
             <div className="flex-1 flex items-center justify-center">
               <div className="text-center">
                 <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                   <MessageCircle className="h-12 w-12 text-gray-400" />
                 </div>
                 <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
                 <p className="text-gray-400">Choose a conversation from the sidebar to start messaging</p>
               </div>
             </div>
           )}
         </div>
       </div>
       
       {/* Mobile Floating Action Button for New Chat */}
       {isMobile && !showNewChat && !selectedConversation && (
         <div className="fixed bottom-20 right-4 z-50 lg:hidden">
           <Button
             onClick={() => setShowNewChat(true)}
             className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
           >
             <Plus className="h-6 w-6" />
           </Button>
         </div>
       )}
     </div>
   );
 }

 export default function MessagesPage() {
   return (
     <Suspense fallback={
       <div className="flex items-center justify-center min-h-screen">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
       </div>
     }>
       <MessagesPageContent />
     </Suspense>
   );
 }