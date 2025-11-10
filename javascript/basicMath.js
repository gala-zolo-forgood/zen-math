const basicMath = {
  add: function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error("Arguments must be finite numbers");
    }
    return a + b;
  },
  
  subtract: function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error("Arguments must be finite numbers");
    }
    return a - b;
  },
  
  multiply: function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error("Arguments must be finite numbers");
    }
    return a * b;
  },
  
  divide: function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error("Arguments must be finite numbers");
    }
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  },
  
  power: function(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(base) || !isFinite(exponent)) {
      throw new Error("Arguments must be finite numbers");
    }
    if (!Number.isInteger(exponent)) {
      throw new Error("Exponent must be an integer");
    }
    if (exponent < 0) {
      throw new Error("Negative exponent not supported");
    }
    
    let result = 1;
    for (let i = 0; i < exponent; i++) {
      result *= base;
    }
    return result;
  },
  
  factorial: function(n) {
    if (typeof n !== 'number') {
      throw new Error("Argument must be a number");
    }
    if (!isFinite(n)) {
      throw new Error("Argument must be a finite number");
    }
    if (!Number.isInteger(n)) {
      throw new Error("Argument must be an integer");
    }
    if (n < 0) {
      throw new Error("Factorial not defined for negative numbers");
    }
    if (n > 170) {
      throw new Error("Factorial result would be too large (overflow)");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },

  gcd: function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Both arguments must be numbers");
    }
    if (!isFinite(a) || !isFinite(b)) {
      throw new Error("Arguments must be finite numbers");
    }
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      throw new Error("Both arguments must be integers");
    }
    if (a < 0 || b < 0) {
      throw new Error("Both arguments must be non-negative integers");
    }
    
    if (b === 0) {
      return a;
    }
    return basicMath.gcd(b, a % b);
  },
};

module.exports = basicMath;