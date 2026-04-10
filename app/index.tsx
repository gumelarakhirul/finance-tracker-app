import React, { useEffect, useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return;
    }

    if (data.session) {
      router.replace('/home');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Signup gagal', error.message);
        return;
      }

      Alert.alert('Berhasil', 'Akun berhasil dibuat');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Terjadi kesalahan saat signup');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login gagal', error.message);
        return;
      }

      router.replace('/home');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B37F3" />

      <View style={styles.phoneFrame}>
        <View style={styles.header}>
          <Text style={styles.brand}>Finance Tracker</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Please enter your email address"
              placeholderTextColor="#B7B7B7"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#B7B7B7"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.signInButtonText}>
              {loading ? 'Loading...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8ACB7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  phoneFrame: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 180,
    backgroundColor: '#4B37F3',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: -24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1F1F1F',
  },
  inputGroup: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    marginBottom: 22,
    paddingBottom: 10,
  },
  input: {
    fontSize: 14,
    color: '#1F1F1F',
  },
  signInButton: {
    height: 48,
    borderRadius: 6,
    backgroundColor: '#4B37F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signUpButton: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#4B37F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  signUpButtonText: {
    color: '#4B37F3',
    fontSize: 16,
    fontWeight: '700',
  },
});