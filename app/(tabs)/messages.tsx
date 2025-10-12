import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { MessageCircle, Search } from 'lucide-react-native';

interface ChatPreview {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  listingTitle: string;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    userName: 'John Smith',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    lastMessage: 'Is this still available?',
    timestamp: '2m ago',
    unread: true,
    listingTitle: 'Professional Camera',
  },
  {
    id: '2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    lastMessage: 'Can we meet tomorrow?',
    timestamp: '1h ago',
    unread: true,
    listingTitle: 'Classic Road Bike',
  },
  {
    id: '3',
    userName: 'Mike Wilson',
    userAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    lastMessage: 'Thank you!',
    timestamp: '2h ago',
    unread: false,
    listingTitle: 'Modern Apartment',
  },
];

export default function MessagesScreen() {
  const [chats] = useState<ChatPreview[]>(mockChats);

  const handleChatPress = (chatId: string) => {
    console.log('Chat pressed:', chatId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
            <Search color={Colors.primary} size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {chats.length > 0 ? (
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            {chats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={styles.chatItem}
                onPress={() => handleChatPress(chat.id)}
                activeOpacity={0.8}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: chat.userAvatar }} style={styles.avatar} />
                  {chat.unread && <View style={styles.unreadBadge} />}
                </View>

                <View style={styles.chatContent}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.userName} numberOfLines={1}>
                      {chat.userName}
                    </Text>
                    <Text style={styles.timestamp}>{chat.timestamp}</Text>
                  </View>
                  <Text style={styles.listingTitle} numberOfLines={1}>
                    {chat.listingTitle}
                  </Text>
                  <Text
                    style={[styles.lastMessage, chat.unread && styles.lastMessageUnread]}
                    numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={styles.bottomSpacer} />
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <MessageCircle color={Colors.text.light} size={64} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyStateTitle}>No messages yet</Text>
            <Text style={styles.emptyStateText}>
              When you start chatting with buyers or sellers, your conversations will appear here
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: 0.3,
  },
  searchButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.border,
  },
  unreadBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text.light,
  },
  listingTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  lastMessageUnread: {
    fontWeight: '600',
    color: Colors.text.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 20,
  },
});
