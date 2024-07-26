const createLink = (href: string): Node => {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.display = "block";
  link.style.textDecoration = "none";
  return link;
};

export default createLink;
