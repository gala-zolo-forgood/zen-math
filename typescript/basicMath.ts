export class BasicMath {
  static add(a: number, b: number): number {
    return a + b;
  }
  
  static subtract(a: number, b: number): number {
    return a - b;
  }
  
  static multiply(a: number, b: number): number {
    return a * b;
  }
  
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  }
  
  static power(base: number, exponent: number): number {
    if (exponent < 0) {
      throw new Error("Negative exponent not supported");
    }
    
    let result = 1;
    for (let i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  }
  
  static factorial(n: number): number {
    if (n < 0) {
      throw new Error("Factorial not defined for negative numbers");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
  
  static gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    
    return a;
  }
  
  static lcm(a: number, b: number): number {
    return Math.abs(a * b) / this.gcd(a, b);
  }
}