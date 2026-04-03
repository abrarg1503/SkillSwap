import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../components/home/CourseCard';

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

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(sampleCourses);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCourses(sampleCourses);
    } else {
      const filtered = sampleCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Courses</Text>

      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search for courses..."
        placeholderTextColor="#9CA3AF"
      />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              subtitle={course.subtitle}
              duration={course.duration}
              rating={course.rating}
              image={course.image}
              onPress={() => alert(`Open ${course.title}`)}
              onBookPress={() => navigation.navigate('Bookings', { course })}
            />
          ))
        ) : (
          <Text style={styles.noResults}>No courses found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1F35',
    padding: 16,
  },
  title: {
    color: '#FBBF24',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#2D3748',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FBBF24',
  },
  list: {
    paddingBottom: 20,
  },
  noResults: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});