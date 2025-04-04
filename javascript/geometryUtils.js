const geometryUtils = {
  calculateCircleArea: function(radius) {
    return Math.PI * radius * radius;
  },
  
  calculateCirclePerimeter: function(radius) {
    return 2 * Math.PI * radius;
  },
  
  calculateRectangleArea: function(length, width) {
    return length * width;
  },
  
  calculateRectanglePerimeter: function(length, width) {
    return 2 * (length + width);
  },
  
  calculateTriangleArea: function(base, height) {
    return 0.5 * base * height;
  },
  
  calculateDistance: function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },
  
  calculateSphereVolume: function(radius) {
    return (4/3) * Math.PI * Math.pow(radius, 3);
  },
  
  calculateCylinderVolume: function(radius, height) {
    return Math.PI * Math.pow(radius, 2) * height;
  }
};

module.exports = geometryUtils;