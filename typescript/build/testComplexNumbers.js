"use strict";
/**
 * Test harness for ComplexNumber class
 * Provides assertion helpers and test runner with color-coded output
 */
Object.defineProperty(exports, "__esModule", { value: true });
var complexNumbers_1 = require("./complexNumbers");
// ANSI color codes for terminal output
var COLORS = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};
// Test statistics
var testsRun = 0;
var testsPassed = 0;
var testsFailed = 0;
/**
 * Assert helper - throws on failure
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}
/**
 * Assert helper for floating-point comparisons
 */
function assertClose(actual, expected, tolerance, message) {
    if (tolerance === void 0) { tolerance = 1e-10; }
    var diff = Math.abs(actual - expected);
    if (diff > tolerance) {
        throw new Error(message ||
            "Expected ".concat(actual, " to be close to ").concat(expected, " (diff: ").concat(diff, ", tolerance: ").concat(tolerance, ")"));
    }
}
/**
 * Run a single test with error handling
 */
function runTest(name, testFn) {
    testsRun++;
    try {
        testFn();
        testsPassed++;
        console.log("".concat(COLORS.green, "\u2713 PASS").concat(COLORS.reset, " ").concat(name));
    }
    catch (error) {
        testsFailed++;
        var errorMessage = error instanceof Error ? error.message : String(error);
        console.log("".concat(COLORS.red, "\u2717 FAIL").concat(COLORS.reset, " ").concat(name));
        console.log("  ".concat(COLORS.red).concat(errorMessage).concat(COLORS.reset));
    }
}
/**
 * Print test summary
 */
function printSummary() {
    var separator = '============================================================';
    console.log('\n' + separator);
    console.log("".concat(COLORS.blue, "Test Summary").concat(COLORS.reset));
    console.log(separator);
    console.log("Total:  ".concat(testsRun));
    console.log("".concat(COLORS.green, "Passed: ").concat(testsPassed).concat(COLORS.reset));
    if (testsFailed > 0) {
        console.log("".concat(COLORS.red, "Failed: ").concat(testsFailed).concat(COLORS.reset));
    }
    else {
        console.log("Failed: ".concat(testsFailed));
    }
    console.log(separator);
    if (testsFailed === 0) {
        console.log("".concat(COLORS.green, "All tests passed!").concat(COLORS.reset, "\n"));
    }
    else {
        console.log("".concat(COLORS.red, "Some tests failed.").concat(COLORS.reset, "\n"));
    }
}
/**
 * Main test runner
 */
