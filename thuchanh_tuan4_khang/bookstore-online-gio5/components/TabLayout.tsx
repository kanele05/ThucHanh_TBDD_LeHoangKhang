// GIỜ 5 — Bố cục dùng chung: [nội dung màn hình đang chọn] + [Tab Bar dưới cùng]
//
// ==== SO SÁNH 2 CÁCH ĐẶT TAB BAR ==== (đổi TAB_BAR_MODE để chạy thử cả 2)
//
//  'static'   — Tab bar là con CUỐI của View flex:1, nằm NGOÀI ScrollView, nằm trong
//               luồng layout bình thường. Nội dung (flex:1) tự co lại, kết thúc ngay
//               trên tab bar -> KHÔNG cần tính paddingBottom, không thể bị che.
//               => Dùng mặc định cho hầu hết ứng dụng: đơn giản, an toàn.
//
//  'absolute' — Tab bar position:'absolute' neo đáy, NỔI ĐÈ lên nội dung. Nội dung
//               kéo dài tới tận đáy màn hình (cuộn được xuống bên dưới tab bar), nên
//               MỖI màn hình phải tự chừa paddingBottom = chiều cao tab bar (TAB_BAR_SPACE),
//               kể cả nút nổi và thanh cố định (vd. thanh tổng tiền giỏ hàng) cũng phải
//               nâng lên, nếu không phần tử cuối sẽ bị che mất.
//               => Dùng khi cần hiệu ứng: tab bar trong suốt/mờ thấy nội dung phía sau,
//               tab bar dạng "viên thuốc" nổi cách mép, hoặc ẩn/hiện tab bar khi cuộn
//               mà không làm nội dung nhảy layout.
import React from "react";
import { View, StyleSheet } from "react-native";
import { TabBar, TabKey, TAB_BAR_HEIGHT } from "./TabBar";

type TabBarMode = "static" | "absolute";
const TAB_BAR_MODE = "static" as TabBarMode;

// Khoảng trống các màn hình phải chừa ở đáy nội dung: chỉ cần khi tab bar là absolute.
export const TAB_BAR_SPACE = TAB_BAR_MODE === "absolute" ? TAB_BAR_HEIGHT : 0;

export function TabLayout({
  activeTab,
  onChangeTab,
  cartCount,
  children,
}: {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  cartCount: number;
  children: React.ReactNode;
}) {
  const isAbsolute = TAB_BAR_MODE === "absolute";

  return (
    // View flex:1 KHÔNG có padding -> làm containing block cho tab bar absolute,
    // để bottom:0 là mép trên vùng an toàn (SafeAreaView bên ngoài lo phần tai thỏ/home indicator).
    <View style={styles.root}>
      <View style={styles.content}>{children}</View>
      <TabBar
        activeTab={activeTab}
        onChangeTab={onChangeTab}
        cartCount={cartCount}
        style={isAbsolute ? styles.absoluteBar : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1, // chiếm hết chiều cao còn lại (static) hoặc toàn bộ chiều cao (absolute)
  },
  absoluteBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.92)", // hơi trong suốt -> thấy nội dung cuộn phía sau
  },
});
