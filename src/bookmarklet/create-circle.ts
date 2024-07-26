const createCircle = (color: string): Node => {
  const circle = document.createElement("div");
  circle.style.position = "fixed";
  circle.style.zIndex = "99999";
  circle.style.backgroundColor = color;
  circle.style.top = "10px";
  circle.style.right = "10px";
  circle.style.borderRadius = "50%";
  circle.style.width = "20px";
  circle.style.height = "20px";
  return circle;
};

export default createCircle;
