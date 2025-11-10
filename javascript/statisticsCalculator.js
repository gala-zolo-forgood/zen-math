const statisticsCalculator = {
  validateInput: function(input) {
    if (!Array.isArray(input)) {
      throw new Error("Input must be an array");
    }
    
    if (input.length === 0) {
      throw new Error("Empty array");
    }
    
    const validNumbers = [];
    const invalidItems = [];
    
    input.forEach((item, index) => {
      if (typeof item === 'number' && !isNaN(item) && isFinite(item)) {
        validNumbers.push(item);
      } else if (typeof item === 'string' && !isNaN(parseFloat(item)) && isFinite(parseFloat(item))) {
        validNumbers.push(parseFloat(item));
      } else {
        invalidItems.push({ value: item, index, type: typeof item });
      }
    });
    
    if (invalidItems.length > 0) {
      const invalidDetails = invalidItems.map(item => 
        `index ${item.index}: ${item.value} (${item.type})`
      ).join(', ');
      throw new Error(`Invalid non-numeric values found at ${invalidDetails}`);
    }
    
    if (validNumbers.length === 0) {
      throw new Error("No valid numeric values found");
    }
    
    return validNumbers;
  },

  calculateMean: function(numbers) {
    const validNumbers = this.validateInput(numbers);
    
    const sum = validNumbers.reduce((acc, val) => acc + val, 0);
    return sum / validNumbers.length;
  },
  
  calculateMedian: function(numbers) {
    const validNumbers = this.validateInput(numbers);
    
    const sortedNumbers = [...validNumbers].sort((a, b) => a - b);
    
    if (sortedNumbers.length % 2 === 0) {
      const midIndex = sortedNumbers.length / 2;
      return (sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2;
    } else {
      return sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    }
  },
  
  calculateVariance: function(numbers) {
    const validNumbers = this.validateInput(numbers);
    
    const mean = this.calculateMean(numbers);
    const sumOfSquaredDifferences = validNumbers.reduce((acc, val) => {
      return acc + Math.pow(val - mean, 2);
    }, 0);
    
    return sumOfSquaredDifferences / validNumbers.length;
  },
  
  calculateStandardDeviation: function(numbers) {
    return Math.sqrt(this.calculateVariance(numbers));
  },
  
  calculateMode: function(numbers) {
    const validNumbers = this.validateInput(numbers);
    
    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];
    
    validNumbers.forEach(num => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
      
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        modes = [num];
      } else if (frequencyMap[num] === maxFrequency) {
        modes.push(num);
      }
    });
    
    return modes;
  }
};

module.exports = statisticsCalculator;