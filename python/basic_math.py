import math

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero")
    return a / b

def power(base, exponent):
    if exponent < 0:
        raise ValueError("Negative exponent not supported")
    
    result = 1
    for _ in range(exponent):
        result *= base
    return result

def factorial(n):
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def gcd(a, b):
    a, b = abs(a), abs(b)
    
    while b:
        a, b = b, a % b
    
    return a

def lcm(a, b):
    return abs(a * b) // gcd(a, b)

def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    
    return True