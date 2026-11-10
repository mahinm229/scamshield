// Generates classic-script browser bundles from the ES-module sources so
// the app works from file://, where ES-module imports are blocked.
// Run: node tools/build-browser.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(fileURLToPath(import.meta.url));

function bundle(srcName, outName, globalName, globalValue) {
  const src = readFileSync(path.join(root, "..", srcName), "utf8");
  const out =
    src.replace(/^export function /gm, "function ").replace(/^export const /gm, "const ") +
    `\nwindow.${globalName} = ${globalValue};\n`;
  writeFileSync(path.join(root, "..", outName), out);
  console.log(`${outName} regenerated from ${srcName}`);
}

bundle("detector.mjs", "detector.browser.js", "ScamShieldDetector", "{ analyzeMessage, getVerdict, VERSION }");
bundle("samples.mjs", "samples.browser.js", "ScamShieldSamples", "SAMPLES");
