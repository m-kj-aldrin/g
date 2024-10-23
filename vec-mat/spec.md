# JavaScript Vector and Matrix Library Specification

This specification outlines a comprehensive JavaScript library for vector, matrix, and quaternion operations, providing robust mathematical tools essential for graphics, physics simulations, and computational applications. The library includes the following classes: `Vec2`, `Vec3`, `Vec4`, `Quat`, `Mat3`, and `Mat4`. Each class offers a rich set of **instance** and **static** methods, designed with consistency, clarity, and performance in mind. The library adheres to standardized naming conventions, thorough documentation, and robust error handling to ensure reliability and ease of use.

The library is designed to work with a **right-handed coordinate system**, ensuring compatibility with standard graphics conventions.

---

## Table of Contents

1. [Classes](#classes)
    - [Vec2](#vec2)
    - [Vec3](#vec3)
    - [Vec4](#vec4)
    - [Quat](#quat)
    - [Mat3](#mat3)
    - [Mat4](#mat4)
2. [Methods](#methods)
    - [Instance Methods](#instance-methods)
    - [Static Methods](#static-methods)
3. [Naming Conventions](#naming-conventions)
4. [Error Handling](#error-handling)
5. [Documentation](#documentation)
6. [Example Usage](#example-usage)
7. [Additional Considerations](#additional-considerations)

---

## Classes

### Vec2

**Description:** Represents a 2-dimensional vector in a right-handed coordinate system.

**Properties (with getters and setters):**

-   `x` (number): X-component.
-   `y` (number): Y-component.

**Constructor:**

```javascript
/**
 * Creates a new Vec2 instance.
 * @param {number} [x=0] - X-component.
 * @param {number} [y=0] - Y-component.
 */
constructor((x = 0), (y = 0));
```

### Vec3

**Description:** Represents a 3-dimensional vector in a right-handed coordinate system.

**Properties (with getters and setters):**

-   `x` (number): X-component.
-   `y` (number): Y-component.
-   `z` (number): Z-component.

**Constructor:**

```javascript
/**
 * Creates a new Vec3 instance.
 * @param {number} [x=0] - X-component.
 * @param {number} [y=0] - Y-component.
 * @param {number} [z=0] - Z-component.
 */
constructor((x = 0), (y = 0), (z = 0));
```

### Vec4

**Description:** Represents a 4-dimensional vector, often used for homogeneous coordinates in transformations.

**Properties (with getters and setters):**

-   `x` (number): X-component.
-   `y` (number): Y-component.
-   `z` (number): Z-component.
-   `w` (number): W-component.

**Constructor:**

```javascript
/**
 * Creates a new Vec4 instance.
 * @param {number} [x=0] - X-component.
 * @param {number} [y=0] - Y-component.
 * @param {number} [z=0] - Z-component.
 * @param {number} [w=0] - W-component.
 */
constructor((x = 0), (y = 0), (z = 0), (w = 0));
```

### Quat

**Description:** Represents a quaternion for handling rotations in a right-handed coordinate system.

**Properties (with getters and setters):**

-   `x` (number): X-component (imaginary part).
-   `y` (number): Y-component (imaginary part).
-   `z` (number): Z-component (imaginary part).
-   `w` (number): W-component (real part).

**Constructor:**

```javascript
/**
 * Creates a new Quat instance.
 * @param {number} [x=0] - X-component.
 * @param {number} [y=0] - Y-component.
 * @param {number} [z=0] - Z-component.
 * @param {number} [w=1] - W-component.
 */
constructor((x = 0), (y = 0), (z = 0), (w = 1));
```

### Mat3

**Description:** Represents a 3x3 matrix.

**Properties:**

-   `elements` (Float32Array): Matrix elements in column-major order.

**Constructor:**

```javascript
/**
 * Creates a new Mat3 instance.
 * @param {Float32Array | number[]} [elements] - Optional array of 9 elements in column-major order.
 */
constructor((elements = new Float32Array(9).fill(0)));
```

### Mat4

**Description:** Represents a 4x4 matrix.

**Properties:**

-   `elements` (Float32Array): Matrix elements in column-major order.

**Constructor:**

```javascript
/**
 * Creates a new Mat4 instance.
 * @param {Float32Array | number[]} [elements] - Optional array of 16 elements in column-major order.
 */
constructor((elements = new Float32Array(16).fill(0)));
```

---

## Methods

### Instance Methods

**Definition:** Methods that operate on the instance, mutating it and returning `this` to allow method chaining.

#### Common Vector Methods (`Vec2`, `Vec3`, `Vec4`)

-   `clone()`: Creates a clone of this vector.
-   `add(other)`: Adds another vector to this vector.
-   `subtract(other)`: Subtracts another vector from this vector.
-   `multiply(other)`: Multiplies this vector by another vector component-wise.
-   `divide(other)`: Divides this vector by another vector component-wise.
-   `multiplyScalar(scalar)`: Multiplies this vector by a scalar.
-   `divideScalar(scalar)`: Divides this vector by a scalar.
-   `negate()`: Negates this vector (multiplies components by -1).
-   `normalize()`: Normalizes this vector to unit length. If the vector length is zero, throws an error.
-   `dot(other)`: Calculates the dot product with another vector.
-   `cross(other)` (`Vec3` only): Calculates the cross product with another `Vec3`.
-   `length()`: Returns the magnitude (length) of the vector.
-   `lengthSquared()`: Returns the squared magnitude of the vector.
-   `distanceTo(other)`: Computes the distance to another vector.
-   `distanceSquaredTo(other)`: Computes the squared distance to another vector.
-   `angleTo(other)`: Calculates the angle to another vector (in radians). Throws an error if either vector has zero length.
-   `lerp(other, t)`: Linearly interpolates between this vector and another vector by factor `t`.
-   `transform(matrix)`:
    -   `Vec2`: Transforms using a `Mat3`.
    -   `Vec3`: Transforms using a `Mat4`. The vector is treated as a position vector with `w = 1`.
    -   `Vec4`: Transforms using a `Mat4`.
-   `projectOnVector(vector)`: Projects this vector onto another vector.
-   `projectOnPlane(normal)` (`Vec3`, `Vec4` only): Projects this vector onto a plane defined by a normal.
-   `reflect(normal)`: Reflects the vector around a given normal.
-   `angle()` (`Vec2` only): Returns the angle between this vector and the positive X-axis.
-   `rotate(angle)` (`Vec2` only): Rotates the vector by a given angle (in radians).
-   `equals(other)`: Checks if this vector equals another vector.
-   `min(other)`: Sets each component to the minimum of itself and the corresponding component of another vector.
-   `max(other)`: Sets each component to the maximum of itself and the corresponding component of another vector.
-   `clamp(minVec, maxVec)`: Clamps this vector's components between the components of `minVec` and `maxVec`.
-   `setLength(length)`: Sets the length of this vector to the given value.
-   `toArray()`: Converts this vector to an array.
-   `fromArray(array)`: Sets the components of this vector from an array.
-   `toString()`: Returns a string representation of the vector.

#### Quaternion Methods (`Quat`)

-   `clone()`: Creates a clone of this quaternion.
-   `add(other)`: Adds another quaternion to this quaternion.
-   `multiply(other)`: Multiplies this quaternion by another quaternion.
-   `multiplyScalar(scalar)`: Multiplies this quaternion by a scalar.
-   `normalize()`: Normalizes this quaternion. If the quaternion length is zero, throws an error.
-   `invert()`: Inverts this quaternion.
-   `conjugate()`: Conjugates this quaternion.
-   `dot(other)`: Calculates the dot product with another quaternion.
-   `length()`: Returns the magnitude of the quaternion.
-   `lengthSquared()`: Returns the squared magnitude of the quaternion.
-   `slerp(other, t)`: Performs spherical linear interpolation towards another quaternion by factor `t`.
-   `rotateBy(quaternion)`: Applies another quaternion rotation to this quaternion.
-   `setFromAxisAngle(axis, angle)`: Sets this quaternion from an axis-angle representation.
-   `setFromEuler(euler)`: Sets this quaternion from Euler angles.
-   `setFromRotationMatrix(matrix)` (`Mat3` or `Mat4`): Sets this quaternion from a rotation matrix.
-   `toRotationMatrix()` (`Mat3` or `Mat4`): Converts this quaternion to a rotation matrix.
-   `toEuler()`: Converts this quaternion to Euler angles.
-   `equals(other)`: Checks if this quaternion equals another quaternion.
-   `toArray()`: Converts this quaternion to an array.
-   `fromArray(array)`: Sets the components of this quaternion from an array.
-   `toString()`: Returns a string representation of the quaternion.

#### Matrix Methods (`Mat3`, `Mat4`)

-   `identity()`: Resets this matrix to the identity matrix.
-   `clone()`: Creates a clone of this matrix.
-   `multiply(other)`:
    -   `Mat3`: Multiplies this matrix by another `Mat3`.
    -   `Mat4`: Multiplies this matrix by another `Mat4`.
-   `premultiply(other)`:
    -   `Mat3`: Multiplies another `Mat3` by this matrix.
    -   `Mat4`: Multiplies another `Mat4` by this matrix.
-   `multiplyScalar(scalar)`: Multiplies this matrix by a scalar.
-   `transpose()`: Transposes this matrix.
-   `invert()`: Inverts this matrix. Throws an error if the matrix is not invertible.
-   `determinant()`: Calculates the determinant of this matrix.
-   `scale(vector)`:
    -   `Mat3`: Accepts `Vec2`.
    -   `Mat4`: Accepts `Vec3`.
-   `translate(vector)`:
    -   `Mat3`: Accepts `Vec2`.
    -   `Mat4`: Accepts `Vec3`.
-   `rotate(angle)` (`Mat3` only): Rotates the matrix around the Z-axis by the given angle (in radians).
-   `rotate(angle, axis)` (`Mat4` only): Rotates the matrix around the given axis (`Vec3`) by the given angle (in radians).
-   `rotateByQuaternion(quaternion)` (`Mat4` only): Rotates the matrix using a quaternion.
-   `rotateX(angle)` (`Mat4` only): Applies rotation around the X-axis.
-   `rotateY(angle)` (`Mat4` only): Applies rotation around the Y-axis.
-   `rotateZ(angle)` (`Mat4` only): Applies rotation around the Z-axis.
-   `lookAt(eye, target, up)` (`Mat4` only): Sets this matrix as a look-at matrix.
-   `compose(position, quaternion, scale)` (`Mat4` only): Composes this matrix from position, quaternion, and scale.
-   `decompose(position, quaternion, scale)` (`Mat4` only): Decomposes this matrix into position, quaternion, and scale.
-   `setPosition(position)` (`Mat4` only): Sets the position component of this matrix.
-   `equals(other)`: Checks if this matrix equals another matrix.
-   `makePerspective(fov, aspect, near, far)` (`Mat4` only): Sets this matrix to a perspective projection matrix.
-   `makeOrthographic(left, right, top, bottom, near, far)` (`Mat4` only): Sets this matrix to an orthographic projection matrix.
-   `toArray()`: Converts this matrix to an array.
-   `fromArray(array)`: Sets the elements of this matrix from an array. Elements should be in column-major order.
-   `toString()`: Returns a string representation of the matrix.

### Static Methods

**Definition:** Methods that perform operations without altering instances, returning new objects.

#### Common Vector Static Methods

-   `add(v1, v2)`: Adds two vectors and returns a new vector.
-   `subtract(v1, v2)`: Subtracts `v2` from `v1` and returns a new vector.
-   `multiply(v1, v2)`: Multiplies two vectors component-wise and returns a new vector.
-   `divide(v1, v2)`: Divides `v1` by `v2` component-wise and returns a new vector.
-   `multiplyScalar(v, scalar)`: Multiplies a vector by a scalar and returns a new vector.
-   `divideScalar(v, scalar)`: Divides a vector by a scalar and returns a new vector.
-   `negate(v)`: Returns the negation of a vector.
-   `normalize(v)`: Normalizes a vector and returns a new vector. Throws an error if the vector length is zero.
-   `dot(v1, v2)`: Calculates the dot product of two vectors.
-   `cross(v1, v2)` (`Vec3` only): Calculates the cross product of two `Vec3` vectors.
-   `distance(v1, v2)`: Computes the distance between two vectors.
-   `distanceSquared(v1, v2)`: Computes the squared distance between two vectors.
-   `angleBetween(v1, v2)`: Calculates the angle between two vectors (in radians). Throws an error if either vector has zero length.
-   `lerp(v1, v2, t)`: Linearly interpolates between two vectors by factor `t` and returns a new vector.
-   `projectOnVector(v, target)`: Projects vector `v` onto `target`.
-   `projectOnPlane(v, normal)` (`Vec3`, `Vec4` only): Projects vector `v` onto a plane defined by `normal`.
-   `reflect(v, normal)`: Reflects vector `v` around a given `normal`.
-   `min(v1, v2)`: Returns a new vector with the minimum components of `v1` and `v2`.
-   `max(v1, v2)`: Returns a new vector with the maximum components of `v1` and `v2`.
-   `clamp(v, minVec, maxVec)`: Clamps the components of vector `v` between `minVec` and `maxVec` and returns a new vector.
-   `setLength(v, length)`: Returns a new vector with the specified length.
-   `fromArray(array)`: Creates a vector from an array.
-   `fromObject(object)`: Creates a vector from an object with relevant component properties.
-   `catmullRom(v0, v1, v2, v3, t)`: Performs Catmull-Rom spline interpolation.

#### Quaternion Static Methods

-   `add(q1, q2)`: Adds two quaternions and returns a new quaternion.
-   `multiply(q1, q2)`: Multiplies two quaternions and returns a new quaternion.
-   `multiplyScalar(q, scalar)`: Multiplies a quaternion by a scalar and returns a new quaternion.
-   `normalize(q)`: Normalizes a quaternion and returns a new quaternion. Throws an error if the quaternion length is zero.
-   `invert(q)`: Inverts a quaternion and returns a new quaternion.
-   `conjugate(q)`: Conjugates a quaternion and returns a new quaternion.
-   `dot(q1, q2)`: Calculates the dot product of two quaternions.
-   `length(q)`: Returns the magnitude of a quaternion.
-   `lengthSquared(q)`: Returns the squared magnitude of a quaternion.
-   `slerp(q1, q2, t)`: Performs spherical linear interpolation between two quaternions by factor `t`.
-   `fromAxisAngle(axis, angle)`: Creates a quaternion from an axis-angle representation.
-   `fromEuler(euler)`: Creates a quaternion from Euler angles.
-   `fromRotationMatrix(matrix)` (`Mat3` or `Mat4`): Creates a quaternion from a rotation matrix.
-   `toRotationMatrix(q)` (`Mat3` or `Mat4`): Converts a quaternion to a rotation matrix.
-   `toEuler(q)`: Converts a quaternion to Euler angles.
-   `equals(q1, q2)`: Checks if two quaternions are equal.
-   `fromArray(array)`: Creates a quaternion from an array.

#### Matrix Static Methods

-   `identity()`:
    -   `Mat3`: Returns a 3x3 identity matrix.
    -   `Mat4`: Returns a 4x4 identity matrix.
-   `multiply(m1, m2)`:
    -   `Mat3`: Multiplies two `Mat3` matrices and returns a new `Mat3`.
    -   `Mat4`: Multiplies two `Mat4` matrices and returns a new `Mat4`.
-   `multiplyScalar(matrix, scalar)`:
    -   `Mat3`: Multiplies a `Mat3` by a scalar and returns a new `Mat3`.
    -   `Mat4`: Multiplies a `Mat4` by a scalar and returns a new `Mat4`.
-   `transpose(matrix)`:
    -   `Mat3`: Transposes a `Mat3` and returns a new `Mat3`.
    -   `Mat4`: Transposes a `Mat4` and returns a new `Mat4`.
-   `invert(matrix)`:
    -   `Mat3`: Inverts a `Mat3` and returns a new `Mat3`. Throws an error if the matrix is not invertible.
    -   `Mat4`: Inverts a `Mat4` and returns a new `Mat4`. Throws an error if the matrix is not invertible.
-   `determinant(matrix)`:
    -   `Mat3`: Calculates the determinant of a `Mat3`.
    -   `Mat4`: Calculates the determinant of a `Mat4`.
-   `scale(matrix, vector)`:
    -   `Mat3`: Applies scaling using a `Vec2` and returns a new `Mat3`.
    -   `Mat4`: Applies scaling using a `Vec3` and returns a new `Mat4`.
-   `translate(matrix, vector)`:
    -   `Mat3`: Applies translation using a `Vec2` and returns a new `Mat3`.
    -   `Mat4`: Applies translation using a `Vec3` and returns a new `Mat4`.
-   `rotate(matrix, angle)` (`Mat3` only): Rotates a `Mat3` around the Z-axis by the given angle and returns a new `Mat3`.
-   `rotate(matrix, angle, axis)` (`Mat4` only): Rotates a `Mat4` around the given axis by the given angle and returns a new `Mat4`.
-   `rotateByQuaternion(matrix, quaternion)` (`Mat4` only): Rotates a `Mat4` using a quaternion and returns a new `Mat4`.
-   `rotateX(matrix, angle)` (`Mat4` only): Rotates a `Mat4` around the X-axis and returns a new `Mat4`.
-   `rotateY(matrix, angle)` (`Mat4` only): Rotates a `Mat4` around the Y-axis and returns a new `Mat4`.
-   `rotateZ(matrix, angle)` (`Mat4` only): Rotates a `Mat4` around the Z-axis and returns a new `Mat4`.
-   `fromQuaternion(quaternion)` (`Mat3` or `Mat4`): Creates a rotation matrix from a quaternion.
-   `lookAt(eye, target, up)` (`Mat4` only): Creates a look-at matrix.
-   `compose(position, quaternion, scale)` (`Mat4` only): Creates a transformation matrix from position, quaternion, and scale.
-   `decompose(matrix, position, quaternion, scale)` (`Mat4` only): Decomposes a transformation matrix into position, quaternion, and scale.
-   `makePerspective(fov, aspect, near, far)` (`Mat4` only): Creates a perspective projection matrix.
-   `makeOrthographic(left, right, top, bottom, near, far)` (`Mat4` only): Creates an orthographic projection matrix.
-   `fromArray(array)`:
    -   `Mat3`: Creates a `Mat3` from an array of 9 elements.
    -   `Mat4`: Creates a `Mat4` from an array of 16 elements.
-   `equals(m1, m2)`: Checks if two matrices are equal.

---

## Naming Conventions

-   **Method Names:** Use camelCase (e.g., `add`, `multiplyScalar`).
-   **Properties:** Use lowerCamelCase for properties (e.g., `elements`, `x`, `y`). Properties have getters and setters.
-   **Classes:** Use PascalCase for class names (e.g., `Vec3`, `Mat4`).
-   **Consistency:** Similar operations across classes use consistent names (e.g., `add`, `subtract`).

---

## Error Handling

Robust error handling ensures predictable behavior:

-   **Type Checking:** Validate input types and throw descriptive errors.

    ```javascript
    if (!(other instanceof Vec3)) {
        throw new TypeError('Parameter "other" must be an instance of Vec3.');
    }
    ```

-   **Value Checking:** Validate numerical inputs (e.g., check for division by zero).

    ```javascript
    if (scalar === 0) {
        throw new Error("Division by zero.");
    }
    ```

-   **Method-Specific Errors:**

    -   **invert():** Verify invertibility (e.g., determinant ≠ 0). Throw errors if not.

        ```javascript
        if (determinant === 0) {
            throw new Error(
                "Matrix is not invertible because the determinant is zero."
            );
        }
        ```

-   **Boundary Conditions:**

    -   **normalize():** Throws an error if the vector or quaternion length is zero.
    -   **angleTo():** Throws an error if either vector has zero length.

-   **Graceful Degradation:** Ensure methods fail gracefully with meaningful messages.

---

## Documentation

Comprehensive JSDoc annotations provide clarity and facilitate type checking:

-   **Classes and Constructors:**

    ```javascript
    /**
     * Represents a 3-dimensional vector in a right-handed coordinate system.
     */
    class Vec3 {
        /**
         * Creates a new Vec3 instance.
         * @param {number} [x=0] - X-component.
         * @param {number} [y=0] - Y-component.
         * @param {number} [z=0] - Z-component.
         */
        constructor(x = 0, y = 0, z = 0) {
            /* ... */
        }
    }
    ```

-   **Properties with Getters and Setters:**

    ```javascript
    /**
     * X-component of the vector.
     * @type {number}
     */
    get x() { /* ... */ }
    set x(value) { /* ... */ }
    ```

-   **Methods:**

    ```javascript
    /**
     * Adds another vector to this vector.
     * @param {Vec3} other - Vector to add.
     * @returns {Vec3} This instance for chaining.
     */
    add(other) { /* ... */ }
    ```

-   **Static Methods:**

    ```javascript
    /**
     * Adds two vectors and returns a new vector.
     * @param {Vec3} v1 - First vector.
     * @param {Vec3} v2 - Second vector.
     * @returns {Vec3} New vector instance.
     */
    static add(v1, v2) { /* ... */ }
    ```

All parameters and return types are explicitly defined to ensure clarity.

---

## Example Usage

### Creating Vectors

```javascript
const v2 = new Vec2(1, 2);
const v3 = new Vec3(1, 2, 3);
const v4 = new Vec4(1, 2, 3, 1);
```

### Accessing and Modifying Components via Getters and Setters

```javascript
// Getting components
const x = v3.x;
const y = v3.y;
const z = v3.z;

// Setting components
v3.x = 5;
v3.y = 6;
v3.z = 7;
```

### Vector Operations with Chaining

```javascript
v3.add(new Vec3(4, 5, 6)).multiplyScalar(2).normalize();
```

### Quaternion Rotations

```javascript
const axisY = new Vec3(0, 1, 0);
const angleY = Math.PI / 2;
const quatY = new Quat().setFromAxisAngle(axisY, angleY);

const axisX = new Vec3(1, 0, 0);
const angleX = Math.PI / 4;
const quatX = new Quat().setFromAxisAngle(axisX, angleX);

const quatCombined = quatY.clone().multiply(quatX);
```

### Transforming Vectors with Matrices

```javascript
const translation = new Mat4().translate(new Vec3(5, 0, 0));
const scaling = new Mat4().scale(new Vec3(2, 2, 2));
const rotation = new Mat4().rotate(angleY, axisY);

const modelMatrix = new Mat4()
    .multiply(translation)
    .multiply(rotation)
    .multiply(scaling);

const originalVec = new Vec3(1, 1, 1);
const transformedVec = originalVec.clone().transform(modelMatrix);
```

### Cloning Objects

```javascript
const clonedVec = v3.clone();
const clonedMat = modelMatrix.clone();
```

### Using Static Methods

```javascript
const vA = new Vec3(1, 2, 3);
const vB = new Vec3(4, 5, 6);
const vC = Vec3.add(vA, vB); // Vec3(5, 7, 9)
```

### Handling Errors

```javascript
try {
    const nonInvertibleMat = new Mat3([
        1,
        4,
        7,
        2,
        5,
        8,
        3,
        6,
        9, // Determinant is zero (elements are in column-major order)
    ]);
    nonInvertibleMat.invert();
} catch (error) {
    console.error(error.message); // "Matrix is not invertible because the determinant is zero."
}
```

### Additional Vector Operations

```javascript
const vD = new Vec3(3, 4, 0);
console.log(vD.length()); // 5
console.log(vD.distanceTo(new Vec3(0, 0, 0))); // 5

const angleRad = vA.angleTo(vB);
console.log(angleRad); // Angle in radians between vA and vB

const vE = Vec3.lerp(vA, vB, 0.5); // Vec3(2.5, 3.5, 4.5)
```

### Matrix Compositions

```javascript
const position = new Vec3(0, 0, 0);
const quaternion = new Quat().setFromAxisAngle(new Vec3(0, 1, 0), Math.PI / 2);
const scale = new Vec3(1, 1, 1);

const transformMatrix = new Mat4().compose(position, quaternion, scale);
```

---

## Additional Considerations

### Right-Handed Coordinate System

The library operates within a right-handed coordinate system, standard in many graphics and physics applications. In this system:

-   The positive X-axis points to the right.
-   The positive Y-axis points up.
-   The positive Z-axis points out of the screen towards the viewer.

Rotations follow the right-hand rule: curling the fingers of your right hand in the direction of rotation, your thumb points along the positive rotation axis.

### Interpolation Methods

-   **slerp(q1, q2, t):** Performs spherical linear interpolation between two quaternions.
-   **lerp(v1, v2, t):** Performs linear interpolation between two vectors.
-   **catmullRom(v0, v1, v2, v3, t):** Catmull-Rom spline interpolation for smooth curves.

### Plane Projection Methods

-   **projectOnPlane(v, normal):** Projects a vector onto a plane defined by a normal. Available for `Vec3` and `Vec4` to account for homogeneous coordinates.

### Matrix Storage Order

-   Matrices are stored in **column-major order**, which is standard in OpenGL and GLSL. When providing elements to the matrix constructors or methods, ensure the elements are in column-major order.

### Transforming Vectors

-   **Vec3.transform(Mat4):** When transforming a `Vec3` with a `Mat4`, the vector is treated as a position vector with `w = 1`. After transformation, if `w` is not 1, the resulting vector is divided by `w` to perform perspective division.

### Zero-Length Vectors and Quaternions

-   Methods like `normalize()` and `angleTo()` will throw an error if the vector or quaternion has a length of zero to prevent undefined behavior.

### Cloning and Copying

-   All classes include a `clone()` method to create deep copies of instances.

### Performance Optimizations

-   **Typed Arrays:** Utilizes `Float32Array` for matrix elements to enhance performance.
-   **Method Chaining:** Methods return `this` to facilitate fluent interfaces.
-   **Avoiding Redundant Allocations:** In-place operations minimize garbage collection.
-   **Specialized Inversion Methods:** Provides optimized inversion methods for specific matrix types (e.g., orthogonal matrices).

### Extensibility

-   **Modular Design:** Supports easy extension or integration with other libraries.
-   **Customizable:** Users can extend classes or methods as needed.

### Testing

-   **Unit Tests:** Comprehensive tests cover all classes and methods.
-   **Edge Cases:** Tests handle scenarios such as zero-length vectors, parallel vectors for angle calculations, and non-invertible matrices.

### Additional Utility Methods

-   **toArray():** Converts vectors, quaternions, and matrices to arrays for interoperability.
-   **fromArray(array):** Creates instances from arrays.
-   **toString():** Provides string representations for debugging purposes.

---

The JavaScript Vector and Matrix Library provides a robust and flexible framework for performing a wide range of mathematical operations essential in graphics, physics simulations, and other computational applications. With comprehensive documentation, consistent naming conventions, and a focus on performance and extensibility, the library is designed to meet the needs of developers seeking reliable and efficient mathematical tools in a right-handed coordinate system.
