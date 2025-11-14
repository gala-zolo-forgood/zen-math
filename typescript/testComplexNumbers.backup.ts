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

  // Print summary
  printSummary();

  // Exit with appropriate code (if process is available)
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(testsFailed > 0 ? 1 : 0);
  }
}

// Run tests
main();
