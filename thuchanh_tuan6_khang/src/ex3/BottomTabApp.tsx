import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Phone } from "../types";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <View style={s.card}>
      <Text style={s.cardTitle}>{phone.name.split(" - ")[0]}</Text>
      <Text style={s.cardPrice}>{formatPrice(phone.price)}</Text>
    </View>
  );
}

function HomeTab() {
  return (
    <FlatList data={PHONES} keyExtractor={(p) => p.id} contentContainerStyle={s.list}
      renderItem={({ item }) => <PhoneCard phone={item} />} />
  );
}

// TODO 1: ô tìm kiếm + lọc PHONES theo từ khóa (không phân biệt hoa/thường)
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const q = keyword.trim().toLowerCase();
  const results = PHONES.filter((p) => p.name.toLowerCase().includes(q));

  return (
    <View style={s.root}>
      <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input}
        autoCorrect={false} autoCapitalize="none" clearButtonMode="while-editing" />
      <FlatList data={results} keyExtractor={(p) => p.id} contentContainerStyle={s.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <PhoneCard phone={item} />}
        ListEmptyComponent={<Text style={s.empty}>Không có kết quả cho “{keyword.trim()}”</Text>} />
    </View>
  );
}

// TODO 2: Avatar tròn (chữ cái đầu) + tên + email, canh giữa
function ProfileTab() {
  const name = "Nguyễn Văn An";
  return (
    <View style={s.center}>
      <View style={s.avatar}><Text style={s.avatarText}>{name.split(" ").pop()![0]}</Text></View>
      <Text style={s.name}>{name}</Text>
      <Text style={s.email}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 3: Tab.Navigator với icon đặc/viền theo trạng thái chọn
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ focused, color, size }) =>
          <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />,
      })}>
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 10 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 14, borderWidth: 1, borderColor: colors.line },
  cardTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
  cardPrice: { marginTop: 4, fontSize: 14, color: colors.red, fontWeight: "700" },
  input: { margin: 16, marginBottom: 0, height: 44, paddingHorizontal: 14, borderRadius: 10, borderWidth: 1,
    borderColor: colors.line, backgroundColor: "#fff", fontSize: 15, color: colors.text },
  empty: { textAlign: "center", marginTop: 24, color: colors.muted, fontSize: 15 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy,
    alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "700" },
  name: { marginTop: 16, fontSize: 22, fontWeight: "700", color: colors.text },
  email: { marginTop: 4, fontSize: 15, color: colors.muted },
});
