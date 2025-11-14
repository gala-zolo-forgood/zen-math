# Technical Specification: Complex Numbers Arithmetic Library

## Technical Context

**Language/Version**: TypeScript (ES6+), targeting Node.js 20

**Primary Dependencies**:
- TypeScript compiler (installed globally via npm)
- No external runtime dependencies required
- Uses built-in JavaScript Math library for mathematical operations

**Project Structure**:
- Simple multi-language math utilities repository
- TypeScript files located in `typescript/` directory
- No formal test framework - verification via compilation and execution
- CI/CD via GitHub Actions (`.github/workflows/main.yml`)

**Existing Code Patterns** (from `typescript/basicMath.ts` and `typescript/geometryUtils.ts`):
- Static class-based approach with static methods
- Simple error handling with descriptive Error messages
- Pure functions with no side effects
- Type annotations on all parameters and return types
- No JSDoc comments in existing code
- Direct TypeScript compilation with `tsc --noEmit` for validation

## Technical Implementation Brief

The complex numbers library will be implemented as a TypeScript class following the existing codebase patterns:

1. **Class Structure**: Create a `ComplexNumber` class (not static like BasicMath/GeometryUtils) since complex numbers are stateful objects representing mathematical entities

2. **Immutability**: All arithmetic operations return new `ComplexNumber` instances rather than mutating existing ones, following functional programming principles

3. **Constructor Overloading**: Use TypeScript method overloading or optional parameters to support both Cartesian (real, imaginary) and polar (magnitude, phase) construction patterns

4. **Validation Strategy**: Follow the error handling pattern from `basicMath.ts:15-17` - validate inputs and throw descriptive Error objects for:
   - Non-numeric inputs
   - Non-finite values (NaN, Infinity)
   - Division by zero

5. **Mathematical Operations**: Implement using standard complex number formulas:
   - Addition/Subtraction: Component-wise operations
   - Multiplication: FOIL expansion with i² = -1
   - Division: Multiply by conjugate of denominator

6. **Property Calculations**: Use JavaScript Math library:
   - Magnitude: `Math.sqrt()` and `Math.pow()`
   - Phase: `Math.atan2()`
   - Conjugate: Simple negation

7. **String Formatting**: Implement intelligent formatting with edge case handling for zero components

## Source Code Structure

```
typescript/
├── basicMath.ts           (existing)
├── geometryUtils.ts       (existing)
├── statisticsCalculator.ts (existing)
└── complexNumbers.ts      (NEW - to be created)
```

**File**: `typescript/complexNumbers.ts`

**Class Structure**:
```typescript
export class ComplexNumber {
  // Private fields
  private readonly real: number;
  private readonly imag: number;

  // Constructor (Cartesian)
  constructor(real: number, imaginary?: number)

  // Static factory for polar form
  static fromPolar(magnitude: number, phase: number): ComplexNumber

  // Accessors
  getReal(): number
  getImaginary(): number

  // Arithmetic operations
  add(other: ComplexNumber): ComplexNumber
  subtract(other: ComplexNumber): ComplexNumber
  multiply(other: ComplexNumber): ComplexNumber
  divide(other: ComplexNumber): ComplexNumber

  // Properties
  magnitude(): number
  phase(): number
  conjugate(): ComplexNumber

  // Conversion
  toPolar(): { magnitude: number; phase: number }
  toString(): string
}
```

## Contracts

### Data Model

**Class: ComplexNumber**

**Private Fields**:
- `real: number` - Real component, must be finite number
- `imag: number` - Imaginary component, must be finite number

**Constructor Signature**:
```typescript
constructor(real: number, imaginary?: number)
```
- `real`: Real component (required)
- `imaginary`: Imaginary component (optional, defaults to 0)
- Throws `Error` if inputs are not finite numbers

**Static Factory Method**:
```typescript
static fromPolar(magnitude: number, phase: number): ComplexNumber
```
- `magnitude`: Distance from origin (r ≥ 0)
- `phase`: Angle in radians (θ)
- Returns ComplexNumber with `real = r*cos(θ)`, `imag = r*sin(θ)`
- Throws `Error` if inputs are not finite numbers

**Public Methods**:

