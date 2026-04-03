import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { auth, db } from '../services/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function RatingReviewScreen() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'Please log in to submit a review.');
      return;
    }
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please provide feedback.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || 'Anonymous',
        rating,
        feedback: feedback.trim(),
        createdAt: serverTimestamp(),
      });
      setRating(0);
      setFeedback('');
      loadReviews(); // Refresh list
      Alert.alert('Success', 'Review submitted!');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.star}
          >
            <Text style={[styles.starText, rating >= star && styles.starSelected]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Rate & Review</Text>
      <Text style={styles.subtitle}>Share your feedback about the app</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Your Rating</Text>
        {renderStars()}

        <Text style={styles.label}>Your Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your review here..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={feedback}
          onChangeText={setFeedback}
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reviewsSection}>
        <Text style={styles.reviewsTitle}>Recent Reviews</Text>
        {reviews.length === 0 ? (
          <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
        ) : (
          reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <Text style={styles.reviewRating}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </Text>
              </View>
              <Text style={styles.reviewText}>{review.feedback}</Text>
              <Text style={styles.reviewDate}>
                {review.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  form: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  star: {
    marginRight: 8,
  },
  starText: {
    fontSize: 32,
    color: '#666',
  },
  starSelected: {
    color: '#FFD700',
  },
  input: {
    backgroundColor: '#2A2A42',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#6EE7B7',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#4A5568',
  },
  submitText: {
    color: '#0B0D17',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  noReviews: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  reviewCard: {
    backgroundColor: '#1E1E2D',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  reviewText: {
    fontSize: 14,
    color: '#E9EFFF',
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#C4B5FD',
  },
});