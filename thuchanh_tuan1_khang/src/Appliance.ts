/**
 * Bài 24: Lớp trừu tượng Appliance (thiết bị điện) với phương thức turnOn().
 */
export abstract class Appliance {
  protected name: string
  protected isOn = false // trạng thái bật/tắt, mặc định là tắt

  constructor(name: string) {
    this.name = name
  }

  /** Lớp con bắt buộc phải cài đặt cách bật riêng của mình. */
  abstract turnOn(): void

  /** Tắt thiết bị - code dùng chung cho mọi lớp con. */
  turnOff(): void {
    this.isOn = false
    console.log(`${this.name} đã tắt.`)
  }

  showStatus(): void {
    console.log(`${this.name}: ${this.isOn ? 'ĐANG BẬT' : 'đang tắt'}`)
  }
}

/** Quạt: bật kèm mức gió. */
export class Fan extends Appliance {
  private speed: number

  constructor(speed: number = 1) {
    super('Quạt')
    this.speed = speed
  }

  override turnOn(): void {
    this.isOn = true
    console.log(`${this.name} bật ở mức gió ${this.speed}.`)
  }
}

/** Máy lạnh: bật kèm nhiệt độ cài đặt. */
export class AirConditioner extends Appliance {
  private temperature: number

  constructor(temperature: number = 25) {
    super('Máy lạnh')
    this.temperature = temperature
  }

  override turnOn(): void {
    this.isOn = true
    console.log(`${this.name} bật ở ${this.temperature}°C.`)
  }

  /** Phương thức riêng của máy lạnh. */
  setTemperature(temp: number): void {
    this.temperature = temp
    console.log(`Đã chỉnh nhiệt độ về ${temp}°C.`)
  }
}
