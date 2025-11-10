const statisticsCalculator = {
  calculateMean: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
  },
  
  calculateMedian: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    if (sortedNumbers.length % 2 === 0) {
      const midIndex = sortedNumbers.length / 2;
      return (sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2;
    } else {
      return sortedNumbers[Math.floor(sortedNumbers.length / 2)];
    }
  },
  
  calculateVariance: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const mean = this.calculateMean(numbers);
    const sumOfSquaredDifferences = numbers.reduce((acc, val) => {
      return acc + Math.pow(val - mean, 2);
    }, 0);
    
    return sumOfSquaredDifferences / numbers.length;
  },
  
  calculateStandardDeviation: function(numbers) {
    return Math.sqrt(this.calculateVariance(numbers));
  },
  
  calculateMode: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];
    
    numbers.forEach(num => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
      
      if (frequencyMap[num] > maxFrequency) {
        maxFrequency = frequencyMap[num];
        modes = [num];
      } else if (frequencyMap[num] === maxFrequency) {
        modes.push(num);
      }
    });
    
    return modes;
  },

  calculateSkewness: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    if (numbers.length < 3) {
      throw new Error("Skewness requires at least 3 data points");
    }
    
    const mean = this.calculateMean(numbers);
    const stdDev = this.calculateStandardDeviation(numbers);
    const n = numbers.length;
    
    const sumCubedDeviations = numbers.reduce((acc, val) => {
      return acc + Math.pow((val - mean) / stdDev, 3);
    }, 0);
    
    return (n / ((n - 1) * (n - 2))) * sumCubedDeviations;
  },

  calculateKurtosis: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    if (numbers.length < 4) {
      throw new Error("Kurtosis requires at least 4 data points");
    }
    
    const mean = this.calculateMean(numbers);
    const stdDev = this.calculateStandardDeviation(numbers);
    const n = numbers.length;
    
    const sumFourthPowerDeviations = numbers.reduce((acc, val) => {
      return acc + Math.pow((val - mean) / stdDev, 4);
    }, 0);
    
    const kurtosis = (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * sumFourthPowerDeviations;
    const correction = 3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3));
    
    return kurtosis - correction;
  }
};

module.exports = statisticsCalculator;