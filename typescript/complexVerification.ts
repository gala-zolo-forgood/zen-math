import { ComplexNumber } from './complexNumbers';

console.log('=== Complex Number Interactive Verification ===\n');

// Create example complex numbers
console.log('1. Creating Complex Numbers (Cartesian Form):');
const z1 = new ComplexNumber(3, 4);
const z2 = new ComplexNumber(1, 2);
const z3 = new ComplexNumber(5);
const z4 = new ComplexNumber(0, 3);
console.log(`   z1 = ${z1}`);
console.log(`   z2 = ${z2}`);
console.log(`   z3 = ${z3}`);
console.log(`   z4 = ${z4}`);

// Arithmetic operations
console.log('\n2. Arithmetic Operations:');
console.log(`   z1 + z2 = ${z1.add(z2)}`);
console.log(`   z1 - z2 = ${z1.subtract(z2)}`);
console.log(`   z1 * z2 = ${z1.multiply(z2)}`);
console.log(`   z1 / z2 = ${z1.divide(z2)}`);

// Properties
console.log('\n3. Properties:');
console.log(`   |z1| (magnitude) = ${z1.magnitude()}`);
console.log(`   arg(z1) (phase) = ${z1.phase()} radians`);
console.log(`   conj(z1) (conjugate) = ${z1.conjugate()}`);

// Polar form
console.log('\n4. Polar Form:');
const polar = z1.toPolar();
console.log(`   z1 in polar form: magnitude = ${polar.magnitude}, phase = ${polar.phase} radians`);

const z5 = ComplexNumber.fromPolar(5, Math.PI / 4);
console.log(`   Created from polar (r=5, θ=π/4): ${z5}`);
console.log(`   Verification: magnitude = ${z5.magnitude()}, phase = ${z5.phase()}`);

// String formatting edge cases
console.log('\n5. String Formatting Edge Cases:');
console.log(`   Zero: ${new ComplexNumber(0, 0)}`);
console.log(`   Pure real: ${new ComplexNumber(7, 0)}`);
console.log(`   Pure imaginary: ${new ComplexNumber(0, 5)}`);
console.log(`   Imaginary = 1: ${new ComplexNumber(3, 1)}`);
console.log(`   Imaginary = -1: ${new ComplexNumber(3, -1)}`);
console.log(`   Just i: ${new ComplexNumber(0, 1)}`);
console.log(`   Just -i: ${new ComplexNumber(0, -1)}`);
console.log(`   Negative imaginary: ${new ComplexNumber(3, -4)}`);

// Mathematical identities
console.log('\n6. Mathematical Identity Verification:');
const a = new ComplexNumber(2, 3);
const b = new ComplexNumber(4, -1);

// z * conj(z) = |z|²
const product = a.multiply(a.conjugate());
const magSquared = a.magnitude() * a.magnitude();
console.log(`   z * conj(z) = ${product}`);
console.log(`   |z|² = ${magSquared}`);
console.log(`   Real part of z * conj(z) ≈ |z|²: ${Math.abs(product.getReal() - magSquared) < 1e-10}`);

// (a/b)*b ≈ a
const quotient = a.divide(b);
const result = quotient.multiply(b);
console.log(`   (a/b)*b = ${result}`);
console.log(`   a = ${a}`);
console.log(`   Approximately equal: ${Math.abs(result.getReal() - a.getReal()) < 1e-10 && Math.abs(result.getImaginary() - a.getImaginary()) < 1e-10}`);

// Round-trip polar conversion
const original = new ComplexNumber(3, 4);
const polarForm = original.toPolar();
const backToCartesian = ComplexNumber.fromPolar(polarForm.magnitude, polarForm.phase);
console.log(`   Original: ${original}`);
console.log(`   After polar round-trip: ${backToCartesian}`);
console.log(`   Approximately equal: ${Math.abs(backToCartesian.getReal() - original.getReal()) < 1e-10 && Math.abs(backToCartesian.getImaginary() - original.getImaginary()) < 1e-10}`);

// Error handling
console.log('\n7. Error Handling:');
try {
  const invalid = new ComplexNumber(NaN, 5);
  console.log(`   ✗ Should have thrown error for NaN`);
} catch (e) {
  console.log(`   ✓ Caught error for NaN: ${(e as Error).message}`);
}

try {
  const zero = new ComplexNumber(0, 0);
  const shouldFail = z1.divide(zero);
  console.log(`   ✗ Should have thrown error for division by zero`);
} catch (e) {
  console.log(`   ✓ Caught error for division by zero: ${(e as Error).message}`);
}

console.log('\n=== Verification Complete ===');
