interface Data {
  secret: string;
  rating: number;
}

const createCircle = (rating: number): Node => {
  const circle = document.createElement("div");
  circle.textContent = rating.toString();
  circle.style.position = "fixed";
  circle.style.zIndex = "99999";
  circle.style.backgroundColor = "green";
  circle.style.top = "10px";
  circle.style.right = "10px";
  circle.style.borderRadius = "50%";
  circle.style.width = "20px";
  circle.style.height = "20px";
  return circle;
};

const rootId = process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID!;
const root = document.getElementById(rootId);
if (root) {
  const data = root.dataset as unknown as Data;
  root.appendChild(createCircle(data.rating));
}
