import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Linking } from 'react-native';

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
    linkedin: 'linkedin.com/in/alice-johnson',
  },
  {
    id: '2',
    name: 'Bob Smith',
    course: 'Machine Learning Fundamentals',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=60',
    online: true,
    linkedin: 'linkedin.com/in/bob-smith',
  },
  {
    id: '3',
    name: 'Carol Davis',
    course: 'Web Development with MERN',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=60',
    online: false,
    linkedin: 'linkedin.com/in/carol-davis',
  },
  {
    id: '4',
    name: 'David Wilson',
    course: 'Data Science & Analytics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60',
    online: true,
    linkedin: 'linkedin.com/in/david-wilson',
  },
  {
    id: '5',
    name: 'Eva Brown',
    course: 'Cybersecurity Essentials',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60',
    online: false,
    linkedin: 'linkedin.com/in/eva-brown',
  },
  {
    id: '6',
    name: 'Frank Miller',
    course: 'Cloud Computing with AWS',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60',
    online: true,
    linkedin: 'linkedin.com/in/frank-miller',
  },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState('AI');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [aiMessages, setAiMessages] = useState([]);
  const [memberMessages, setMemberMessages] = useState({});

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setInput('');

    if (activeTab === 'AI') {
      const updatedAiMessages = [...aiMessages, userMessage];
      setAiMessages(updatedAiMessages);
      setMessages(updatedAiMessages);

      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          sender: 'ai'
        };
        const replyMessages = [...updatedAiMessages, aiMessage];
        setAiMessages(replyMessages);
        setMessages(replyMessages);
      }, 1000);
      return;
    }

    if (selectedMember) {
      const currentMemberMessages = memberMessages[selectedMember.id] || [];
      const updatedMessages = [...currentMemberMessages, userMessage];
      setMemberMessages(prev => ({
        ...prev,
        [selectedMember.id]: updatedMessages,
      }));
      setMessages(updatedMessages);

      setTimeout(() => {
        const personMessage = {
          id: Date.now() + 1,
          text: `Hey! Good to hear from you. I'm learning ${selectedMember.course}.`,
          sender: 'person'
        };
        const replyMessages = [...updatedMessages, personMessage];
        setMemberMessages(prev => ({
          ...prev,
          [selectedMember.id]: replyMessages,
        }));
        setMessages(replyMessages);
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

  const openLinkedIn = async (url) => {
    if (!url) return;
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    try {
      await Linking.openURL(fullUrl);
    } catch (error) {
      alert('Unable to open LinkedIn profile.');
    }
  };

  const renderMember = ({ item }) => (
    <View style={styles.memberCardContainer}>
      <TouchableOpacity
        style={[
          styles.memberCard,
          selectedMember?.id === item.id && styles.memberCardSelected
        ]}
        onPress={() => {
          setSelectedMember(item);
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
      {item.linkedin ? (
        <TouchableOpacity style={styles.linkedinButtonSmall} onPress={() => openLinkedIn(item.linkedin)}>
          <Text style={styles.linkedinButtonText}>Open LinkedIn</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  useEffect(() => {
    if (activeTab === 'AI') {
      setSelectedMember(null);
      setMessages(aiMessages);
    } else if (selectedMember) {
      setMessages(memberMessages[selectedMember.id] || []);
    } else {
      setMessages([]);
    }
  }, [activeTab, selectedMember, aiMessages, memberMessages]);

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
          {selectedMember ? (
            <View style={styles.chatHeader}>
              <TouchableOpacity onPress={() => setSelectedMember(null)}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatTitle}>Chat with {selectedMember.name}</Text>
                <Text style={styles.chatSubtitle}>{selectedMember.course}</Text>
              </View>
              {selectedMember.linkedin ? (
                <TouchableOpacity style={styles.linkedinButtonSmall} onPress={() => openLinkedIn(selectedMember.linkedin)}>
                  <Text style={styles.linkedinButtonText}>LinkedIn</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
          <FlatList
            data={messages}
            keyExtractor={item => item.id.toString()}
            renderItem={renderMessage}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContainer}
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
    marginBottom: 6,
  },
  memberCardContainer: {
    marginBottom: 12,
  },
  linkedinButtonSmall: {
    alignSelf: 'flex-start',
    backgroundColor: '#0C4A6E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 12,
    marginBottom: 8,
  },
  linkedinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backText: {
    color: '#6EE7B7',
    fontSize: 16,
    fontWeight: '700',
  },
  chatHeaderInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  chatTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  chatSubtitle: {
    color: '#A7A7BC',
    fontSize: 12,
    marginTop: 4,
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