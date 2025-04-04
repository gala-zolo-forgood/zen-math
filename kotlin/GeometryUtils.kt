package kotlin

import kotlin.math.PI
import kotlin.math.pow
import kotlin.math.sqrt

object GeometryUtils {
    fun calculateCircleArea(radius: Double): Double = PI * radius * radius
    
    fun calculateCirclePerimeter(radius: Double): Double = 2 * PI * radius
    
    fun calculateRectangleArea(length: Double, width: Double): Double = length * width
    
    fun calculateRectanglePerimeter(length: Double, width: Double): Double = 2 * (length + width)
    
    fun calculateTriangleArea(base: Double, height: Double): Double = 0.5 * base * height
    
    fun calculateDistance(x1: Double, y1: Double, x2: Double, y2: Double): Double = 
        sqrt((x2 - x1).pow(2) + (y2 - y1).pow(2))
    
    fun calculateSphereVolume(radius: Double): Double = (4.0 / 3.0) * PI * radius.pow(3)
    
    fun calculateCylinderVolume(radius: Double, height: Double): Double = PI * radius.pow(2) * height
}