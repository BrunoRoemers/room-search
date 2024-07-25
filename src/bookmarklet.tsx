import React from "react";
import { createRoot } from "react-dom/client";

const Home = () => {
  return <div>hello</div>;
};

const reactRoot = document.createElement("div");
document.body.appendChild(reactRoot);
createRoot(reactRoot).render(<Home />);
