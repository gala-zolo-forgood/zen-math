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

  // Print summary
  printSummary();

  // Exit with appropriate code (if process is available)
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(testsFailed > 0 ? 1 : 0);
  }
}

// Run tests
main();
