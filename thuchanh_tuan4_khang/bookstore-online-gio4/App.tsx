// GIỜ 4 — Layout toàn màn hình: ScrollView & SafeAreaView
// Bài 1: HomeScreen (Header cố định + ScrollView [Chips + Grid] + nút giỏ nổi)
// Bài 2: BookDetailScreen (ảnh bìa + ScrollView mô tả + thanh "Thêm vào giỏ" cố định)
//
// Bài học không dùng thư viện navigation: chỉ 1 biến state chọn màn hình nào
// được vẽ — bấm 1 cuốn sách ở Trang chủ để mở màn Chi tiết.
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { BOOKS } from './data';

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId);

  return (
    // SafeAreaProvider bắt buộc bọc ngoài cùng để SafeAreaView bên trong
    // đọc được kích thước tai thỏ / thanh trạng thái của từng thiết bị.
    <SafeAreaProvider>
      {selectedBook ? (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => setCartCount((n) => n + 1)}
        />
      ) : (
        <HomeScreen
          cartCount={cartCount}
          onOpenBook={setSelectedBookId}
          onPressCart={() => console.log('Mở giỏ hàng —', cartCount, 'sản phẩm')}
        />
      )}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
