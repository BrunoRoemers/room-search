const createCircle = (color: string): Node => {
  const circle = document.createElement("div");
  circle.style.backgroundColor = color;
  circle.style.borderRadius = "50%";
  circle.style.width = "20px";
  circle.style.height = "20px";
  return circle;
};

export default createCircle;
