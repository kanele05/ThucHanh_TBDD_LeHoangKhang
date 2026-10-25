import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, figma, figmaShadow, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");     // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} contentFit="cover" />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}{"\n"}{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked && (
            <>
              <Text style={styles.small}>Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text></Text>
              <Text style={styles.small}>Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text></Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <SafeAreaView style={styles.body} edges={["bottom"]}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable key={key} onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }]} />
          ))}
        </View>
        {/* TODO 4: nút XONG */}
        <Pressable style={styles.doneBtn} onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

// Số đo theo frame Figma 360×640 (Screen 2 / Screen 3)
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", height: 149 },
  thumb: { width: 114, height: 130, marginLeft: 2, marginTop: 7 },
  headerText: { flex: 1, marginLeft: 19, paddingTop: 17, gap: 9 },
  small: { fontSize: 15, color: figma.black },
  bold: { fontWeight: "700" },
  price: { fontSize: 18, fontWeight: "700", color: figma.black },
  body: { flex: 1, backgroundColor: colors.grey, paddingHorizontal: 17, paddingTop: 10 },
  hint: { fontSize: 18, color: figma.black },
  swatches: { flex: 1, alignItems: "center", gap: 13, paddingTop: 13 },
  swatch: { width: 85, height: 80, ...figmaShadow },
  doneBtn: { height: 44, borderRadius: 10, borderWidth: 1, borderColor: figma.btnBorder, backgroundColor: figma.done,
    alignItems: "center", justifyContent: "center", marginBottom: 10, ...figmaShadow },
  doneText: { color: figma.btnText, fontSize: 20, fontWeight: "700" },
});
