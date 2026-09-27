// GIỜ 5 — Bài tập 1: Thanh Tab Bar dưới cùng (giao diện tĩnh, chưa dùng thư viện
// navigation thật — chỉ chuyển màn bằng useState ở App.tsx, đúng yêu cầu tài liệu).
//
// ─────────────────────────────────────────────────────────────────────────────
// SO SÁNH 2 CÁCH "cố định" TabBar ở đáy màn hình — bật/tắt bằng USE_ABSOLUTE_TAB_BAR
// bên dưới để tự trải nghiệm cả 2 (đổi true/false rồi reload app):
//
// 1) position: 'absolute' (bottom/left/right: 0), nằm CHỒNG lên nội dung phía trên:
//    - Ưu điểm: TabBar luôn "nổi" đúng vị trí đáy màn hình bất kể nội dung bên trên
//      là ScrollView, danh sách rỗng, hay màn hình bị lỗi layout — vì nó không phụ
//      thuộc vào flex của các phần tử khác, thoát khỏi luồng (flow) bình thường.
//    - Nhược điểm: PHẢI tự chừa khoảng trống (paddingBottom/marginBottom) cho phần
//      tử cuối cùng của nội dung phía trên, nếu không TabBar sẽ ĐÈ lên nó. Ở đây
//      dùng chung hằng số TAB_BAR_HEIGHT để tránh "magic number" bị lặp ở nhiều
//      file (xem CartScreen.tsx).
//    - Dùng khi: có nhiều màn hình khác nhau cùng dùng chung 1 TabBar, muốn code
//      TabBar 1 lần duy nhất ở component gốc (App.tsx) và không phải lo từng màn
//      hình con có bố cục ra sao.
//
// 2) Đặt CỐ ĐỊNH ngoài ScrollView theo flex bình thường (không absolute):
//    - Ưu điểm: đơn giản, không cần tính paddingBottom bù trừ — vì TabBar là 1
//      phần tử THẬT trong cây flex (flexDirection: 'column' mặc định của View),
//      đứng sau khối nội dung flex:1, nên tự động không bao giờ bị chồng lấp.
//    - Nhược điểm: nội dung phía trên BẮT BUỘC phải có flex:1 (hoặc chiều cao xác
//      định) thì TabBar mới bị "đẩy" xuống đúng đáy; nếu quên flex:1, TabBar có
//      thể bị đẩy lên giữa màn hình hoặc mất hẳn nếu nội dung tràn.
//    - Dùng khi: chỉ có 1 cấu trúc màn hình cố định (như bài tập này), muốn tránh
//      phải nhớ cộng trừ paddingBottom thủ công.
//
// => Cả 2 cách đều tạo ra kết quả HIỂN THỊ giống nhau, khác nhau ở cách layout
// engine tính toán. Đổi USE_ABSOLUTE_TAB_BAR để thấy code ở CartScreen.tsx tự
// thích ứng (marginBottom của thanh tổng tiền chỉ cần cộng thêm khi TabBar là
// absolute, vì lúc đó TabBar không còn chiếm chỗ thật trong luồng flex nữa).
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export type TabKey = "home" | "category" | "cart" | "account";

// Đổi true/false để thử 2 cách canh TabBar đã so sánh ở trên.
export const USE_ABSOLUTE_TAB_BAR = true;

// Chiều cao TabBar dùng CHUNG cho cả TabBar.tsx và CartScreen.tsx, tránh lặp lại
// "số ma thuật" (magic number) 64 ở nhiều nơi -> đổi 1 chỗ là đồng bộ toàn app.
export const TAB_BAR_HEIGHT = 64;

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "home", label: "Trang chủ", icon: "🏠" },
  { key: "category", label: "Danh mục", icon: "📂" },
  { key: "cart", label: "Giỏ hàng", icon: "🛒" },
  { key: "account", label: "Tài khoản", icon: "👤" },
];

export function TabBar({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) {
  return (
    <View style={[styles.bar, USE_ABSOLUTE_TAB_BAR ? styles.barAbsolute : styles.barStatic]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem} // flex:1 -> 4 mục chia đều bằng nhau theo chiều ngang
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row", // 4 mục xếp ngang
    height: TAB_BAR_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  // Cách 1: thoát luồng flex, tự neo vào đáy container gần nhất có position khác 'static'.
  barAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Cách 2: vẫn nằm trong luồng flex bình thường (không cần left/right/bottom),
  // chỉ cần đứng SAU phần tử flex:1 trong cùng 1 View flexDirection:'column'.
  barStatic: {
    position: "relative",
  },
  tabItem: {
    flex: 1, // chia đều 1/4 bề rộng cho mỗi mục, không cần tính width tay
    flexDirection: "column", // icon trên, chữ dưới
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  icon: {
    fontSize: 18,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  labelActive: {
    color: "#4338CA", // màu nổi bật cho mục đang chọn
    fontWeight: "700",
  },
});