function main() {
    console.log("".concat(COLORS.blue, "Running ComplexNumber Tests").concat(COLORS.reset, "\n"));
    // Phase 1: Test Infrastructure Verification
    console.log("".concat(COLORS.yellow, "Phase 1: Test Infrastructure").concat(COLORS.reset));
    runTest('assert helper works for true condition', function () {
        assert(true, 'This should not throw');
    });
    runTest('assert helper throws for false condition', function () {
        var threw = false;
        try {
            assert(false, 'Expected failure');
        }
        catch (e) {
            threw = true;
        }
        assert(threw, 'assert should have thrown');
    });
    runTest('assertClose accepts values within tolerance', function () {
        assertClose(1.0000000001, 1.0, 1e-9);
    });
    runTest('assertClose rejects values outside tolerance', function () {
        var threw = false;
        try {
            assertClose(1.1, 1.0, 1e-10);
        }
        catch (e) {
            threw = true;
        }
        assert(threw, 'assertClose should have thrown');
    });
    // Phase 2: Core ComplexNumber Class with Cartesian Construction
    console.log("\n".concat(COLORS.yellow, "Phase 2: Core ComplexNumber Class").concat(COLORS.reset));
    // Test 1: Valid construction with both parameters
    runTest('Valid construction: new ComplexNumber(3, 4)', function () {
        var z = new complexNumbers_1.ComplexNumber(3, 4);
        assert(z.getReal() === 3, 'Real part should be 3');
        assert(z.getImaginary() === 4, 'Imaginary part should be 4');
    });
    // Test 2: Optional imaginary parameter (defaults to 0)
    runTest('Optional imaginary: new ComplexNumber(5)', function () {
        var z = new complexNumbers_1.ComplexNumber(5);
        assert(z.getReal() === 5, 'Real part should be 5');
        assert(z.getImaginary() === 0, 'Imaginary part should default to 0');
    });
    // Test 3: Accessor methods
    runTest('Accessor methods: getReal() and getImaginary()', function () {
        var z = new complexNumbers_1.ComplexNumber(7, -3);
        assert(z.getReal() === 7, 'getReal() should return 7');
        assert(z.getImaginary() === -3, 'getImaginary() should return -3');
    });
    // Test 4: Invalid input - real part is NaN
    runTest('Invalid input: NaN for real part', function () {
        var errorThrown = false;
        try {
            new complexNumbers_1.ComplexNumber(NaN, 5);
        }
        catch (error) {
            errorThrown = true;
            assert(error instanceof Error, 'Should throw an Error');
            assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
        }
        assert(errorThrown, 'Should have thrown an error');
    });
    // Test 5: Invalid input - imaginary part is NaN
    runTest('Invalid input: NaN for imaginary part', function () {
        var errorThrown = false;
        try {
            new complexNumbers_1.ComplexNumber(5, NaN);
        }
        catch (error) {
            errorThrown = true;
            assert(error instanceof Error, 'Should throw an Error');
            assert(error.message === 'Imaginary part must be a finite number', 'Should have correct error message');
        }
        assert(errorThrown, 'Should have thrown an error');
    });
    // Test 6: Invalid input - real part is Infinity
    runTest('Invalid input: Infinity for real part', function () {
        var errorThrown = false;
        try {
            new complexNumbers_1.ComplexNumber(Infinity, 5);
        }
        catch (error) {
            errorThrown = true;
            assert(error instanceof Error, 'Should throw an Error');
            assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
        }
        assert(errorThrown, 'Should have thrown an error');
    });
    // Test 7: Invalid input - imaginary part is Infinity
    runTest('Invalid input: Infinity for imaginary part', function () {
        var errorThrown = false;
        try {
            new complexNumbers_1.ComplexNumber(5, Infinity);
        }
        catch (error) {
            errorThrown = true;
            assert(error instanceof Error, 'Should throw an Error');
            assert(error.message === 'Imaginary part must be a finite number', 'Should have correct error message');
        }
        assert(errorThrown, 'Should have thrown an error');
    });
    // Test 8: Invalid input - real part is -Infinity
    runTest('Invalid input: -Infinity for real part', function () {
        var errorThrown = false;
        try {
            new complexNumbers_1.ComplexNumber(-Infinity, 5);
        }
        catch (error) {
            errorThrown = true;
            assert(error instanceof Error, 'Should throw an Error');
            assert(error.message === 'Real part must be a finite number', 'Should have correct error message');
        }
        assert(errorThrown, 'Should have thrown an error');
    });
    // Test 9: Basic toString output
    runTest('Basic toString output', function () {
        var z = new complexNumbers_1.ComplexNumber(3, 4);
        var str = z.toString();
        assert(typeof str === 'string', 'toString() should return a string');
        assert(str === '3+4i', "toString() should return '3+4i'");
    });
    // Test 10: Zero complex number
    runTest('Zero complex number: new ComplexNumber(0, 0)', function () {
        var z = new complexNumbers_1.ComplexNumber(0, 0);
        assert(z.getReal() === 0, 'Real part should be 0');
        assert(z.getImaginary() === 0, 'Imaginary part should be 0');
    });
    // Test 11: Negative values
    runTest('Negative values: new ComplexNumber(-2, -5)', function () {
        var z = new complexNumbers_1.ComplexNumber(-2, -5);
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
