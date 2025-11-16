import fs from "fs";

export function readJSON(path) {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
}

export function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
