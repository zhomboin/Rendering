import fs from "node:fs";
import path from "node:path";
import * as pagefind from "pagefind";

const sitePath = path.join(process.cwd(), ".next", "server", "app");
const outputPath = path.join(process.cwd(), "public", "pagefind");

if (!fs.existsSync(sitePath)) {
  throw new Error(`Pagefind source directory not found: ${sitePath}`);
}

fs.rmSync(outputPath, { recursive: true, force: true });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const { index } = await pagefind.createIndex();
await index.addDirectory({ path: sitePath });
await index.writeFiles({ outputPath });

console.log(`Pagefind index written to ${outputPath}`);
