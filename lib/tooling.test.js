import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const packageJsonPath = path.join(process.cwd(), "package.json");
const localeShellPath = path.join(process.cwd(), "components", "locale-shell.tsx");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const localeShellSource = fs.readFileSync(localeShellPath, "utf8");

assert.equal(
  packageJson.scripts.build.includes("npm.cmd"),
  false,
  "build script should stay cross-platform and avoid Windows-only npm.cmd"
);

assert.equal(
  packageJson.scripts.check.includes("npm.cmd"),
  false,
  "check script should stay cross-platform and avoid Windows-only npm.cmd"
);

assert.equal(localeShellSource.includes("skip-link"), false, "locale shell should not render the skip-link anchor");
assert.equal(localeShellSource.includes("Skip to content"), false, "locale shell should not keep the English skip-link copy");
assert.equal(localeShellSource.includes("????"), false, "locale shell should not keep the Chinese skip-link copy");

console.log("tooling assertions passed");
