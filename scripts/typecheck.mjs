import { spawnSync } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const steps = [
  `${npmCommand} exec next typegen`,
  `${npmCommand} exec tsc -- --noEmit --incremental false`
];

for (const command of steps) {
  const result = spawnSync(command, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}