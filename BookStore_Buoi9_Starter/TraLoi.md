# Trả lời câu hỏi bổ sung — Buổi 9

## 1. Giá trị dẫn xuất

`errors` và `valid` được suy ra hoàn toàn từ `name`, `phone`, `address` và số sản phẩm trong giỏ, nên tính lại mỗi lần render thì chúng luôn khớp với dữ liệu hiện tại. Nếu lưu bằng `useState` riêng, ta phải nhớ cập nhật chúng ở mọi chỗ gọi `setName`, `setPhone`, `setAddress` (và khi giỏ thay đổi); quên một chỗ là lỗi hiện sai hoặc nút "Xác nhận đặt hàng" mở/khoá sai. Ngoài ra còn tốn thêm một lần render vì `setState` trong `useEffect`.

## 2. Thứ tự gọi

Nếu `clear()` chạy trước `await createOrder(…)` mà mất mạng, giỏ đã bị xoá (cả trong store lẫn AsyncStorage) trong khi đơn chưa hề được tạo — người dùng mất hết hàng đã chọn và phải chọn lại từ đầu. Đặt `clear()` ngay sau `await createOrder(…)` là đúng vì dòng đó chỉ chạy khi server đã nhận đơn thành công; nếu lỗi, chương trình nhảy vào `catch` và giỏ được giữ nguyên để bấm thử lại.

## 3. PUT hay PATCH

`PUT /users/1` với `{ name, phone }` sẽ thay **toàn bộ** object, nên trong `db.json` user đó chỉ còn `{ id, name, phone }` — mất `email` và `password`, lần sau không đăng nhập được nữa. Bài này chọn `PATCH` vì PATCH chỉ đổi các trường được gửi lên, các trường khác giữ nguyên, phù hợp với form chỉ sửa một phần thông tin.

## 4. Cập nhật lạc quan

Nếu bỏ đoạn hoàn lại `read: false` trong `catch`, khi mất mạng giao diện vẫn báo "đã đọc" trong khi server vẫn lưu "chưa đọc"; lần sau mở lại màn Thông báo nó lại hiện chưa đọc, gây khó hiểu và dữ liệu hai bên không khớp.

- **Nên dùng** cho thao tác nhẹ, hiếm khi lỗi, sai cũng không nghiêm trọng: thả tim / bỏ tim sách yêu thích, đánh dấu đã đọc.
- **Không nên dùng** cho thanh toán / đặt hàng: phải chắc chắn server đã nhận đơn rồi mới báo thành công và xoá giỏ, nếu không người dùng tưởng đã đặt mà thực ra chưa.

## 5. Code bổ sung: bộ lọc trạng thái ở màn Đơn hàng

Đã làm trong `src/screens/OrdersScreen.tsx`:

```tsx
type StatusFilter = "all" | OrderStatus;
const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

// chỉ sửa dữ liệu truyền cho FlatList, không gọi lại API
const visibleOrders = orders.filter((o) => statusFilter === "all" || o.status === statusFilter);

<FlatList
  data={visibleOrders}
  ListHeaderComponent={/* hàng nút: Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã huỷ */}
  …
/>
```

- Hàng nút dạng chip (giống `CategoryChips`), nút đang chọn có nền indigo.
- Lọc ra rỗng thì hiện "Không có đơn nào ở trạng thái này" kèm nút "Xem tất cả"; chưa có đơn nào thì vẫn hiện trạng thái rỗng "Bạn chưa có đơn hàng nào".

Ảnh chụp màn hình: _(chèn ảnh màn Đơn hàng khi chọn bộ lọc vào đây)_

---

## Ghi chú nộp bài

- Đã làm: Bài 9.1 → 9.8, câu hỏi bổ sung 1–5.
- Thêm: nút "↻ Làm mới" chỉ hiện trên bản web (vì web không kéo-để-làm-mới được), gọi cùng hàm `onRefresh` của Bài 9.6.
- Thử thách BT9.C1 (Mua lại): **đã làm** — nút "🔁 Mua lại" trong thẻ đơn đã hoàn tất; gọi `getBooks()` lấy giá/tồn kho mới nhất, cùng sách thì cộng dồn số lượng (không vượt tồn kho), rồi chuyển sang tab Giỏ.
- Dọn code: xoá `src/data/mockBooks.ts` (dữ liệu giả không còn dùng) và `src/components/TodoBox.tsx` (khung TODO không còn dùng).
