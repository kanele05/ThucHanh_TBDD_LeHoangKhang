import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./src/theme";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { USING_API } from "./src/api/phoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

const SelectPhoneLocal = () => <SelectPhoneApp phone={PHONES[0]} />;

type Lab = { key: string; title: string; desc: string; render?: () => React.ReactNode };

// Mỗi bài làm xong thì gắn component vào `render`.
const LABS: Lab[] = [
  { key: "ex1", title: "Bài 1", desc: "Select Phone: thông tin sản phẩm ↔ chọn màu",
    render: () => <SelectPhoneLocal /> },
  { key: "ex2", title: "Bài 2",
    desc: USING_API ? "Gắn API vào Bài 1 (đang dùng mockapi.io)" : "Gắn API vào Bài 1 (chưa đặt API → dữ liệu mẫu)",
    render: () => <SelectPhoneApi /> },
  { key: "ex3", title: "Bài 3", desc: "Bottom Tab: Home / Search / Profile",
    render: () => <BottomTabApp /> },
  { key: "ex4", title: "Bài 4", desc: "Stack + Tab + Passing Params",
    render: () => <StackTabApp /> },
  { key: "ex5", title: "Bài 5", desc: "Drawer: Home / Profile / Settings",
    render: () => <DrawerApp /> },
];

export default function App() {
  const [current, setCurrent] = useState<Lab | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {current?.render ? (
        <View style={styles.flex}>
          {current.render()}
          <Pressable style={styles.back} onPress={() => setCurrent(null)}>
            <Text style={styles.backText}>☰ Menu</Text>
          </Pressable>
        </View>
      ) : (
        <SafeAreaView style={styles.root}>
          <ScrollView contentContainerStyle={styles.list}>
            <Text style={styles.heading}>Lab 06 — Navigation</Text>
            {LABS.map((lab) => (
              <Pressable key={lab.key} style={[styles.card, !lab.render && styles.cardOff]}
                disabled={!lab.render} onPress={() => setCurrent(lab)}>
                <Text style={styles.cardTitle}>{lab.title}{!lab.render && " (chưa làm)"}</Text>
                <Text style={styles.cardDesc}>{lab.desc}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: colors.bg },
  list: { padding: 16, gap: 12 },
  heading: { fontSize: 22, fontWeight: "700", color: colors.navy, marginBottom: 4 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: colors.line },
  cardOff: { opacity: 0.5 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  cardDesc: { marginTop: 4, color: colors.muted },
  back: { position: "absolute", right: 12, bottom: 90, backgroundColor: colors.navy, borderRadius: 20,
    paddingVertical: 8, paddingHorizontal: 14, opacity: 0.85 },
  backText: { color: "#fff", fontWeight: "700" },
});
