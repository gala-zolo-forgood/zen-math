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
  }
};

module.exports = statisticsCalculator;