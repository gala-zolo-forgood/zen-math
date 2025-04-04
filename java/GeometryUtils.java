package java;

public class GeometryUtils {
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }
    
    public static double calculateCirclePerimeter(double radius) {
        return 2 * Math.PI * radius;
    }
    
    public static double calculateRectangleArea(double length, double width) {
        return length * width;
    }
    
    public static double calculateRectanglePerimeter(double length, double width) {
        return 2 * (length + width);
    }
    
    public static double calculateTriangleArea(double base, double height) {
        return 0.5 * base * height;
    }
    
    public static double calculateDistance(double x1, double y1, double x2, double y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
}