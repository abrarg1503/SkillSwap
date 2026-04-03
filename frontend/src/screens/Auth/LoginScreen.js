import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const profileRef = doc(db, 'profile_details', user.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        alert('Profile not found in Firestore. Please register first.');
        return;
      }

      navigation.navigate('Main');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Namaste 👋</Text>
      <Image
        source={require('../../../assets/skillswap-logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>SkillSwap Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} placeholderTextColor="#A9A9A9" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} placeholderTextColor="#A9A9A9" />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0F172A',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#34D399',
    marginBottom: 12,
    textAlign: 'center',
  },
  logo: {
    width: 84,
    height: 84,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#22C55E',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 14,
  },
  registerButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});