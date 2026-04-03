import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../services/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Load profile
      const profileSnap = await getDoc(doc(db, 'profile_details', user.uid));
      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }

      // Load bookings
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid)
      );
      const bookingsSnap = await getDocs(bookingsQuery);
      const bookingsData = bookingsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image
          source={{ uri: profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=60' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile?.name || 'User'}</Text>
        <Text style={styles.email}>{profile?.email || auth.currentUser?.email}</Text>
        <Text style={styles.points}>⭐ {profile?.points || 0} Points</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enrolled Courses</Text>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <View key={booking.id} style={styles.courseItem}>
              <Text style={styles.courseTitle}>{booking.courseTitle}</Text>
              <Text style={styles.courseSubtitle}>{booking.courseSubtitle}</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '30%' }]} />
                </View>
                <Text style={styles.progressText}>30% Complete</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No enrolled courses yet</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <Text style={styles.achievementTitle}>First Course</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>⭐</Text>
            <Text style={styles.achievementTitle}>5 Star Rating</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🎯</Text>
            <Text style={styles.achievementTitle}>Goal Achiever</Text>
          </View>
          <View style={styles.achievement}>
            <Text style={styles.achievementIcon}>🔥</Text>
            <Text style={styles.achievementTitle}>Streak Master</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificates</Text>
        <Text style={styles.noData}>No certificates earned yet</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A3A52',
    margin: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    color: '#A7A7BC',
    fontSize: 14,
    marginBottom: 8,
  },
  points: {
    color: '#06B6D4',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  courseItem: {
    backgroundColor: '#1A3A52',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  courseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseSubtitle: {
    color: '#A7A7BC',
    fontSize: 14,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A42',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#06B6D4',
    borderRadius: 3,
  },
  progressText: {
    color: '#B1B1CE',
    fontSize: 12,
  },
  noData: {
    color: '#9CA3AF',
    fontSize: 14,
    fontStyle: 'italic',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievement: {
    backgroundColor: '#1A3A52',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#06B6D4',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});