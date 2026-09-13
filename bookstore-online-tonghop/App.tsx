import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    // screen: flex:1 -> chiếm toàn màn hình và đồng thời là containing block
    // (position mặc định 'relative') cho FloatingCartButton absolute bên dưới.
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — nằm NGOÀI ScrollView nên không cuộn theo */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — đã đặt paddingBottom đủ lớn để
              FloatingCartButton không che mất ô sách cuối cùng */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log('Mở sách', id)} />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView, cùng cấp với nó -> luôn neo ở góc
             dưới-phải màn hình, không bị cuộn trôi mất */}
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((n) => n + 1)} />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    marginTop: 4,
  },
});
