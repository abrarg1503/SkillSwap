import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const sampleContacts = [
  {
    id: '1',
    name: 'Alice Johnson',
    skill: 'React Native Development',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=60',
  },
  {
    id: '2',
    name: 'Bob Smith',
    skill: 'Machine Learning',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=60',
  },
  {
    id: '3',
    name: 'Carol Davis',
    skill: 'Web Development',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=60',
  },
  {
    id: '4',
    name: 'David Wilson',
    skill: 'Data Science',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=60',
  },
  {
    id: '5',
    name: 'Eva Brown',
    skill: 'Cybersecurity',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=60',
  },
];

export default function SkillExchangeScreen() {
  const handleConnect = (contact) => {
    alert(`Connecting with ${contact.name} for ${contact.skill}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Exchange</Text>
      <Text style={styles.subtitle}>Connect with peers to learn and teach skills</Text>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {sampleContacts.map(contact => (
          <View key={contact.id} style={styles.contactCard}>
            <Image source={{ uri: contact.image }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.name}>{contact.name}</Text>
              <Text style={styles.skill}>{contact.skill}</Text>
              <Text style={styles.rating}>{contact.rating} ★</Text>
            </View>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => handleConnect(contact)}
            >
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1C3F',
    padding: 16,
  },
  title: {
    color: '#E0B0FF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#D4A5FF',
    fontSize: 14,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  contactCard: {
    backgroundColor: '#1A2952',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#A78BFA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  skill: {
    color: '#A7A7BC',
    fontSize: 14,
    marginBottom: 4,
  },
  rating: {
    color: '#B1B1CE',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#A78BFA',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});