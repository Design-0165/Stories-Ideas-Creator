const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'main.min.js');
let code = fs.readFileSync(filePath, 'utf8');

const newTools = [
  {name: "OpenAI", type: "badge", brand: "OpenAI", color: "#10a37f", bg: "#03241b", iconUrl: "https://cdn.simpleicons.org/openai/10a37f"},
  {name: "Antigravity", type: "badge", brand: "Antigravity", color: "#ff00ff", bg: "#220022"},
  {name: "Hermes AI", type: "badge", brand: "Hermes AI", color: "#ff8c00", bg: "#331c00"}
];

// Find the tools array in the minified file
const toolsMatch = code.match(/const\s+r\s*=\s*(\[\{name:.*?\}\]);/);
if (!toolsMatch) {
  console.error("Could not find tools array");
  process.exit(1);
}

let toolsArrayStr = toolsMatch[1];
let tools = null;
try {
  // Use Function to parse the js array string
  tools = new Function(`return ${toolsArrayStr}`)();
} catch (e) {
  console.error("Failed to parse tools array", e);
  process.exit(1);
}

// Add the new tools if they don't already exist
const existingNames = new Set(tools.map(t => t.name.toLowerCase()));
for (const newTool of newTools) {
  if (!existingNames.has(newTool.name.toLowerCase())) {
    tools.push(newTool);
  }
}

// Convert back to string
const newToolsStr = JSON.stringify(tools).replace(/"([^"]+)":/g, '$1:');

code = code.replace(toolsArrayStr, newToolsStr);

fs.writeFileSync(filePath, code, 'utf8');
console.log("main.min.js updated successfully with OpenAI, Antigravity, and Hermes AI!");
