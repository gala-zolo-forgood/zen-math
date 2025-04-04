import math
from collections import Counter

def calculate_mean(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    return sum(numbers) / len(numbers)

def calculate_median(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    sorted_numbers = sorted(numbers)
    n = len(sorted_numbers)
    
    if n % 2 == 0:
        return (sorted_numbers[n // 2 - 1] + sorted_numbers[n // 2]) / 2
    else:
        return sorted_numbers[n // 2]

def calculate_variance(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    mean = calculate_mean(numbers)
    return sum((x - mean) ** 2 for x in numbers) / len(numbers)

def calculate_standard_deviation(numbers):
    return math.sqrt(calculate_variance(numbers))

def calculate_mode(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    counter = Counter(numbers)
    max_frequency = max(counter.values())
    
    return [num for num, freq in counter.items() if freq == max_frequency]

def calculate_range(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    return max(numbers) - min(numbers)

def calculate_quartiles(numbers):
    if not numbers:
        raise ValueError("Empty list")
    
    sorted_numbers = sorted(numbers)
    n = len(sorted_numbers)
    
    q2 = calculate_median(sorted_numbers)
    
    if n % 2 == 0:
        q1 = calculate_median(sorted_numbers[:n // 2])
        q3 = calculate_median(sorted_numbers[n // 2:])
    else:
        q1 = calculate_median(sorted_numbers[:n // 2])
        q3 = calculate_median(sorted_numbers[n // 2 + 1:])
    
    return q1, q2, q3

def calculate_interquartile_range(numbers):
    q1, _, q3 = calculate_quartiles(numbers)
    return q3 - q1