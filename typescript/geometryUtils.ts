export class GeometryUtils {
  static calculateCircleArea(radius: number): number {
    return Math.PI * radius * radius;
  }
  
  static calculateCirclePerimeter(radius: number): number {
    return 2 * Math.PI * radius;
  }
  
  static calculateRectangleArea(length: number, width: number): number {
    return length * width;
  }
  
  static calculateRectanglePerimeter(length: number, width: number): number {
    return 2 * (length + width);
  }
  
  static calculateTriangleArea(base: number, height: number): number {
    return 0.5 * base * height;
  }
  
  static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  
  static calculateSphereVolume(radius: number): number {
    return (4/3) * Math.PI * Math.pow(radius, 3);
  }
  
  static calculateCylinderVolume(radius: number, height: number): number {
    return Math.PI * Math.pow(radius, 2) * height;
  }
  
  static calculateTriangleAreaWithSides(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
}