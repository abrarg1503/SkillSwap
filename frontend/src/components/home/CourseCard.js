import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CourseCard({ title, subtitle, duration, rating, image, onPress, onBookPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Image Section */}
      <Image 
        source={{ uri: image }} 
        style={styles.image}
      />
      
      {/* Content Section */}
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.ratingStar}>★</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.meta}>{duration}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2D',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#2A2A42',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: '#0D0E1A',
  },
  body: {
    padding: 16,
    backgroundColor: '#1E1E2D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
    lineHeight: 22,
  },
  subtitle: {
    color: '#A7A7BC',
    fontSize: 13,
    fontWeight: '500',
  },
  ratingBadge: {
    backgroundColor: '#6EE7B7',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    minWidth: 50,
  },
  ratingText: {
    color: '#0B0D17',
    fontSize: 16,
    fontWeight: '800',
  },
  ratingStar: {
    color: '#0B0D17',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  meta: {
    color: '#B1B1CE',
    fontSize: 13,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#6EE7B7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  bookText: {
    color: '#0B0D17',
    fontSize: 13,
    fontWeight: '700',
  },
});
