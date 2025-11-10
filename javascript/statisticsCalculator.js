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

  calculateRange: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return max - min;
  },

  calculateQuartiles: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const n = sortedNumbers.length;
    
    const q1Index = (n + 1) / 4;
    const q2Index = (n + 1) / 2;
    const q3Index = 3 * (n + 1) / 4;
    
    const getQuartile = (index) => {
      if (index % 1 === 0) {
        return sortedNumbers[index - 1];
      } else {
        const lower = Math.floor(index) - 1;
        const upper = Math.ceil(index) - 1;
        const fraction = index % 1;
        return sortedNumbers[lower] + fraction * (sortedNumbers[upper] - sortedNumbers[lower]);
      }
    };
    
    return {
      q1: getQuartile(q1Index),
      q2: this.calculateMedian(numbers),
      q3: getQuartile(q3Index)
    };
  },

  calculateIQR: function(numbers) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    
    const quartiles = this.calculateQuartiles(numbers);
    return quartiles.q3 - quartiles.q1;
  },

  calculatePercentile: function(numbers, percentile) {
    if (numbers.length === 0) {
      throw new Error("Empty array");
    }
    if (percentile < 0 || percentile > 100) {
      throw new Error("Percentile must be between 0 and 100");
    }
    
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const n = sortedNumbers.length;
    const index = (percentile / 100) * (n - 1);
    
    if (index % 1 === 0) {
      return sortedNumbers[index];
    } else {
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const fraction = index % 1;
      return sortedNumbers[lower] + fraction * (sortedNumbers[upper] - sortedNumbers[lower]);
    }
  },

};

module.exports = statisticsCalculator;