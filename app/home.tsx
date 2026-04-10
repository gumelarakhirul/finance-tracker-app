import React, { useEffect, useState } from 'react';
import {
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
import AppModal from '../components/AppModal';

export default function Home() {
  const [email, setEmail] = useState('');
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setEmail(data.user?.email || '');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return;
    }

    setLogoutModal(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4B37F3" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <Text style={styles.welcome}>Good Evening 👋</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceValue}>Rp 12.500.000</Text>

            <View style={styles.balanceRow}>
              <View style={styles.miniBox}>
                <Text style={styles.miniLabel}>Income</Text>
                <Text style={styles.income}>Rp 8.000.000</Text>
              </View>

              <View style={styles.miniBox}>
                <Text style={styles.miniLabel}>Expense</Text>
                <Text style={styles.expense}>Rp 3.200.000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>Salary</Text>
              <Text style={styles.itemDate}>12 Apr 2026</Text>
            </View>
            <Text style={styles.itemIncome}>+ Rp 7.000.000</Text>
          </View>

          <View style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>Groceries</Text>
              <Text style={styles.itemDate}>11 Apr 2026</Text>
            </View>
            <Text style={styles.itemExpense}>- Rp 850.000</Text>
          </View>

          <View style={styles.item}>
            <View>
              <Text style={styles.itemTitle}>Internet Bill</Text>
              <Text style={styles.itemDate}>10 Apr 2026</Text>
            </View>
            <Text style={styles.itemExpense}>- Rp 320.000</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModal(true)}
          activeOpacity={0.9}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <AppModal
        visible={logoutModal}
        title="Logout"
        message="Apakah kamu yakin ingin keluar dari akun ini?"
        type="info"
        buttonText="Yes, Logout"
        onClose={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF1F8',
  },
  scrollContent: {
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: '#4B37F3',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  email: {
    color: '#DAD5FF',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
  },
  balanceLabel: {
    color: '#7A7A7A',
    fontSize: 14,
  },
  balanceValue: {
    color: '#161616',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  miniBox: {
    flex: 1,
    backgroundColor: '#F7F8FD',
    borderRadius: 16,
    padding: 14,
  },
  miniLabel: {
    color: '#7A7A7A',
    fontSize: 13,
    marginBottom: 6,
  },
  income: {
    color: '#1FA971',
    fontSize: 15,
    fontWeight: '700',
  },
  expense: {
    color: '#E05555',
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#161616',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 14,
  },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#1B1B1B',
    fontSize: 15,
    fontWeight: '700',
  },
  itemDate: {
    color: '#8A8A8A',
    fontSize: 12,
    marginTop: 5,
  },
  itemIncome: {
    color: '#1FA971',
    fontSize: 15,
    fontWeight: '800',
  },
  itemExpense: {
    color: '#E05555',
    fontSize: 15,
    fontWeight: '800',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});