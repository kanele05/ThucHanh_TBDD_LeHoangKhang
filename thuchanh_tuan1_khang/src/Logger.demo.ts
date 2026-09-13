/**
 * Demo Singleton Logger (Bài 17). Chạy `npm run dev`, mở Console (F12).
 */
import { Logger } from './Logger'

console.log('===== BÀI 17: SINGLETON LOGGER =====')

const logger = Logger.getInstance()
logger.log('Ứng dụng khởi động.')
logger.warn('Bộ nhớ sắp đầy.')
logger.error('Không kết nối được server.')

// const l = new Logger()   // ❌ lỗi ts(2673): constructor là private

// Lấy Logger ở chỗ khác vẫn ra ĐÚNG đối tượng cũ, không phải bản sao mới.
const logger2 = Logger.getInstance()
logger2.log('Ghi từ biến logger2.')

console.log('logger và logger2 là một?', logger === logger2) // true
console.log('Tổng số log đã ghi:', logger.getLogs().length) // 4 - dùng chung lịch sử
