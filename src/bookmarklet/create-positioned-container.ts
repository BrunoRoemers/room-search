const createPositionedContainer = (): Node => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.zIndex = "99999";
  container.style.top = "10px";
  container.style.right = "10px";
  return container;
};

export default createPositionedContainer;