```typescript
// Accessors
getReal(): number                    // Returns real component
getImaginary(): number               // Returns imaginary component

// Arithmetic (all return new ComplexNumber instances)
add(other: ComplexNumber): ComplexNumber
subtract(other: ComplexNumber): ComplexNumber
multiply(other: ComplexNumber): ComplexNumber
divide(other: ComplexNumber): ComplexNumber  // Throws Error if other is (0+0i)

// Properties
magnitude(): number                  // Returns √(real² + imag²)
phase(): number                      // Returns atan2(imag, real) in radians
conjugate(): ComplexNumber           // Returns new ComplexNumber(real, -imag)

// Conversion
toPolar(): { magnitude: number; phase: number }
toString(): string                   // Returns formatted string like "3+4i"
```

### Mathematical Formulas

**Addition**: `(a+bi) + (c+di) = (a+c) + (b+d)i`

**Subtraction**: `(a+bi) - (c+di) = (a-c) + (b-d)i`

**Multiplication**: `(a+bi)(c+di) = (ac-bd) + (ad+bc)i`

**Division**: `(a+bi)/(c+di) = [(ac+bd)/(c²+d²)] + [(bc-ad)/(c²+d²)]i`
- Constraint: `c² + d² ≠ 0`

**Magnitude**: `|a+bi| = √(a²+b²)`

**Phase**: `arg(a+bi) = atan2(b, a)`

**Conjugate**: `conj(a+bi) = a-bi`

**Polar to Cartesian**: `r∠θ = r*cos(θ) + r*sin(θ)i`

### Error Conditions

1. **Invalid Input**: Throw `Error("Real part must be a finite number")` or `Error("Imaginary part must be a finite number")`
2. **Division by Zero**: Throw `Error("Division by zero complex number")`
3. **NaN/Infinity**: Throw appropriate error during construction or polar conversion

## Delivery Phases

### Phase 1: Core Complex Number Class with Basic Construction
**Deliverable**: ComplexNumber class with:
- Constructor for Cartesian form
- Input validation
- Accessor methods (getReal, getImaginary)
- Basic toString() method

**Verification**:
- TypeScript compilation succeeds
- Manual test script creates complex numbers and prints values

### Phase 2: Arithmetic Operations
**Deliverable**: Add arithmetic methods:
- add()
- subtract()
- multiply()
- divide() with zero-division check

**Verification**:
- TypeScript compilation succeeds
- Test script verifies mathematical correctness with known examples
- Division by zero properly throws error

### Phase 3: Properties and Derived Values
**Deliverable**: Add property methods:
- magnitude()
- phase()
- conjugate()

**Verification**:
- TypeScript compilation succeeds
- Test script verifies mathematical identities (e.g., z * conj(z) = |z|²)

### Phase 4: Polar Form Support
**Deliverable**: Add polar form methods:
- static fromPolar() factory
- toPolar() conversion method

**Verification**:
- TypeScript compilation succeeds
- Test script verifies round-trip conversion (Cartesian → Polar → Cartesian)

### Phase 5: Enhanced String Formatting
**Deliverable**: Improve toString() with edge cases:
- Pure real numbers (0i)
- Pure imaginary numbers (0 real part)
- Negative imaginary handling

**Verification**:
- Test script verifies string formatting for all edge cases
- Output is human-readable

## Verification Strategy

### Built-in Verification Tools

1. **TypeScript Compilation**:
   ```bash
   tsc --noEmit typescript/complexNumbers.ts
   ```
   - Must compile without errors
   - Verifies type safety and syntax

2. **CI Integration**:
   - Existing CI workflow (`.github/workflows/main.yml`) already runs TypeScript compilation
   - Add `typescript/complexNumbers.ts` to the compiled files (included in `typescript/*.ts` glob)

### Helper Scripts

Since the project has no formal test framework, create manual test scripts for verification:

#### Script 1: `typescript/testComplexNumbers.ts`
**Purpose**: Comprehensive test script to verify all functionality
**Generated in**: Phase 1 (extended in subsequent phases)

**Test Coverage**:
- Construction (Cartesian and polar)
- Input validation (invalid/non-finite values)
- Arithmetic operations with known results
- Mathematical identities:
  - `z + 0 = z`
  - `z * 1 = z`
  - `z * conj(z) = |z|²`
  - `z / z = 1` (for non-zero z)
