import { defineCliConfig } from "sanity/cli";
import fs from "node:fs";
import path from "node:path";

function loadEnvFile(filename: string) {
  const fullPath = path.join(process.cwd(), filename);
  if (!fs.existsSync(fullPath)) {
    return;
  }

  const contents = fs.readFileSync(fullPath, "utf8");
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2] ?? "";

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity project id. Set SANITY_STUDIO_PROJECT_ID (preferred) or NEXT_PUBLIC_SANITY_PROJECT_ID in .env/.env.local."
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset
  }
});
