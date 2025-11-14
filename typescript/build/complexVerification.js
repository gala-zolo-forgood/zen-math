"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var complexNumbers_1 = require("./complexNumbers");
console.log('=== Complex Number Interactive Verification ===\n');
// Create example complex numbers
console.log('1. Creating Complex Numbers (Cartesian Form):');
var z1 = new complexNumbers_1.ComplexNumber(3, 4);
var z2 = new complexNumbers_1.ComplexNumber(1, 2);
var z3 = new complexNumbers_1.ComplexNumber(5);
var z4 = new complexNumbers_1.ComplexNumber(0, 3);
console.log("   z1 = ".concat(z1));
console.log("   z2 = ".concat(z2));
console.log("   z3 = ".concat(z3));
console.log("   z4 = ".concat(z4));
// Arithmetic operations
console.log('\n2. Arithmetic Operations:');
console.log("   z1 + z2 = ".concat(z1.add(z2)));
console.log("   z1 - z2 = ".concat(z1.subtract(z2)));
console.log("   z1 * z2 = ".concat(z1.multiply(z2)));
console.log("   z1 / z2 = ".concat(z1.divide(z2)));
// Properties
console.log('\n3. Properties:');
console.log("   |z1| (magnitude) = ".concat(z1.magnitude()));
console.log("   arg(z1) (phase) = ".concat(z1.phase(), " radians"));
console.log("   conj(z1) (conjugate) = ".concat(z1.conjugate()));
// Polar form
console.log('\n4. Polar Form:');
var polar = z1.toPolar();
console.log("   z1 in polar form: magnitude = ".concat(polar.magnitude, ", phase = ").concat(polar.phase, " radians"));
var z5 = complexNumbers_1.ComplexNumber.fromPolar(5, Math.PI / 4);
console.log("   Created from polar (r=5, \u03B8=\u03C0/4): ".concat(z5));
console.log("   Verification: magnitude = ".concat(z5.magnitude(), ", phase = ").concat(z5.phase()));
// String formatting edge cases
console.log('\n5. String Formatting Edge Cases:');
console.log("   Zero: ".concat(new complexNumbers_1.ComplexNumber(0, 0)));
console.log("   Pure real: ".concat(new complexNumbers_1.ComplexNumber(7, 0)));
console.log("   Pure imaginary: ".concat(new complexNumbers_1.ComplexNumber(0, 5)));
console.log("   Imaginary = 1: ".concat(new complexNumbers_1.ComplexNumber(3, 1)));
console.log("   Imaginary = -1: ".concat(new complexNumbers_1.ComplexNumber(3, -1)));
console.log("   Just i: ".concat(new complexNumbers_1.ComplexNumber(0, 1)));
console.log("   Just -i: ".concat(new complexNumbers_1.ComplexNumber(0, -1)));
console.log("   Negative imaginary: ".concat(new complexNumbers_1.ComplexNumber(3, -4)));
// Mathematical identities
console.log('\n6. Mathematical Identity Verification:');
var a = new complexNumbers_1.ComplexNumber(2, 3);
var b = new complexNumbers_1.ComplexNumber(4, -1);
// z * conj(z) = |z|²
var product = a.multiply(a.conjugate());
var magSquared = a.magnitude() * a.magnitude();
console.log("   z * conj(z) = ".concat(product));
console.log("   |z|\u00B2 = ".concat(magSquared));
console.log("   Real part of z * conj(z) \u2248 |z|\u00B2: ".concat(Math.abs(product.getReal() - magSquared) < 1e-10));
// (a/b)*b ≈ a
var quotient = a.divide(b);
var result = quotient.multiply(b);
console.log("   (a/b)*b = ".concat(result));
console.log("   a = ".concat(a));
console.log("   Approximately equal: ".concat(Math.abs(result.getReal() - a.getReal()) < 1e-10 && Math.abs(result.getImaginary() - a.getImaginary()) < 1e-10));
// Round-trip polar conversion
var original = new complexNumbers_1.ComplexNumber(3, 4);
var polarForm = original.toPolar();
var backToCartesian = complexNumbers_1.ComplexNumber.fromPolar(polarForm.magnitude, polarForm.phase);
console.log("   Original: ".concat(original));
console.log("   After polar round-trip: ".concat(backToCartesian));
console.log("   Approximately equal: ".concat(Math.abs(backToCartesian.getReal() - original.getReal()) < 1e-10 && Math.abs(backToCartesian.getImaginary() - original.getImaginary()) < 1e-10));
// Error handling
console.log('\n7. Error Handling:');
try {
    var invalid = new complexNumbers_1.ComplexNumber(NaN, 5);
    console.log("   \u2717 Should have thrown error for NaN");
}
catch (e) {
    console.log("   \u2713 Caught error for NaN: ".concat(e.message));
}
try {
    var zero = new complexNumbers_1.ComplexNumber(0, 0);
    var shouldFail = z1.divide(zero);
    console.log("   \u2717 Should have thrown error for division by zero");
}
catch (e) {
    console.log("   \u2713 Caught error for division by zero: ".concat(e.message));
}
console.log('\n=== Verification Complete ===');
