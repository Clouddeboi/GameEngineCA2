// collision.js
function detectCollision(obj1, obj2) {
    const left1 = obj1.x;
    const right1 = obj1.x + obj1.width;
    const top1 = obj1.y;
    const bottom1 = obj1.y + obj1.height;
  
    const left2 = obj2.x;
    const right2 = obj2.x + obj2.width;
    const top2 = obj2.y;
    const bottom2 = obj2.y + obj2.height;
  
    return (
      left1 < right2 && right1 > left2 && top1 < bottom2 && bottom1 > top2
    );
  }
  function circleCollision(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < circle1.radius + circle2.radius) {
      return true; // Collision detected
    }
  
    return false; // No collision
  }
  function circleRectCollision(circle, rect) {
    // Find the closest point to the circle within the rectangle
    let closestX = clamp(circle.x, rect.x, rect.x + rect.width);
    let closestY = clamp(circle.y, rect.y, rect.y + rect.height);
  
    // Calculate the distance between the circle's center and the closest point
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
  
    // If the distance is less than the circle's radius, there is a collision
    let distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared < (circle.radius * circle.radius);
  }
  
  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }
  
  export {circleRectCollision, detectCollision};
  