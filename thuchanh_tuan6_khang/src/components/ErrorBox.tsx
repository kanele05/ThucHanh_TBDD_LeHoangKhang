import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", color: colors.text },
  message: { marginTop: 8, color: colors.muted, textAlign: "center" },
  btn: { marginTop: 20, backgroundColor: colors.red, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 32 },
  btnText: { color: "#fff", fontWeight: "700" },
});
