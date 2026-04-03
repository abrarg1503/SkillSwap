import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { auth, db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

const sampleCourses = [
  {
    id: '1',
    title: 'Mobile App Development with React Native',
    subtitle: 'by CS50',
    duration: '06h13',
    rating: '4.64',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    title: 'Operating System Basics',
    subtitle: 'by Academy',
    duration: '07h20',
    rating: '4.58',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '3',
    title: 'Fundamentals of Artificial Intelligence',
    subtitle: 'by NPTEL',
    duration: '09h44',
    rating: '4.82',
    image: 'https://images.unsplash.com/photo-1518173946684-6db1e1f4a84b?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '4',
    title: 'Artificial Intelligence by CS50',
    subtitle: 'by CS50',
    duration: '10h47',
    rating: '4.87',
    image: 'https://images.unsplash.com/photo-1515169067865-5387c7470b6f?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '5',
    title: 'Data Structures and Algorithms',
    subtitle: 'by GeeksforGeeks',
    duration: '12h30',
    rating: '4.75',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '6',
    title: 'Web Development with MERN Stack',
    subtitle: 'by FreeCodeCamp',
    duration: '15h22',
    rating: '4.90',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '7',
    title: 'Machine Learning Fundamentals',
    subtitle: 'by Coursera',
    duration: '18h45',
    rating: '4.68',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '8',
    title: 'Cybersecurity Essentials',
    subtitle: 'by IBM',
    duration: '11h15',
    rating: '4.72',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '9',
    title: 'Full Stack Web Development',
    subtitle: 'by Udemy',
    duration: '20h45',
    rating: '4.85',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '10',
    title: 'Data Communication Networks',
    subtitle: 'by MIT OpenCourseWare',
    duration: '14h30',
    rating: '4.79',
    image: 'https://images.unsplash.com/photo-1553531889-e6cf89d45394?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '11',
    title: 'Cloud Computing with AWS',
    subtitle: 'by A Cloud Guru',
    duration: '16h20',
    rating: '4.88',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '12',
    title: 'Blockchain & Cryptocurrency',
    subtitle: 'by Coursera',
    duration: '13h15',
    rating: '4.72',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?auto=format&fit=crop&w=800&q=60',
  },
];

export default function BookingScreen() {
  const route = useRoute();
  const { course: initialCourse } = route.params || {};
  const [bookingId, setBookingId] = useState(null);
  const [bookedCourses, setBookedCourses] = useState([]);

  const handleBook = async (courseToBook) => {
    setBookingId(courseToBook.id);
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'Please login first');
        return;
      }
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        courseId: courseToBook.id,
        courseTitle: courseToBook.title,
        courseSubtitle: courseToBook.subtitle,
        duration: courseToBook.duration,
        rating: courseToBook.rating,
        image: courseToBook.image,
        bookedAt: new Date(),
        status: 'confirmed',
      });
      setBookedCourses([...bookedCourses, courseToBook.id]);
      Alert.alert('Success', `${courseToBook.title} booked successfully!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to book course');
      console.error(error);
    } finally {
      setBookingId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Courses</Text>
      <Text style={styles.subtitle}>Select and book your favorite courses</Text>

      <ScrollView contentContainerStyle={styles.coursesList} showsVerticalScrollIndicator={false}>
        {sampleCourses.map(course => (
          <View key={course.id} style={styles.courseItem}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
              <View style={styles.courseMeta}>
                <Text style={styles.metaText}>⏱️ {course.duration}</Text>
                <Text style={styles.metaText}>⭐ {course.rating}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  bookingId === course.id && styles.disabled,
                  bookedCourses.includes(course.id) && styles.bookedButton
                ]}
                onPress={() => handleBook(course)}
                disabled={bookingId === course.id || bookedCourses.includes(course.id)}
              >
                <Text style={[
                  styles.bookText,
                  bookedCourses.includes(course.id) && styles.bookedText
                ]}>
                  {bookedCourses.includes(course.id) ? '✓ Booked' : bookingId === course.id ? 'Booking...' : 'Book Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F35',
    padding: 16,
  },
  title: {
    color: '#60A5FA',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#93C5FD',
    fontSize: 14,
    marginBottom: 16,
  },
  coursesList: {
    paddingBottom: 20,
  },
  courseItem: {
    backgroundColor: '#2D3748',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#60A5FA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseSubtitle: {
    color: '#A7A7BC',
    fontSize: 12,
    marginBottom: 6,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaText: {
    color: '#B1B1CE',
    fontSize: 11,
  },
  bookButton: {
    backgroundColor: '#60A5FA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  bookedButton: {
    backgroundColor: '#34D399',
  },
  bookText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bookedText: {
    color: '#0D2818',
  },
});