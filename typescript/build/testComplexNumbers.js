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
    // Phase 3: Addition and Subtraction Tests
    console.log("\n".concat(COLORS.yellow, "Phase 3: Addition and Subtraction").concat(COLORS.reset));
    runTest('Addition: (3+4i) + (1+2i) = (4+6i)', function () {
        var z1 = new complexNumbers_1.ComplexNumber(3, 4);
        var z2 = new complexNumbers_1.ComplexNumber(1, 2);
        var result = z1.add(z2);
        assert(result.getReal() === 4, 'Real part should be 4');
        assert(result.getImaginary() === 6, 'Imaginary part should be 6');
    });
    runTest('Subtraction: (5+3i) - (2+1i) = (3+2i)', function () {
        var z1 = new complexNumbers_1.ComplexNumber(5, 3);
        var z2 = new complexNumbers_1.ComplexNumber(2, 1);
        var result = z1.subtract(z2);
        assert(result.getReal() === 3, 'Real part should be 3');
        assert(result.getImaginary() === 2, 'Imaginary part should be 2');
    });
    runTest('Identity: z + 0 = z', function () {
        var z = new complexNumbers_1.ComplexNumber(3, 4);
        var zero = new complexNumbers_1.ComplexNumber(0, 0);
        var result = z.add(zero);
        assert(result.getReal() === 3, 'Real part should be 3');
        assert(result.getImaginary() === 4, 'Imaginary part should be 4');
    });
    runTest('Commutativity: z1 + z2 = z2 + z1', function () {
        var z1 = new complexNumbers_1.ComplexNumber(2, 3);
        var z2 = new complexNumbers_1.ComplexNumber(5, 7);
        var r1 = z1.add(z2);
        var r2 = z2.add(z1);
        assert(r1.getReal() === r2.getReal(), 'Real parts should be equal');
        assert(r1.getImaginary() === r2.getImaginary(), 'Imaginary parts should be equal');
    });
    runTest('Immutability: original objects unchanged after addition', function () {
        var z1 = new complexNumbers_1.ComplexNumber(3, 4);
        var z2 = new complexNumbers_1.ComplexNumber(1, 2);
        z1.add(z2);
        assert(z1.getReal() === 3, 'z1 real part should be unchanged');
        assert(z1.getImaginary() === 4, 'z1 imaginary part should be unchanged');
        assert(z2.getReal() === 1, 'z2 real part should be unchanged');
        assert(z2.getImaginary() === 2, 'z2 imaginary part should be unchanged');
    });
    // Phase 4: Multiplication and Division Tests
    console.log("\n".concat(COLORS.yellow, "Phase 4: Multiplication and Division").concat(COLORS.reset));
    runTest('Multiplication: (1+2i) * (3+4i) = (-5+10i)', function () {
        var z1 = new complexNumbers_1.ComplexNumber(1, 2);
        var z2 = new complexNumbers_1.ComplexNumber(3, 4);
        var result = z1.multiply(z2);
        assert(result.getReal() === -5, 'Real part should be -5');
        assert(result.getImaginary() === 10, 'Imaginary part should be 10');
    });
    runTest('Division: (6+8i) / (1+1i) = (7+1i)', function () {
        var z1 = new complexNumbers_1.ComplexNumber(6, 8);
        var z2 = new complexNumbers_1.ComplexNumber(1, 1);
        var result = z1.divide(z2);
        assert(result.getReal() === 7, 'Real part should be 7');
        assert(result.getImaginary() === 1, 'Imaginary part should be 1');
    });
    runTest('Identity: z * 1 = z', function () {
        var z = new complexNumbers_1.ComplexNumber(3, 4);
        var one = new complexNumbers_1.ComplexNumber(1, 0);
        var result = z.multiply(one);
        assert(result.getReal() === 3, 'Real part should be 3');
        assert(result.getImaginary() === 4, 'Imaginary part should be 4');
    });
    runTest('Division by self: z / z = 1 (for non-zero z)', function () {
        var z = new complexNumbers_1.ComplexNumber(3, 4);
        var result = z.divide(z);
        assertClose(result.getReal(), 1, 1e-10, 'Real part should be 1');
        assertClose(result.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
    });
    runTest('Division by zero: throws error', function () {
        var z = new complexNumbers_1.ComplexNumber(1, 2);
        var zero = new complexNumbers_1.ComplexNumber(0, 0);
        var threw = false;
        var errorMessage = '';
        try {
            z.divide(zero);
        }
        catch (e) {
            threw = true;
            errorMessage = e instanceof Error ? e.message : String(e);
        }
        assert(threw, 'Should throw error on division by zero');
        assert(errorMessage === 'Division by zero complex number', 'Error message should match');
    });
    runTest('Verify: (a/b)*b ≈ a (within floating-point tolerance)', function () {
        var a = new complexNumbers_1.ComplexNumber(5, 7);
        var b = new complexNumbers_1.ComplexNumber(3, 4);
        var result = a.divide(b).multiply(b);
        assertClose(result.getReal(), a.getReal(), 1e-10, 'Real parts should match');
        assertClose(result.getImaginary(), a.getImaginary(), 1e-10, 'Imaginary parts should match');
    });
    // Phase 6: Polar Form Support
    console.log("\n".concat(COLORS.yellow, "Phase 6: Polar Form Support").concat(COLORS.reset));
    runTest('fromPolar: r=√2, θ=π/4 → (1+1i)', function () {
        var r = Math.sqrt(2);
        var theta = Math.PI / 4;
        var z = complexNumbers_1.ComplexNumber.fromPolar(r, theta);
        assertClose(z.getReal(), 1, 1e-10, 'Real part should be 1');
        assertClose(z.getImaginary(), 1, 1e-10, 'Imaginary part should be 1');
    });
    runTest('fromPolar: r=5, θ=atan2(4,3) → (3+4i)', function () {
        var r = 5;
        var theta = Math.atan2(4, 3);
        var z = complexNumbers_1.ComplexNumber.fromPolar(r, theta);
        assertClose(z.getReal(), 3, 1e-10, 'Real part should be 3');
        assertClose(z.getImaginary(), 4, 1e-10, 'Imaginary part should be 4');
    });
    runTest('toPolar: (1+1i) → {magnitude: √2, phase: π/4}', function () {
        var z = new complexNumbers_1.ComplexNumber(1, 1);
        var polar = z.toPolar();
        assertClose(polar.magnitude, Math.sqrt(2), 1e-10, 'Magnitude should be √2');
        assertClose(polar.phase, Math.PI / 4, 1e-10, 'Phase should be π/4');
    });
    runTest('Round-trip: toPolar(fromPolar(r, θ)) ≈ {r, θ}', function () {
        var r = 7;
        var theta = Math.PI / 3;
        var z = complexNumbers_1.ComplexNumber.fromPolar(r, theta);
        var polar = z.toPolar();
        assertClose(polar.magnitude, r, 1e-10, 'Magnitude should be preserved');
        assertClose(polar.phase, theta, 1e-10, 'Phase should be preserved');
    });
    runTest('Round-trip: fromPolar(z.toPolar()) ≈ z', function () {
        var original = new complexNumbers_1.ComplexNumber(3, 4);
        var polar = original.toPolar();
        var reconstructed = complexNumbers_1.ComplexNumber.fromPolar(polar.magnitude, polar.phase);
        assertClose(reconstructed.getReal(), original.getReal(), 1e-10, 'Real part should be preserved');
        assertClose(reconstructed.getImaginary(), original.getImaginary(), 1e-10, 'Imaginary part should be preserved');
    });
    runTest('Invalid input to fromPolar: NaN magnitude', function () {
        var threw = false;
        try {
            complexNumbers_1.ComplexNumber.fromPolar(NaN, 0);
        }
        catch (e) {
            threw = true;
            assert(e instanceof Error && e.message === "Magnitude must be a finite number", 'Should throw correct error');
        }
        assert(threw, 'Should throw error for NaN magnitude');
    });
    runTest('Invalid input to fromPolar: Infinity magnitude', function () {
        var threw = false;
        try {
            complexNumbers_1.ComplexNumber.fromPolar(Infinity, 0);
        }
        catch (e) {
            threw = true;
            assert(e instanceof Error && e.message === "Magnitude must be a finite number", 'Should throw correct error');
        }
        assert(threw, 'Should throw error for Infinity magnitude');
    });
    runTest('Invalid input to fromPolar: NaN phase', function () {
        var threw = false;
        try {
            complexNumbers_1.ComplexNumber.fromPolar(1, NaN);
        }
        catch (e) {
            threw = true;
            assert(e instanceof Error && e.message === "Phase must be a finite number", 'Should throw correct error');
        }
        assert(threw, 'Should throw error for NaN phase');
    });
    runTest('Invalid input to fromPolar: Infinity phase', function () {
        var threw = false;
        try {
            complexNumbers_1.ComplexNumber.fromPolar(1, Infinity);
        }
        catch (e) {
            threw = true;
            assert(e instanceof Error && e.message === "Phase must be a finite number", 'Should throw correct error');
        }
        assert(threw, 'Should throw error for Infinity phase');
    });
    runTest('Edge case: fromPolar(0, any) = (0+0i)', function () {
        var z1 = complexNumbers_1.ComplexNumber.fromPolar(0, 0);
        assertClose(z1.getReal(), 0, 1e-10, 'Real part should be 0');
        assertClose(z1.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
        var z2 = complexNumbers_1.ComplexNumber.fromPolar(0, Math.PI / 2);
        assertClose(z2.getReal(), 0, 1e-10, 'Real part should be 0');
        assertClose(z2.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
        var z3 = complexNumbers_1.ComplexNumber.fromPolar(0, Math.PI);
        assertClose(z3.getReal(), 0, 1e-10, 'Real part should be 0');
        assertClose(z3.getImaginary(), 0, 1e-10, 'Imaginary part should be 0');
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
