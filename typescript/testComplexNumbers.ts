/**
 * Test harness for ComplexNumber class
 * Provides assertion helpers and test runner with color-coded output
 */

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
  console.log('\n' + '='.repeat(60));
  console.log(`${COLORS.blue}Test Summary${COLORS.reset}`);
  console.log('='.repeat(60));
  console.log(`Total:  ${testsRun}`);
  console.log(`${COLORS.green}Passed: ${testsPassed}${COLORS.reset}`);
  if (testsFailed > 0) {
    console.log(`${COLORS.red}Failed: ${testsFailed}${COLORS.reset}`);
  } else {
    console.log(`Failed: ${testsFailed}`);
  }
  console.log('='.repeat(60));

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

  // Print summary
  printSummary();

  // Exit with appropriate code
  process.exit(testsFailed > 0 ? 1 : 0);
}

// Run tests
main();
