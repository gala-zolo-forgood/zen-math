/**
 * Test harness for ComplexNumber class
 * Provides assertion helpers and test runner with color-coded output
 */

import { ComplexNumber } from './complexNumbers';

// Declare process as global (for Node.js environment)
declare const process: any;

// ANSI color codes for terminal output
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Test statistics
let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

/**
 * Assert helper - throws on failure
 */
function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Assert helper for floating-point comparisons
 */
function assertClose(actual: number, expected: number, tolerance: number = 1e-10, message?: string): void {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    throw new Error(
      message ||
      `Expected ${actual} to be close to ${expected} (diff: ${diff}, tolerance: ${tolerance})`
    );
  }
}

/**
 * Run a single test with error handling
 */
function runTest(name: string, testFn: () => void): void {
  testsRun++;
  try {
    testFn();
    testsPassed++;
    console.log(`${COLORS.green}✓ PASS${COLORS.reset} ${name}`);
  } catch (error) {
    testsFailed++;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`${COLORS.red}✗ FAIL${COLORS.reset} ${name}`);
    console.log(`  ${COLORS.red}${errorMessage}${COLORS.reset}`);
  }
}

/**
 * Print test summary
 */
function printSummary(): void {
  const separator = '============================================================';
  console.log('\n' + separator);
  console.log(`${COLORS.blue}Test Summary${COLORS.reset}`);
  console.log(separator);
  console.log(`Total:  ${testsRun}`);
  console.log(`${COLORS.green}Passed: ${testsPassed}${COLORS.reset}`);
  if (testsFailed > 0) {
    console.log(`${COLORS.red}Failed: ${testsFailed}${COLORS.reset}`);
  } else {
    console.log(`Failed: ${testsFailed}`);
  }
  console.log(separator);

  if (testsFailed === 0) {
    console.log(`${COLORS.green}All tests passed!${COLORS.reset}\n`);
  } else {
    console.log(`${COLORS.red}Some tests failed.${COLORS.reset}\n`);
  }
}

/**
 * Main test runner
 */
