import progressIndicator from "./progress-indicator";

interface Data {
  secret: string;
  rating: number;
}

(async () => {
  const rootId = process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID!;
  const root = document.getElementById(rootId)!;
  const data = root.dataset as unknown as Data;

  // TEMP
  const timerPromise = new Promise((res, rej) =>
    setTimeout(() => (Math.random() > 0.2 ? res(null) : rej(null)), 1000)
  );

  root.appendChild(await progressIndicator(timerPromise));
})();
