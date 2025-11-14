"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexNumber = void 0;
var ComplexNumber = /** @class */ (function () {
    function ComplexNumber(real, imaginary) {
        if (imaginary === void 0) { imaginary = 0; }
        if (typeof real !== 'number' || !isFinite(real)) {
            throw new Error("Real part must be a finite number");
        }
        if (typeof imaginary !== 'number' || !isFinite(imaginary)) {
            throw new Error("Imaginary part must be a finite number");
        }
        this.real = real;
        this.imag = imaginary;
    }
    ComplexNumber.fromPolar = function (magnitude, phase) {
        if (typeof magnitude !== 'number' || !isFinite(magnitude)) {
            throw new Error("Magnitude must be a finite number");
        }
        if (typeof phase !== 'number' || !isFinite(phase)) {
            throw new Error("Phase must be a finite number");
        }
        var real = magnitude * Math.cos(phase);
        var imag = magnitude * Math.sin(phase);
        return new ComplexNumber(real, imag);
    };
    ComplexNumber.prototype.getReal = function () {
        return this.real;
    };
    ComplexNumber.prototype.getImaginary = function () {
        return this.imag;
    };
    ComplexNumber.prototype.toString = function () {
        // Handle zero
        if (this.real === 0 && this.imag === 0) {
            return "0";
        }
        // Handle pure real (imaginary = 0)
        if (this.imag === 0) {
            return "".concat(this.real);
        }
        // Handle pure imaginary (real = 0)
        if (this.real === 0) {
            if (this.imag === 1) {
                return "i";
            }
            if (this.imag === -1) {
                return "-i";
            }
            return "".concat(this.imag, "i");
        }
        // Handle both real and imaginary parts
        var result = "".concat(this.real);
        if (this.imag > 0) {
            result += "+";
            if (this.imag === 1) {
                result += "i";
            }
            else {
                result += "".concat(this.imag, "i");
            }
        }
        else {
            // Negative imaginary part
            if (this.imag === -1) {
                result += "-i";
            }
            else {
                result += "".concat(this.imag, "i");
            }
        }
        return result;
    };
    ComplexNumber.prototype.magnitude = function () {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    };
    ComplexNumber.prototype.phase = function () {
        return Math.atan2(this.imag, this.real);
    };
    ComplexNumber.prototype.toPolar = function () {
        return {
            magnitude: this.magnitude(),
            phase: this.phase()
        };
    };
    ComplexNumber.prototype.add = function (other) {
        return new ComplexNumber(this.real + other.real, this.imag + other.imag);
    };
    ComplexNumber.prototype.subtract = function (other) {
        return new ComplexNumber(this.real - other.real, this.imag - other.imag);
    };
    ComplexNumber.prototype.multiply = function (other) {
        var realPart = this.real * other.real - this.imag * other.imag;
        var imagPart = this.real * other.imag + this.imag * other.real;
        return new ComplexNumber(realPart, imagPart);
    };
    ComplexNumber.prototype.divide = function (other) {
        var denominator = other.real * other.real + other.imag * other.imag;
        if (denominator === 0) {
            throw new Error("Division by zero complex number");
        }
        var realPart = (this.real * other.real + this.imag * other.imag) / denominator;
        var imagPart = (this.imag * other.real - this.real * other.imag) / denominator;
        return new ComplexNumber(realPart, imagPart);
    };
    ComplexNumber.prototype.conjugate = function () {
        return new ComplexNumber(this.real, -this.imag);
    };
    return ComplexNumber;
}());
exports.ComplexNumber = ComplexNumber;
