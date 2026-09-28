#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "x-api-console.html");
const html = fs.readFileSync(file, "utf8");
const match = html.match(/<script type="text\/plain" id="bridge">([\s\S]*?)<\/script>/);

if (!match) {
  console.error("Could not find the bridge block in x-api-console.html");
  process.exit(1);
}

const PORT = Number(process.env.PORT || 8787);
eval(match[1]);
