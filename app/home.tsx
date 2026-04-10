import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    setEmail(data.user?.email || '');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Logout gagal', error.message);
      return;
    }

    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B37F3" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome Back</Text>
          <Text style={styles.userEmail}>{email}</Text>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>Rp 12.500.000</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statIncome}>+ Rp 8.000.000</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Expense</Text>
              <Text style={styles.statExpense}>- Rp 3.200.000</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <View style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionTitle}>Gaji Bulanan</Text>
              <Text style={styles.transactionDate}>12 Apr 2026</Text>
            </View>
            <Text style={styles.transactionIncome}>+ Rp 7.000.000</Text>
          </View>

          <View style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionTitle}>Belanja Bulanan</Text>
              <Text style={styles.transactionDate}>11 Apr 2026</Text>
            </View>
            <Text style={styles.transactionExpense}>- Rp 850.000</Text>
          </View>

          <View style={styles.transactionCard}>
            <View>
              <Text style={styles.transactionTitle}>Internet</Text>
              <Text style={styles.transactionDate}>10 Apr 2026</Text>
            </View>
            <Text style={styles.transactionExpense}>- Rp 320.000</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#4B37F3',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  userEmail: {
    color: '#D7D1FF',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },
  balanceLabel: {
    color: '#7A7A7A',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceValue: {
    color: '#1A1A1A',
    fontSize: 28,
    fontWeight: '800',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#1A1A1A',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  statLabel: {
    color: '#7A7A7A',
    fontSize: 13,
    marginBottom: 10,
  },
  statIncome: {
    color: '#1FA971',
    fontSize: 16,
    fontWeight: '700',
  },
  statExpense: {
    color: '#E05555',
    fontSize: 16,
    fontWeight: '700',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTitle: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '600',
  },
  transactionDate: {
    color: '#8E8E8E',
    fontSize: 12,
    marginTop: 4,
  },
  transactionIncome: {
    color: '#1FA971',
    fontSize: 15,
    fontWeight: '700',
  },
  transactionExpense: {
    color: '#E05555',
    fontSize: 15,
    fontWeight: '700',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#1A1A1A',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});