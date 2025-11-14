# Feature Specification: Complex Numbers Arithmetic Library

## User Stories

### User Story 1 - Create Complex Numbers

**Acceptance Scenarios**:

1. **Given** a developer needs to represent a complex number, **When** they create a complex number with real part 3 and imaginary part 4, **Then** the complex number object should store both components correctly
2. **Given** a developer provides only a real part, **When** they create a complex number with value 5, **Then** the complex number should have real part 5 and imaginary part 0
3. **Given** invalid input is provided, **When** a developer attempts to create a complex number with non-numeric values, **Then** an error should be thrown with a descriptive message

---

### User Story 2 - Perform Basic Arithmetic Operations

**Acceptance Scenarios**:

1. **Given** two complex numbers (3+4i) and (1+2i), **When** they are added together, **Then** the result should be (4+6i)
2. **Given** two complex numbers (5+3i) and (2+1i), **When** the first is subtracted by the second, **Then** the result should be (3+2i)
3. **Given** two complex numbers (1+2i) and (3+4i), **When** they are multiplied, **Then** the result should be (-5+10i) following the formula (a+bi)(c+di) = (ac-bd)+(ad+bc)i
4. **Given** a complex number (6+8i) and a divisor (1+1i), **When** division is performed, **Then** the result should be (7+1i)
5. **Given** a complex number and a zero divisor (0+0i), **When** division is attempted, **Then** an error should be thrown indicating division by zero

---

### User Story 3 - Calculate Complex Number Properties

**Acceptance Scenarios**:

1. **Given** a complex number (3+4i), **When** the magnitude is calculated, **Then** the result should be 5 (sqrt(3²+4²))
2. **Given** a complex number (1+1i), **When** the phase/argument is calculated, **Then** the result should be π/4 radians (or 45 degrees)
3. **Given** a complex number (3+4i), **When** the conjugate is calculated, **Then** the result should be (3-4i)
4. **Given** a complex number (0+0i), **When** the phase is requested, **Then** the phase should be 0 or handle as a special case

---

### User Story 4 - Convert Between Representations

**Acceptance Scenarios**:

1. **Given** a complex number in Cartesian form (1+1i), **When** converted to polar form, **Then** the result should show magnitude √2 and phase π/4
2. **Given** polar coordinates with magnitude 2 and phase π/3, **When** creating a complex number from polar form, **Then** the Cartesian form should be (1+√3i)
3. **Given** a complex number, **When** it is formatted as a string, **Then** it should display in readable format like "3+4i" or "3-4i"

---

### User Story 5 - Handle Edge Cases

**Acceptance Scenarios**:

1. **Given** operations on complex numbers, **When** results involve very small or very large numbers, **Then** the system should handle floating-point precision appropriately
2. **Given** a complex number with zero imaginary part (5+0i), **When** displayed, **Then** it should format appropriately as "5" or "5+0i"
3. **Given** a complex number with zero real part (0+3i), **When** displayed, **Then** it should format appropriately as "3i"
4. **Given** non-finite values (NaN, Infinity), **When** attempting to create or operate on complex numbers, **Then** appropriate errors should be thrown

---

## Requirements

### Functional Requirements

1. **Complex Number Representation**
   - Implement a TypeScript class/object to represent complex numbers with real and imaginary components
   - Support creation from Cartesian coordinates (real, imaginary)
   - Support creation from polar coordinates (magnitude, phase)
   - Both real and imaginary parts must be finite numbers

2. **Arithmetic Operations**
   - Addition: (a+bi) + (c+di) = (a+c) + (b+d)i
   - Subtraction: (a+bi) - (c+di) = (a-c) + (b-d)i
   - Multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i
   - Division: (a+bi)/(c+di) = [(ac+bd)/(c²+d²)] + [(bc-ad)/(c²+d²)]i
   - All operations should return new complex number instances

3. **Properties and Derived Values**
   - Magnitude (absolute value): |a+bi| = √(a²+b²)
   - Phase (argument): arg(a+bi) = atan2(b, a)
   - Conjugate: conj(a+bi) = a-bi
   - Real part accessor
   - Imaginary part accessor

4. **String Representation**
   - Format complex numbers as readable strings
   - Handle positive/negative imaginary parts appropriately (e.g., "3+4i", "3-4i")
   - Handle edge cases: pure real numbers (b=0), pure imaginary (a=0)

5. **Input Validation**
   - Validate that real and imaginary parts are numbers
   - Validate that inputs are finite (not NaN or Infinity)
   - Throw descriptive errors for invalid inputs
   - Validate division by zero (0+0i)

6. **Type Safety**
   - Use TypeScript type annotations for all methods
   - Define clear interfaces/types for complex numbers
   - Ensure type safety across all operations

### Non-Functional Requirements

1. **Code Quality**
   - Follow existing TypeScript code style in the repository
   - Match error handling patterns from existing basicMath.ts
   - Include comprehensive type definitions
   - Use class-based approach consistent with TypeScript conventions

2. **Performance**
   - Operations should be computationally efficient
   - Avoid unnecessary object creation
   - Use standard mathematical formulas

3. **Maintainability**
   - Code should be well-documented with JSDoc comments
   - Follow single responsibility principle
   - Keep methods concise and focused
   - Consistent naming conventions

4. **Compatibility**
   - Implement in TypeScript following ES6+ standards
   - Place in a new file: `typescript/complexNumbers.ts`
   - Should compile without errors
   - Compatible with existing build/test infrastructure

## Success Criteria

1. **Completeness**
   - All basic arithmetic operations (add, subtract, multiply, divide) are implemented
   - All required properties (magnitude, phase, conjugate) are implemented
   - Both Cartesian and polar representations are supported
   - String formatting is implemented

2. **Correctness**
   - All mathematical operations produce mathematically correct results
   - Complex number identities hold (e.g., z * conj(z) = |z|²)
   - Edge cases are handled correctly (zero values, division by zero)
   - Floating-point precision is handled appropriately

3. **Robustness**
   - Invalid inputs are rejected with clear error messages
   - Division by zero is prevented
   - Non-finite values (NaN, Infinity) are rejected
   - Error handling is consistent with existing codebase patterns

4. **Code Quality**
   - TypeScript compiles without errors or warnings
   - Code follows existing repository style and conventions
   - All public methods have proper type annotations
   - Code is documented with clear comments

5. **Usability**
   - API is intuitive and easy to use
   - String representation is human-readable
   - Complex numbers can be created easily from both Cartesian and polar forms
   - Method names are clear and follow mathematical conventions

6. **Testability**
   - Code structure allows for comprehensive unit testing
   - All operations can be verified with known mathematical results
   - Edge cases can be tested systematically
