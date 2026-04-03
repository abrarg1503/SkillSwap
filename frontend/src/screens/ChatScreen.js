import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';

const aiResponses = [
  "That's a great question! Let me help you with that.",
  "Based on your interest in programming, I recommend starting with basics.",
  "Feel free to ask me anything about courses or skills!",
  "I'm here to assist you with your learning journey.",
];

const enrolledMembers = [
  {
    id: '1',
    name: 'Alice Johnson',
    course: 'React Native Development',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=60',
    online: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    course: 'Machine Learning Fundamentals',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=60',
    online: true,
  },
  {
    id: '3',
    name: 'Carol Davis',
    course: 'Web Development with MERN',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=60',
    online: false,
  },
  {
    id: '4',
    name: 'David Wilson',
    course: 'Data Science & Analytics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60',
    online: true,
  },
  {
    id: '5',
    name: 'Eva Brown',
    course: 'Cybersecurity Essentials',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60',
    online: false,
  },
  {
    id: '6',
    name: 'Frank Miller',
    course: 'Cloud Computing with AWS',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60',
    online: true,
  },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState('AI');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (activeTab === 'AI') {
      // Mock AI response
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          sender: 'ai'
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    } else if (selectedMember) {
      // Mock person response
      setTimeout(() => {
        const personMessage = {
          id: Date.now() + 1,
          text: `Hey! Good to hear from you. I'm learning ${selectedMember.course}.`,
          sender: 'person'
        };
        setMessages(prev => [...prev, personMessage]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'user' ? styles.userBubble : styles.aiBubble
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userText : styles.aiText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  const renderMember = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.memberCard,
        selectedMember?.id === item.id && styles.memberCardSelected
      ]}
      onPress={() => {
        setSelectedMember(item);
        setMessages([]);
        setActiveTab('Person');
      }}
    >
      <View style={styles.memberContent}>
        <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{item.name}</Text>
          <Text style={styles.memberCourse}>{item.course}</Text>
        </View>
        <View style={[
          styles.onlineIndicator,
          item.online ? styles.onlineActive : styles.onlineInactive
        ]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'AI' && styles.activeTab]}
          onPress={() => setActiveTab('AI')}
        >
          <Text style={[styles.tabText, activeTab === 'AI' && styles.activeTabText]}>AI Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Person' && styles.activeTab]}
          onPress={() => setActiveTab('Person')}
        >
          <Text style={[styles.tabText, activeTab === 'Person' && styles.activeTabText]}>Connect Members</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Person' && !selectedMember && (
        <ScrollView style={styles.membersList} showsVerticalScrollIndicator={false}>
          <Text style={styles.membersTitle}>Enrolled Members</Text>
          {enrolledMembers.map(member => (
            <View key={member.id}>
              {renderMember({ item: member })}
            </View>
          ))}
        </ScrollView>
      )}

      {(activeTab === 'AI' || selectedMember) && (
        <>
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={renderMessage}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContainer}
            inverted
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder={activeTab === 'AI' ? "Ask AI about courses..." : `Chat with ${selectedMember?.name}...`}
              placeholderTextColor="#9CA3AF"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04050E',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E2D',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#6EE7B7',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#0B0D17',
  },
  membersList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  membersTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  memberCard: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A42',
  },
  memberCardSelected: {
    borderColor: '#6EE7B7',
    backgroundColor: '#2A2A42',
  },
  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberCourse: {
    color: '#A7A7BC',
    fontSize: 12,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  onlineActive: {
    backgroundColor: '#22C55E',
  },
  onlineInactive: {
    backgroundColor: '#9CA3AF',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContainer: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: '#6EE7B7',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#1E1E2D',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#2A2A42',
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#0B0D17',
  },
  aiText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1E1E2D',
    borderTopWidth: 1,
    borderTopColor: '#2A2A42',
  },
  input: {
    flex: 1,
    backgroundColor: '#2A2A42',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#6EE7B7',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  sendText: {
    color: '#0B0D17',
    fontSize: 16,
    fontWeight: '600',
  },
});