- Property calculations (magnitude, phase, conjugate)
- Round-trip conversions (Cartesian ↔ Polar)
- String formatting edge cases
- Division by zero error

**Execution**:
```bash
tsc typescript/testComplexNumbers.ts && node typescript/testComplexNumbers.js
```

**Success Criteria**: All test cases print "PASS", no "FAIL" outputs

#### Script 2: `typescript/complexVerification.ts`
**Purpose**: Interactive script for manual testing and exploration
**Generated in**: Phase 2

**Features**:
- Accept user input for complex number operations
- Display results in both Cartesian and polar forms
- Useful for ad-hoc testing during development

### Sample Test Cases

**File**: `typescript/testComplexNumbers.ts` (to be generated)

```typescript
// Test case examples to be implemented:

// Construction
const z1 = new ComplexNumber(3, 4);  // 3+4i
const z2 = new ComplexNumber(1, 2);  // 1+2i
const z3 = new ComplexNumber(5);     // 5+0i

// Addition: (3+4i) + (1+2i) = 4+6i
const sum = z1.add(z2);
assert(sum.getReal() === 4 && sum.getImaginary() === 6);

// Multiplication: (1+2i) * (3+4i) = -5+10i
const product = z2.multiply(z1);
assert(product.getReal() === -5 && product.getImaginary() === 10);

// Magnitude: |3+4i| = 5
assert(z1.magnitude() === 5);

// Division by zero
try {
  z1.divide(new ComplexNumber(0, 0));
  assert(false, "Should throw error");
} catch (e) {
  assert(e.message.includes("Division by zero"));
}

// Polar conversion
const polar = ComplexNumber.fromPolar(Math.sqrt(2), Math.PI / 4);
assert(Math.abs(polar.getReal() - 1) < 0.0001);  // ~1
assert(Math.abs(polar.getImaginary() - 1) < 0.0001);  // ~1

// String formatting
assert(z1.toString() === "3+4i");
assert(new ComplexNumber(3, -4).toString() === "3-4i");
assert(new ComplexNumber(0, 3).toString() === "3i");
assert(new ComplexNumber(5, 0).toString() === "5");
```

### MCP Servers

**No MCP servers required** for this implementation. The verification can be fully accomplished with:
- Built-in TypeScript compiler
- Node.js for running test scripts
- Standard bash commands

The project's simple structure (no external test frameworks, no databases, no APIs) means all verification is self-contained.

### Sample Input Artifacts

**All artifacts can be generated by the agent**:

1. **Test Script** (`typescript/testComplexNumbers.ts`):
   - Generated in Phase 1
   - Contains all test cases with known mathematical results
   - No external input required

2. **Verification Helper** (`typescript/complexVerification.ts`):
   - Generated in Phase 2
   - Interactive script for manual testing
   - No pre-existing artifacts needed

3. **Test Data**:
   - All test data uses well-known complex number examples from mathematics:
     - (3+4i): Classic 3-4-5 triangle, magnitude = 5
     - (1+i): 45-degree angle, useful for polar conversion
     - (1+2i), (3+4i): Standard examples from requirements
   - No external data files required

### Verification Workflow

**For Each Phase**:

1. **Compile Check**:
   ```bash
   tsc --noEmit typescript/complexNumbers.ts
   ```
   Exit code must be 0

2. **Run Test Script**:
   ```bash
   tsc typescript/testComplexNumbers.ts && node typescript/testComplexNumbers.js
   ```
   Output must show all tests passing

3. **Visual Inspection**:
   - Check toString() output formatting
   - Verify error messages are descriptive

4. **Mathematical Verification**:
   - Use calculator or Python REPL to verify complex number results
   - Confirm against known mathematical identities

**Final Verification** (All Phases Complete):
- All TypeScript files compile without errors
- Test script shows 100% pass rate
- CI workflow passes (GitHub Actions)
- Manual testing of edge cases succeeds
- Code follows existing style patterns from `basicMath.ts`

### Success Metrics

- **Correctness**: All arithmetic operations match mathematical formulas within floating-point precision (< 1e-10 tolerance)
- **Robustness**: Invalid inputs rejected with clear error messages
- **Completeness**: All requirements from PRD implemented
- **Quality**: TypeScript compilation succeeds with no errors or warnings
- **Consistency**: Code style matches existing TypeScript files in repository
