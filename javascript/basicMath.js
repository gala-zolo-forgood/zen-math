const basicMath = {
  add: function(a, b) {
    return a + b;
  },
  
  subtract: function(a, b) {
    return a - b;
  },
  
  multiply: function(a, b) {
    return a * b;
  },
  
  divide: function(a, b) {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  },
  
  power: function(base, exponent) {
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
    if (n < 0) {
      throw new Error("Factorial not defined for negative numbers");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
};

module.exports = basicMath;