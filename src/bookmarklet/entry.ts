import progressIndicator from "./progress-indicator";
import submitCurrentPage, { type Data } from "./submit";

const rootId = process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID!;
const root = document.getElementById(rootId)!;
const data = root.dataset as unknown as Data;
root.appendChild(progressIndicator(submitCurrentPage(data)));
