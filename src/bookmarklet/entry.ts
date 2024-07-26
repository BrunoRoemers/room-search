import createProgressIndicator from "./create-progress-indicator";
import submitCurrentPage, { type Data } from "./submit";
import createLink from "./create-link";
import createPositionedContainer from "./create-positioned-container";

const rootId = process.env.NEXT_PUBLIC_BOOKMARKLET_ROOT_ID!;
const root = document.getElementById(rootId)!;

const response = submitCurrentPage(root.dataset as unknown as Data);
const progressIndicator = createProgressIndicator(response);

const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}/edit?gid=${process.env.NEXT_PUBLIC_SHEET_GID}`;
const link = createLink(sheetUrl);
link.appendChild(progressIndicator);

const container = createPositionedContainer();
container.appendChild(link);

root.appendChild(container);