function main(): void {
  console.log(`${COLORS.blue}Running ComplexNumber Tests${COLORS.reset}\n`);

  // Phase 1: Test Infrastructure Verification
  console.log(`${COLORS.yellow}Phase 1: Test Infrastructure${COLORS.reset}`);

  runTest('assert helper works for true condition', () => {
    assert(true, 'This should not throw');
  });

  runTest('assert helper throws for false condition', () => {
    let threw = false;
    try {
      assert(false, 'Expected failure');
    } catch (e) {
      threw = true;
    }
    assert(threw, 'assert should have thrown');
  });

  runTest('assertClose accepts values within tolerance', () => {
    assertClose(1.0000000001, 1.0, 1e-9);
  });

  runTest('assertClose rejects values outside tolerance', () => {
    let threw = false;
    try {
      assertClose(1.1, 1.0, 1e-10);
    } catch (e) {
      threw = true;
    }
    assert(threw, 'assertClose should have thrown');
  });

  // Phase 2: Core ComplexNumber Class with Cartesian Construction
  console.log(`\n${COLORS.yellow}Phase 2: Core ComplexNumber Class${COLORS.reset}`);

  // Test 1: Valid construction with both parameters
  runTest('Valid construction: new ComplexNumber(3, 4)', () => {
    const z = new ComplexNumber(3, 4);
    assert(z.getReal() === 3, 'Real part should be 3');
    assert(z.getImaginary() === 4, 'Imaginary part should be 4');
  });

  // Test 2: Optional imaginary parameter (defaults to 0)
  runTest('Optional imaginary: new ComplexNumber(5)', () => {
    const z = new ComplexNumber(5);
    assert(z.getReal() === 5, 'Real part should be 5');
    assert(z.getImaginary() === 0, 'Imaginary part should default to 0');
  });

  // Test 3: Accessor methods
  runTest('Accessor methods: getReal() and getImaginary()', () => {
    const z = new ComplexNumber(7, -3);
    assert(z.getReal() === 7, 'getReal() should return 7');
    assert(z.getImaginary() === -3, 'getImaginary() should return -3');
  });

  // Test 4: Invalid input - real part is NaN
  runTest('Invalid input: NaN for real part', () => {
    let errorThrown = false;
    try {
      new ComplexNumber(NaN, 5);
    } catch (error) {
      errorThrown = true;
      assert(error instanceof Error, 'Should throw an Error');
      assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
    }
    assert(errorThrown, 'Should have thrown an error');
  });

  // Test 5: Invalid input - imaginary part is NaN
  runTest('Invalid input: NaN for imaginary part', () => {
    let errorThrown = false;
    try {
      new ComplexNumber(5, NaN);
    } catch (error) {
      errorThrown = true;
      assert(error instanceof Error, 'Should throw an Error');
      assert(error.message === 'Imaginary part must be a finite number', 'Should have correct error message');
    }
    assert(errorThrown, 'Should have thrown an error');
  });

  // Test 6: Invalid input - real part is Infinity
  runTest('Invalid input: Infinity for real part', () => {
    let errorThrown = false;
    try {
      new ComplexNumber(Infinity, 5);
    } catch (error) {
      errorThrown = true;
      assert(error instanceof Error, 'Should throw an Error');
      assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
    }
    assert(errorThrown, 'Should have thrown an error');
  });

  // Test 7: Invalid input - imaginary part is Infinity
  runTest('Invalid input: Infinity for imaginary part', () => {
    let errorThrown = false;
    try {
      new ComplexNumber(5, Infinity);
    } catch (error) {
      errorThrown = true;
      assert(error instanceof Error, 'Should throw an Error');
      assert(error.message === 'Imaginary part must be a finite number', 'Should have correct error message');
    }
    assert(errorThrown, 'Should have thrown an error');
  });

  // Test 8: Invalid input - real part is -Infinity
  runTest('Invalid input: -Infinity for real part', () => {
    let errorThrown = false;
    try {
      new ComplexNumber(-Infinity, 5);
    } catch (error) {
      errorThrown = true;
      assert(error instanceof Error, 'Should throw an Error');
      assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
    }
    assert(errorThrown, 'Should have thrown an error');
  });

  // Test 9: Basic toString output
  runTest('Basic toString output', () => {
    const z = new ComplexNumber(3, 4);
    const str = z.toString();
    assert(typeof str === 'string', 'toString() should return a string');
    assert(str === '3+4i', "toString() should return '3+4i'");
  });

  // Test 10: Zero complex number
  runTest('Zero complex number: new ComplexNumber(0, 0)', () => {
    const z = new ComplexNumber(0, 0);
    assert(z.getReal() === 0, 'Real part should be 0');
    assert(z.getImaginary() === 0, 'Imaginary part should be 0');
  });

  // Test 11: Negative values
  runTest('Negative values: new ComplexNumber(-2, -5)', () => {
    const z = new ComplexNumber(-2, -5);
    assert(z.getReal() === -2, 'Real part should be -2');
    assert(z.getImaginary() === -5, 'Imaginary part should be -5');
  });

  // Phase 3: Addition and Subtraction Tests
  console.log(`\n${COLORS.yellow}Phase 3: Addition and Subtraction${COLORS.reset}`);

  runTest('Addition: (3+4i) + (1+2i) = (4+6i)', () => {
    const z1 = new ComplexNumber(3, 4);
    const z2 = new ComplexNumber(1, 2);
    const result = z1.add(z2);
    assert(result.getReal() === 4, 'Real part should be 4');
    assert(result.getImaginary() === 6, 'Imaginary part should be 6');
  });

  runTest('Subtraction: (5+3i) - (2+1i) = (3+2i)', () => {
    const z1 = new ComplexNumber(5, 3);
    const z2 = new ComplexNumber(2, 1);
    const result = z1.subtract(z2);
    assert(result.getReal() === 3, 'Real part should be 3');
    assert(result.getImaginary() === 2, 'Imaginary part should be 2');
  });

  runTest('Identity: z + 0 = z', () => {
    const z = new ComplexNumber(3, 4);
    const zero = new ComplexNumber(0, 0);
    const result = z.add(zero);
    assert(result.getReal() === 3, 'Real part should be 3');
    assert(result.getImaginary() === 4, 'Imaginary part should be 4');
  });

  runTest('Commutativity: z1 + z2 = z2 + z1', () => {
    const z1 = new ComplexNumber(2, 3);
    const z2 = new ComplexNumber(5, 7);
    const r1 = z1.add(z2);
    const r2 = z2.add(z1);
    assert(r1.getReal() === r2.getReal(), 'Real parts should be equal');
    assert(r1.getImaginary() === r2.getImaginary(), 'Imaginary parts should be equal');
  });

  runTest('Immutability: original objects unchanged after addition', () => {
    const z1 = new ComplexNumber(3, 4);
    const z2 = new ComplexNumber(1, 2);
    z1.add(z2);
    assert(z1.getReal() === 3, 'z1 real part should be unchanged');
    assert(z1.getImaginary() === 4, 'z1 imaginary part should be unchanged');
    assert(z2.getReal() === 1, 'z2 real part should be unchanged');
    assert(z2.getImaginary() === 2, 'z2 imaginary part should be unchanged');
  });

  // Phase 4: Multiplication and Division Tests
  console.log(`\n${COLORS.yellow}Phase 4: Multiplication and Division${COLORS.reset}`);

  runTest('Multiplication: (1+2i) * (3+4i) = (-5+10i)', () => {
    const z1 = new ComplexNumber(1, 2);
    const z2 = new ComplexNumber(3, 4);
    const result = z1.multiply(z2);
    assert(result.getReal() === -5, 'Real part should be -5');
    assert(result.getImaginary() === 10, 'Imaginary part should be 10');
  });

  runTest('Division: (6+8i) / (1+1i) = (7+1i)', () => {
    const z1 = new ComplexNumber(6, 8);
    const z2 = new ComplexNumber(1, 1);
    const result = z1.divide(z2);
    assert(result.getReal() === 7, 'Real part should be 7');
    assert(result.getImaginary() === 1, 'Imaginary part should be 1');
  });

  runTest('Identity: z * 1 = z', () => {
    const z = new ComplexNumber(3, 4);
    const one = new ComplexNumber(1, 0);
    const result = z.multiply(one);
    assert(result.getReal() === 3, 'Real part should be 3');
    assert(result.getImaginary() === 4, 'Imaginary part should be 4');
  });

  runTest('Division by self: z / z = 1 (for non-zero z)', () => {
    const z = new ComplexNumber(3, 4);
    const result = z.divide(z);
    assertClose(result.getReal(), 1, 1e-10, 'Real part should be 1');
    assertClose(result.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
  });

  runTest('Division by zero: throws error', () => {
    const z = new ComplexNumber(1, 2);
    const zero = new ComplexNumber(0, 0);
    let threw = false;
    let errorMessage = '';
    try {
      z.divide(zero);
    } catch (e) {
      threw = true;
      errorMessage = e instanceof Error ? e.message : String(e);
    }
    assert(threw, 'Should throw error on division by zero');
    assert(errorMessage === 'Division by zero complex number', 'Error message should match');
  });

  runTest('Verify: (a/b)*b ≈ a (within floating-point tolerance)', () => {
    const a = new ComplexNumber(5, 7);
    const b = new ComplexNumber(3, 4);
    const result = a.divide(b).multiply(b);
    assertClose(result.getReal(), a.getReal(), 1e-10, 'Real parts should match');
    assertClose(result.getImaginary(), a.getImaginary(), 1e-10, 'Imaginary parts should match');
  });

  // Phase 5: Properties and Derived Values
  console.log(`\n${COLORS.yellow}Phase 5: Properties and Derived Values${COLORS.reset}`);

  runTest('Magnitude: |3+4i| = 5', () => {
    const z = new ComplexNumber(3, 4);
    const mag = z.magnitude();
    assertClose(mag, 5, 1e-10, 'Magnitude of 3+4i should be 5');
  });

  runTest('Magnitude: |1+1i| = √2 ≈ 1.414', () => {
    const z = new ComplexNumber(1, 1);
    const mag = z.magnitude();
    assertClose(mag, Math.sqrt(2), 1e-10, 'Magnitude of 1+1i should be √2');
  });

  runTest('Phase: arg(1+1i) = π/4 ≈ 0.785', () => {
    const z = new ComplexNumber(1, 1);
    const phase = z.phase();
    assertClose(phase, Math.PI / 4, 1e-10, 'Phase of 1+1i should be π/4');
  });

  runTest('Phase: arg(1+0i) = 0', () => {
    const z = new ComplexNumber(1, 0);
    const phase = z.phase();
    assertClose(phase, 0, 1e-10, 'Phase of 1+0i should be 0');
  });

  runTest('Phase: arg(0+1i) = π/2', () => {
    const z = new ComplexNumber(0, 1);
    const phase = z.phase();
    assertClose(phase, Math.PI / 2, 1e-10, 'Phase of 0+1i should be π/2');
  });

  runTest('Conjugate: conj(3+4i) = 3-4i', () => {
    const z = new ComplexNumber(3, 4);
    const conj = z.conjugate();
    assert(conj.getReal() === 3, 'Real part of conjugate should be 3');
    assert(conj.getImaginary() === -4, 'Imaginary part of conjugate should be -4');
  });

  runTest('Identity: z * conj(z) = |z|² (important mathematical identity)', () => {
    const z = new ComplexNumber(3, 4);
    const conj = z.conjugate();
    const product = z.multiply(conj);
    const magSquared = z.magnitude() * z.magnitude();

    assertClose(product.getReal(), magSquared, 1e-10, 'Real part should equal |z|²');
    assertClose(product.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
  });

  runTest('Edge case: magnitude and phase of (0+0i)', () => {
    const z = new ComplexNumber(0, 0);
    const mag = z.magnitude();
    const phase = z.phase();

    assertClose(mag, 0, 1e-10, 'Magnitude of (0+0i) should be 0');
    assertClose(phase, 0, 1e-10, 'Phase of (0+0i) should be 0');
  });

  // Phase 6: Polar Form Support
  console.log(`\n${COLORS.yellow}Phase 6: Polar Form Support${COLORS.reset}`);

  runTest('fromPolar: r=√2, θ=π/4 → (1+1i)', () => {
    const r = Math.sqrt(2);
    const theta = Math.PI / 4;
    const z = ComplexNumber.fromPolar(r, theta);
    assertClose(z.getReal(), 1, 1e-10, 'Real part should be 1');
    assertClose(z.getImaginary(), 1, 1e-10, 'Imaginary part should be 1');
  });

  runTest('fromPolar: r=5, θ=atan2(4,3) → (3+4i)', () => {
    const r = 5;
    const theta = Math.atan2(4, 3);
    const z = ComplexNumber.fromPolar(r, theta);
    assertClose(z.getReal(), 3, 1e-10, 'Real part should be 3');
    assertClose(z.getImaginary(), 4, 1e-10, 'Imaginary part should be 4');
  });

  runTest('toPolar: (1+1i) → {magnitude: √2, phase: π/4}', () => {
    const z = new ComplexNumber(1, 1);
    const polar = z.toPolar();
    assertClose(polar.magnitude, Math.sqrt(2), 1e-10, 'Magnitude should be √2');
    assertClose(polar.phase, Math.PI / 4, 1e-10, 'Phase should be π/4');
  });

  runTest('Round-trip: toPolar(fromPolar(r, θ)) ≈ {r, θ}', () => {
    const r = 7;
    const theta = Math.PI / 3;
    const z = ComplexNumber.fromPolar(r, theta);
    const polar = z.toPolar();
    assertClose(polar.magnitude, r, 1e-10, 'Magnitude should be preserved');
    assertClose(polar.phase, theta, 1e-10, 'Phase should be preserved');
  });

  runTest('Round-trip: fromPolar(z.toPolar()) ≈ z', () => {
    const original = new ComplexNumber(3, 4);
    const polar = original.toPolar();
    const reconstructed = ComplexNumber.fromPolar(polar.magnitude, polar.phase);
    assertClose(reconstructed.getReal(), original.getReal(), 1e-10, 'Real part should be preserved');
    assertClose(reconstructed.getImaginary(), original.getImaginary(), 1e-10, 'Imaginary part should be preserved');
  });

  runTest('Invalid input to fromPolar: NaN magnitude', () => {
    let threw = false;
    try {
      ComplexNumber.fromPolar(NaN, 0);
    } catch (e) {
      threw = true;
      assert(e instanceof Error && e.message === "Magnitude must be a finite number", 'Should throw correct error');
    }
    assert(threw, 'Should throw error for NaN magnitude');
  });

  runTest('Invalid input to fromPolar: Infinity magnitude', () => {
    let threw = false;
    try {
      ComplexNumber.fromPolar(Infinity, 0);
    } catch (e) {
      threw = true;
      assert(e instanceof Error && e.message === "Magnitude must be a finite number", 'Should throw correct error');
    }
    assert(threw, 'Should throw error for Infinity magnitude');
  });

  runTest('Invalid input to fromPolar: NaN phase', () => {
    let threw = false;
    try {
      ComplexNumber.fromPolar(1, NaN);
    } catch (e) {
      threw = true;
      assert(e instanceof Error && e.message === "Phase must be a finite number", 'Should throw correct error');
    }
    assert(threw, 'Should throw error for NaN phase');
  });

  runTest('Invalid input to fromPolar: Infinity phase', () => {
    let threw = false;
    try {
      ComplexNumber.fromPolar(1, Infinity);
    } catch (e) {
      threw = true;
      assert(e instanceof Error && e.message === "Phase must be a finite number", 'Should throw correct error');
    }
    assert(threw, 'Should throw error for Infinity phase');
  });

  runTest('Edge case: fromPolar(0, any) = (0+0i)', () => {
    const z1 = ComplexNumber.fromPolar(0, 0);
    assertClose(z1.getReal(), 0, 1e-10, 'Real part should be 0');
    assertClose(z1.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');

    const z2 = ComplexNumber.fromPolar(0, Math.PI / 2);
    assertClose(z2.getReal(), 0, 1e-10, 'Real part should be 0');
    assertClose(z2.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');

    const z3 = ComplexNumber.fromPolar(0, Math.PI);
    assertClose(z3.getReal(), 0, 1e-10, 'Real part should be 0');
    assertClose(z3.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
  });

  // Phase 7: Enhanced String Formatting
  console.log(`\n${COLORS.yellow}Phase 7: Enhanced String Formatting${COLORS.reset}`);

  runTest('Standard form: (3+4i).toString() = "3+4i"', () => {
    const z = new ComplexNumber(3, 4);
    assert(z.toString() === '3+4i', 'toString() should return "3+4i"');
  });

  runTest('Negative imaginary: (3-4i).toString() = "3-4i"', () => {
    const z = new ComplexNumber(3, -4);
    assert(z.toString() === '3-4i', 'toString() should return "3-4i"');
  });

  runTest('Pure real: (5+0i).toString() = "5"', () => {
    const z = new ComplexNumber(5, 0);
    assert(z.toString() === '5', 'toString() should return "5"');
  });

  runTest('Pure imaginary: (0+3i).toString() = "3i"', () => {
    const z = new ComplexNumber(0, 3);
    assert(z.toString() === '3i', 'toString() should return "3i"');
  });

  runTest('Zero: (0+0i).toString() = "0"', () => {
    const z = new ComplexNumber(0, 0);
    assert(z.toString() === '0', 'toString() should return "0"');
  });

  runTest('Imaginary = 1: (2+1i).toString() = "2+i"', () => {
    const z = new ComplexNumber(2, 1);
    assert(z.toString() === '2+i', 'toString() should return "2+i"');
  });

  runTest('Imaginary = -1: (2-1i).toString() = "2-i"', () => {
    const z = new ComplexNumber(2, -1);
    assert(z.toString() === '2-i', 'toString() should return "2-i"');
  });

  runTest('Just i: (0+1i).toString() = "i"', () => {
    const z = new ComplexNumber(0, 1);
    assert(z.toString() === 'i', 'toString() should return "i"');
  });

  runTest('Just -i: (0-1i).toString() = "-i"', () => {
    const z = new ComplexNumber(0, -1);
    assert(z.toString() === '-i', 'toString() should return "-i"');
  });

  runTest('Negative real: (-3+4i).toString() = "-3+4i"', () => {
    const z = new ComplexNumber(-3, 4);
    assert(z.toString() === '-3+4i', 'toString() should return "-3+4i"');
  });

  // Additional edge cases for comprehensive coverage
  runTest('Negative real and imaginary: (-3-4i).toString() = "-3-4i"', () => {
    const z = new ComplexNumber(-3, -4);
    assert(z.toString() === '-3-4i', 'toString() should return "-3-4i"');
  });

  runTest('Pure real negative: (-5+0i).toString() = "-5"', () => {
    const z = new ComplexNumber(-5, 0);
    assert(z.toString() === '-5', 'toString() should return "-5"');
  });

  runTest('Pure imaginary negative: (0-3i).toString() = "-3i"', () => {
    const z = new ComplexNumber(0, -3);
    assert(z.toString() === '-3i', 'toString() should return "-3i"');
  });

  runTest('Fractional values: (1.5+2.5i).toString() = "1.5+2.5i"', () => {
    const z = new ComplexNumber(1.5, 2.5);
    assert(z.toString() === '1.5+2.5i', 'toString() should return "1.5+2.5i"');
  });

  runTest('Fractional with imaginary = 1: (3.7+1i).toString() = "3.7+i"', () => {
    const z = new ComplexNumber(3.7, 1);
    assert(z.toString() === '3.7+i', 'toString() should return "3.7+i"');
  });

  // Print summary
  printSummary();

  // Exit with appropriate code (if process is available)
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(testsFailed > 0 ? 1 : 0);
  }
}

// Run tests
main();
