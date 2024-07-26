import createCircle from "./create-circle";

const createProgressIndicator = <T>(promise: Promise<T>): Node => {
  const wrapper = document.createElement("div");

  wrapper.appendChild(createCircle("orange"));

  promise
    .then(() => wrapper.replaceChildren(createCircle("green")))
    .catch(() => wrapper.replaceChildren(createCircle("red")))
    .finally(() => setTimeout(() => wrapper.remove(), 4000));

  return wrapper;
};

export default createProgressIndicator;
