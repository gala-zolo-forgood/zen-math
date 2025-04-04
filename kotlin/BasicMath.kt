package kotlin

object BasicMath {
    fun add(a: Int, b: Int): Int = a + b
    
    fun subtract(a: Int, b: Int): Int = a - b
    
    fun multiply(a: Int, b: Int): Int = a * b
    
    fun divide(a: Int, b: Int): Double {
        require(b != 0) { "Division by zero" }
        return a.toDouble() / b
    }
    
    fun power(base: Int, exponent: Int): Int {
        require(exponent >= 0) { "Negative exponent not supported" }
        
        var result = 1
        for (i in 0 until exponent) {
            result *= base
        }
        return result
    }
    
    fun factorial(n: Int): Long {
        require(n >= 0) { "Factorial not defined for negative numbers" }
        
        var result: Long = 1
        for (i in 2..n) {
            result *= i
        }
        return result
    }
}