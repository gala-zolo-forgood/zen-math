package java;

import java.util.Arrays;

public class StatisticsCalculator {
    public static double calculateMean(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Empty array");
        }
        
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        
        return (double) sum / numbers.length;
    }
    
    public static double calculateMedian(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Empty array");
        }
        
        int[] sortedNumbers = Arrays.copyOf(numbers, numbers.length);
        Arrays.sort(sortedNumbers);
        
        if (sortedNumbers.length % 2 == 0) {
            int midIndex = sortedNumbers.length / 2;
            return (sortedNumbers[midIndex - 1] + sortedNumbers[midIndex]) / 2.0;
        } else {
            return sortedNumbers[sortedNumbers.length / 2];
        }
    }
    
    public static double calculateVariance(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Empty array");
        }
        
        double mean = calculateMean(numbers);
        double sumOfSquaredDifferences = 0;
        
        for (int number : numbers) {
            sumOfSquaredDifferences += Math.pow(number - mean, 2);
        }
        
        return sumOfSquaredDifferences / numbers.length;
    }
    
    public static double calculateStandardDeviation(int[] numbers) {
        return Math.sqrt(calculateVariance(numbers));
    }
}