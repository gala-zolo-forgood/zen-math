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

  static fromPolar(magnitude: number, phase: number): ComplexNumber {
    if (typeof magnitude !== 'number' || !isFinite(magnitude)) {
      throw new Error("Magnitude must be a finite number");
    }
    if (typeof phase !== 'number' || !isFinite(phase)) {
      throw new Error("Phase must be a finite number");
    }

    const real = magnitude * Math.cos(phase);
    const imag = magnitude * Math.sin(phase);
    return new ComplexNumber(real, imag);
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

  magnitude(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }

  phase(): number {
    return Math.atan2(this.imag, this.real);
  }

  toPolar(): { magnitude: number; phase: number } {
    return {
      magnitude: this.magnitude(),
      phase: this.phase()
    };
  }

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real + other.real,
      this.imag + other.imag
    );
  }

  subtract(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(
      this.real - other.real,
      this.imag - other.imag
    );
  }

  multiply(other: ComplexNumber): ComplexNumber {
    const realPart = this.real * other.real - this.imag * other.imag;
    const imagPart = this.real * other.imag + this.imag * other.real;
    return new ComplexNumber(realPart, imagPart);
  }

  divide(other: ComplexNumber): ComplexNumber {
    const denominator = other.real * other.real + other.imag * other.imag;

    if (denominator === 0) {
      throw new Error("Division by zero complex number");
    }

    const realPart = (this.real * other.real + this.imag * other.imag) / denominator;
    const imagPart = (this.imag * other.real - this.real * other.imag) / denominator;
    return new ComplexNumber(realPart, imagPart);
  }
}
