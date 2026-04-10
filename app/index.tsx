import React, { useEffect, useState } from 'react';
import {
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
import AppModal from '../components/AppModal';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | 'info'>('info');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const showModal = (
    type: 'success' | 'error' | 'info',
    title: string,
    message: string
  ) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      router.replace('/home');
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      showModal('error', 'Oops', 'Email dan password wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        showModal('error', 'Signup Gagal', error.message);
        return;
      }

      showModal('success', 'Berhasil', 'Akun berhasil dibuat. Sekarang kamu bisa login.');
    } catch (err: any) {
      showModal('error', 'Error', err.message || 'Terjadi kesalahan saat signup.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      showModal('error', 'Oops', 'Email dan password wajib diisi.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        showModal('error', 'Login Gagal', error.message);
        return;
      }

      showModal('success', 'Login Berhasil', 'Selamat datang di Finance Tracker.');
      setTimeout(() => {
        setModalVisible(false);
        router.replace('/home');
      }, 900);
    } catch (err: any) {
      showModal('error', 'Error', err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B37F3" />

      <View style={styles.header}>
        <Text style={styles.brand}>Finance Tracker</Text>
        <Text style={styles.subtitle}>
          Track income, expenses, and your financial goals with ease.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.caption}>Sign in to continue managing your finances</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="yourmail@example.com"
            placeholderTextColor="#A4A4A4"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#A4A4A4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Loading...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.9}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <AppModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F8',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#4B37F3',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 90,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: '#DAD5FF',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: 260,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: -54,
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 30,
    shadowColor: '#121212',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 7,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#181818',
    textAlign: 'center',
  },
  caption: {
    marginTop: 8,
    marginBottom: 24,
    color: '#7B7B7B',
    fontSize: 14,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    color: '#616161',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#EBEEF5',
  },
  primaryButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#4B37F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#4B37F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#F8F7FF',
  },
  secondaryButtonText: {
    color: '#4B37F3',
    fontSize: 16,
    fontWeight: '800',
  },
});