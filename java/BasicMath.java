package java;

public class BasicMath {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int subtract(int a, int b) {
        return a - b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
    
    public static double divide(int a, int b) {
        return (double) a / b;
    }
    
    public static int power(int base, int exponent) {
        if (exponent < 0) {
            throw new IllegalArgumentException("Negative exponent not supported");
        }
        
        int result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }

    public static int factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("Negative numbers not supported!");
        }
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
