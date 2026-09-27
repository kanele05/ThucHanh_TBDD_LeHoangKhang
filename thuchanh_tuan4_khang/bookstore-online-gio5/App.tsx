// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Ghép đủ 4 tab thật (Trang chủ / Danh mục / Giỏ hàng / Tài khoản) dùng chung 1
// TabBar tĩnh (Bài 1), chuyển màn chỉ bằng useState — KHÔNG dùng thư viện
// navigation. Bài tập 2 (Cart Screen, đủ 3 vùng: cuộn / tổng tiền cố định / tab
// bar cố định) là trọng tâm; 3 tab còn lại là layout tĩnh đơn giản (modest),
// không phải chỉ ghi chú trỏ sang project khác.
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { AccountScreen } from './screens/AccountScreen';
import { CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('cart');

  return (
    <SafeAreaView style={styles.root}>
      {/* body: flexDirection mặc định 'column' của View.
          - Màn hình đang active luôn flex:1 -> chiếm hết phần còn lại.
          - TabBar đứng SAU trong cây, nên dù dùng cách 'absolute' (thoát luồng,
            tự neo đáy) hay cách 'static' (đứng cuối luồng flex) như so sánh
            trong TabBar.tsx, layout ở đây đều không cần đổi gì thêm. */}
      <View style={styles.body}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'category' && <CategoryScreen />}
        {activeTab === 'cart' && <CartScreen items={CART_ITEMS} />}
        {activeTab === 'account' && <AccountScreen />}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
});
