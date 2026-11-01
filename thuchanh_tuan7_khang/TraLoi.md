# Trả lời câu hỏi bổ sung — Buổi 7 (BookStore)

## Câu 1. Cấu trúc điều hướng
**Vì sao BookDetail được đăng ký ở Stack mà không đặt trong Tab? Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?**

Trong `src/navigation/RootNavigator.tsx`, em đăng ký `BookDetail` (và `Checkout`) ở Stack, còn `TabNavigator` chỉ là một màn "Tabs" nằm trong Stack đó. Nhờ vậy khi bấm vào một cuốn sách, màn Chi tiết được đẩy lên phủ cả Tab Bar và tự có nút quay lại (←), đúng kiểu một màn "đi sâu vào". Nếu đặt vào Tab thì nó thành một tab riêng ngang hàng với Home, Danh mục, Giỏ hàng, Tài khoản: Tab Bar vẫn hiện, không có nút ← và tab đó cũng không có `bookId` cố định nên rất khó dùng.

## Câu 2. Redux
**Trong reducer viết `state.items.push(...)` mà sao state gốc không bị sửa trực tiếp? Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?**

Redux Toolkit dùng Immer, nên trong `addItem` của `cartSlice.ts` thì `state` thật ra chỉ là một bản nháp (draft); khi reducer chạy xong Immer mới tạo ra một state mới từ các thay đổi đó, còn state cũ vẫn giữ nguyên. Nếu bỏ `useMemo` trong `useCart` (`totalQuantity`, `totalPrice` trong `src/store/hooks.ts`) thì số hiển thị trên badge và tổng tiền vẫn đúng y như cũ. Hậu quả chỉ là hai phép `reduce` bị tính lại ở mỗi lần render, giỏ ít món thì không thấy gì, giỏ lớn mới tốn; `useMemo` ở đây chỉ để tối ưu chứ không quyết định đúng sai.

## Câu 3. Promise.all
**Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì? Tìm cách để vẫn hiện được danh sách sách (gợi ý: `Promise.allSettled`) và nói rõ cách đó phải đánh đổi gì.**

Trong `HomeScreen.tsx`, hàm `load` dùng `Promise.all([getBooks(), getCategories()])`, nên chỉ cần một request lỗi là cả nhóm bị reject, nhảy vào `catch` và Home hiện `ErrorView` kèm nút Thử lại dù sách đã tải được. Nếu đổi sang `Promise.allSettled` thì em kiểm tra `status` của từng kết quả: sách thành công thì `setBooks`, danh mục lỗi thì để mảng rỗng (chỉ thiếu hàng chip danh mục). Đánh đổi là code dài hơn và phải tự xử lý lỗi cho từng phần, ngoài ra người dùng có thể không biết danh mục đang bị thiếu nếu mình không báo gì thêm.

## Câu 4. Debounce
**Vì sao không đặt `setTimeout` thẳng trong `onChangeText`? Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?**

Nếu đặt `setTimeout` thẳng trong `onChangeText` thì mỗi ký tự gõ vào tạo ra một timer riêng và không có timer nào bị huỷ, nên gõ 10 ký tự vẫn gây ra 10 lần cập nhật/lọc (chỉ bị trễ đi chứ không được gộp lại). Trong `src/hooks/useDebounce.ts`, `useEffect` chạy lại mỗi khi `value` đổi và `return () => clearTimeout(t)` huỷ timer cũ trước khi đặt timer mới, nên chỉ lần gõ cuối cùng sau 400 ms mới được áp dụng. Hàm dọn dẹp cũng huỷ timer khi component bị unmount, tránh việc gọi `setDebounced` trên một component đã bị gỡ.

## Câu 5. Code bổ sung — sắp xếp "Giá tăng dần / giảm dần" cho Home
**Thêm tuỳ chọn sắp xếp "Giá tăng dần / giảm dần" cho Home.**

Trong `src/screens/HomeScreen.tsx`, em thêm một state `sort` có kiểu `'asc' | 'desc' | null` và sửa bên trong `useMemo` của `visibleBooks`: lọc xong bằng `filterBooks` rồi mới sắp xếp trên một bản sao (`[...filtered]`) để không làm đổi mảng `books` gốc. Có hai nút "Giá tăng dần ↑" / "Giá giảm dần ↓" nằm dưới bộ lọc giá, bấm lại nút đang chọn thì bỏ sắp xếp (về thứ tự mặc định). Em không đưa `sort` vào `hasFilter`/`clearFilters` vì sắp xếp chỉ đổi thứ tự hiển thị chứ không làm mất sách nào.

```tsx
const [sort, setSort] = useState<"asc" | "desc" | null>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (sort === null) return filtered;
  // Sắp xếp trên bản sao để không làm đổi mảng books gốc
  return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
}, [books, debouncedKeyword, categoryId, priceRange, sort]);

// Trong ListHeaderComponent: bấm lại nút đang chọn thì bỏ sắp xếp
<Pressable onPress={() => setSort(active ? null : o.key)} ... />
```

(Ảnh chụp màn hình: chèn ảnh tại đây)

---

## Phụ: giải thích thử thách BT7.C1
Màn `BookDetailScreen` chỉ gọi `const { isFavorite, toggle } = useWishlist()` trong `src/store/hooks.ts`, không biết gì về Redux hay `toggleWishlist`. Vì vậy nếu sau này đổi sang Recoil/Zustand thì chỉ cần sửa bên trong các hook ở `hooks.ts` (adapter), còn giao diện giữ nguyên.
