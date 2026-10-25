import React, { createContext, useContext, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// TODO 3 (nâng cao): đưa notify/dark lên Context để mọi màn đọc được
type Settings = { notify: boolean; setNotify: (v: boolean) => void; dark: boolean; setDark: (v: boolean) => void };
const SettingsContext = createContext<Settings | null>(null);

function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong <SettingsContext.Provider>");
  return ctx;
}

// Màu nền/chữ theo chế độ sáng/tối
function usePalette() {
  const { dark } = useSettings();
  return dark
    ? { bg: "#121417", card: "#1E2228", text: "#F2F3F5", muted: "#9AA1AC", line: "#2C323A" }
    : { bg: colors.bg, card: "#fff", text: colors.text, muted: colors.muted, line: colors.line };
}

function HomeScreen() {
  const p = usePalette();
  return <View style={[s.center, { backgroundColor: p.bg }]}><Text style={[s.big, { color: p.text }]}>Xin chào 👋</Text></View>;
}

function ProfileScreen() {
  const p = usePalette();
  return (
    <View style={[s.center, { backgroundColor: p.bg }]}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={[s.big, { color: p.text }]}>Nguyễn Văn An</Text>
      <Text style={[s.muted, { color: p.muted }]}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1: 2 Switch + dòng trạng thái
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const p = usePalette();
  return (
    <View style={[s.root, { backgroundColor: p.bg }]}>
      <View style={[s.card, { backgroundColor: p.card, borderColor: p.line }]}>
        <View style={s.row}>
          <Text style={[s.label, { color: p.text }]}>Nhận thông báo</Text>
          <Switch value={notify} onValueChange={setNotify} trackColor={{ true: colors.red }} />
        </View>
        <View style={[s.divider, { backgroundColor: p.line }]} />
        <View style={s.row}>
          <Text style={[s.label, { color: p.text }]}>Chế độ tối</Text>
          <Switch value={dark} onValueChange={setDark} trackColor={{ true: colors.red }} />
        </View>
      </View>
      <Text style={[s.status, { color: p.muted }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// TODO 2: Drawer.Navigator với icon + màu đỏ cho mục đang chọn
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const settings = useMemo(() => ({ notify, setNotify, dark, setDark }), [notify, dark]);

  return (
    <SettingsContext.Provider value={settings}>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
        <Drawer.Navigator screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
        })}>
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  big: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  muted: { fontSize: 15, marginTop: 4 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy,
    alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#fff", fontSize: 34, fontWeight: "700" },
  card: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 56 },
  label: { fontSize: 16 },
  divider: { height: StyleSheet.hairlineWidth },
  status: { marginTop: 16, fontSize: 15, textAlign: "center" },
});
