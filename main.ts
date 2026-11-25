/**
 * One-Line Laugh-Off — entry program.
 *
 * The joke is assembled from three named pieces so the setup, the hinge
 * and the punchline stay visible as separate ideas. The file that lands in
 * /output/entry.txt is exactly one line: no trailing newline, no extra
 * whitespace, nothing but the joke itself.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SETUP = "My password is so strong even I can't get in";
const HINGE = "—";
const PUNCHLINE = "security through mutual distrust";

const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 200;

function buildJoke(): string {
  // The hinge is an em dash: the setup states the problem, the dash
  // pivots, and the punchline reframes the failure as a feature.
  const parts = [SETUP, HINGE, PUNCHLINE];
  const joined = parts.join(" ");
  return `${joined}.`;
}

function checkGate(line: string): void {
  const length = [...line].length;
  if (length < GATE_MIN_CHARS || length > GATE_MAX_CHARS) {
    throw new Error(
      `entry is ${length} chars, gate wants ${GATE_MIN_CHARS}–${GATE_MAX_CHARS}`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function outputPath(): string {
  const targetDir = process.env.OUTPUT_DIR ?? "/output";
  return join(targetDir, "entry.txt");
}

function main(): void {
  const line = buildJoke();
  checkGate(line);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, line, "utf8");
  console.log(`wrote ${[...line].length} chars to ${path}`);
}

main();
