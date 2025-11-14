export class ComplexNumber {
  private readonly real: number;
  private readonly imag: number;

  constructor(real: number, imaginary: number = 0) {
    if (typeof real !== 'number' || !isFinite(real)) {
      throw new Error("Real part must be a finite number");
    }
    if (typeof imaginary !== 'number' || !isFinite(imaginary)) {
      throw new Error("Imaginary part must be a finite number");
    }

    this.real = real;
    this.imag = imaginary;
  }

  getReal(): number {
    return this.real;
  }

  getImaginary(): number {
    return this.imag;
  }

  toString(): string {
    return `${this.real}+${this.imag}i`;
  }
}
