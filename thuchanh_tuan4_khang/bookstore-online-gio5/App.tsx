// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Bài 1: TabBar (components/TabBar.tsx) + so sánh static/absolute (components/TabLayout.tsx)
// Bài 2: CartScreen (screens/CartScreen.tsx)
//
// Bố cục toàn ứng dụng:
//   SafeAreaView (flex:1)
//   └── TabLayout
//       ├── [màn hình của tab đang chọn: Trang chủ / Danh mục / Giỏ hàng / Tài khoản]
//       └── TabBar (dùng chung cho cả 4 tab)
// Màn Chi tiết sách (Giờ 4) mở toàn màn hình, che luôn tab bar vì nó có thanh
// "Thêm vào giỏ" riêng ở đáy.
//
// Không dùng thư viện navigation: chỉ vài biến state chọn màn hình nào được vẽ.
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TabLayout } from './components/TabLayout';
import { TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { AccountScreen } from './screens/AccountScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { BOOKS, Book, CART_ITEMS, CartItem } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(CART_ITEMS);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sách đã có trong giỏ -> tăng số lượng, chưa có -> thêm dòng mới
  const addToCart = (book: Book) => {
    setCartItems((items) =>
      items.some((item) => item.book.id === book.id)
        ? items.map((item) => (item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [...items, { book, quantity: 1 }],
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            cartCount={cartCount}
            onOpenBook={setSelectedBookId}
            onPressCart={() => setActiveTab('cart')}
          />
        );
      case 'category':
        return <CategoryScreen />;
      case 'cart':
        return <CartScreen items={cartItems} />;
      case 'account':
        return <AccountScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      {selectedBook ? (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => addToCart(selectedBook)}
        />
      ) : (
        <SafeAreaView style={styles.safeArea}>
          <TabLayout activeTab={activeTab} onChangeTab={setActiveTab} cartCount={cartCount}>
            {renderTab()}
          </TabLayout>
        </SafeAreaView>
      )}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // cùng màu tab bar -> vùng home indicator bên dưới liền mạch
  },
});
