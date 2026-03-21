import { validateAllPostFiles } from "../lib/content.js";

try {
  const validated = validateAllPostFiles();
  console.log(`content verification passed for ${validated.length} files`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}