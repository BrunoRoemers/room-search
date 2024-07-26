import createCircle from "./create-circle";

const progressIndicator = async <T>(promise: Promise<T>): Promise<Node> => {
  const inProgressCircle = createCircle("orange");

  const wrapper = document.createElement("div");
  wrapper.appendChild(inProgressCircle);

  promise
    .then(() => wrapper.replaceChildren(createCircle("green")))
    .catch(() => wrapper.replaceChildren(createCircle("red")))
    .finally(() => setTimeout(() => wrapper.remove(), 4000));

  return wrapper;
};

export default progressIndicator;
