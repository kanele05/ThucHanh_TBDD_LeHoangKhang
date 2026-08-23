/**
 * Bài 5: Lớp BankAccount - tài khoản ngân hàng với các thao tác nạp/rút tiền.
 */
export class BankAccount {
  protected owner: string // tên chủ tài khoản
  private balance: number // số dư - để private để bên ngoài không sửa trực tiếp

  constructor(owner: string, balance: number = 0) {
    this.owner = owner
    // Không cho phép mở tài khoản với số dư âm.
    this.balance = balance > 0 ? balance : 0
  }

  /** Nạp tiền vào tài khoản. Trả về true nếu nạp thành công. */
  deposit(amount: number): boolean {
    // Số tiền nạp phải lớn hơn 0.
    if (amount <= 0) {
      console.log('Lỗi: số tiền nạp phải lớn hơn 0.')
      return false
    }
    this.balance += amount
    console.log(`Nạp ${this.format(amount)} thành công. Số dư: ${this.format(this.balance)}`)
    return true
  }

  /** Rút tiền khỏi tài khoản. Trả về true nếu rút thành công. */
  withdraw(amount: number): boolean {
    if (amount <= 0) {
      console.log('Lỗi: số tiền rút phải lớn hơn 0.')
      return false
    }
    // Không cho rút quá số dư hiện có.
    if (amount > this.balance) {
      console.log(`Lỗi: số dư không đủ (hiện có ${this.format(this.balance)}).`)
      return false
    }
    this.balance -= amount
    console.log(`Rút ${this.format(amount)} thành công. Số dư: ${this.format(this.balance)}`)
    return true
  }

  /** Lấy số dư hiện tại (chỉ đọc, không sửa được từ bên ngoài). */
  getBalance(): number {
    return this.balance
  }

  /** Hiển thị thông tin tài khoản. */
  showInfo(): void {
    console.log(`Chủ TK: ${this.owner} | Số dư: ${this.format(this.balance)}`)
  }

  /** Định dạng số tiền theo kiểu Việt Nam, vd: 1.000.000 đ */
  private format(amount: number): string {
    return `${amount.toLocaleString('vi-VN')} đ`
  }
}
