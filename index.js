#!/usr/bin/env node

// Usage: npx @yababay67/modern-setup my-app

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Hack ES6 module rules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = process.argv[2];
if(!projectName) {
    console.log("\nOops... It seems you forgot to point a project name.\n")
    process.exit(1)
}

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

let templateDir = path.resolve(__dirname, "");
fs.cpSync(templateDir, projectDir, { recursive: true });
templateDir = path.resolve(__dirname, "template");
fs.cpSync(templateDir, projectDir, { recursive: true });
templateDir = path.join(projectDir, 'template');
fs.rmSync(templateDir, { recursive: true });

fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);

let unwantedFile = path.join(projectDir, 'index.js');
fs.unlinkSync(unwantedFile );
unwantedFile = path.join(projectDir, 'LICENSE');
fs.unlinkSync(unwantedFile );

console.log("\nSuccess! Your new project's template is ready.");
console.log("Please execute in your terminal:\n");
console.log(`    cd ${projectName}`);
console.log("    npm i");
console.log("    npm run dev");
console.log("\nDon't forget to edit your package.json!\n");

