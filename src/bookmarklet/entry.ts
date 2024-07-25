const bookmarkletRootId = "rsb-root";

const createRoot = (): Node => {
  const root = document.createElement("div");
  root.id = bookmarkletRootId;
  return root;
};

const createCircle = (): Node => {
  const circle = document.createElement("div");
  circle.style.position = "fixed";
  circle.style.backgroundColor = "green";
  circle.style.top = "10px";
  circle.style.right = "10px";
  circle.style.borderRadius = "50%";
  circle.style.width = "20px";
  circle.style.height = "20px";
  return circle;
};

const root = createRoot();
root.appendChild(createCircle());

const existingRoot = document.getElementById(bookmarkletRootId);
if (existingRoot) existingRoot.remove();
document.body.appendChild(root);
