const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'main.min.js');
let code = fs.readFileSync(filePath, 'utf8');

// The new mapping of tools to simple-icons SVG URLs
const newIconMap = {
  "ChatGPT (OpenAI)": "https://cdn.simpleicons.org/openai/ffffff",
  "Claude AI (Anthropic)": "https://cdn.simpleicons.org/anthropic/d97706",
  "Google Gemini": "https://cdn.simpleicons.org/googlegemini/4285f4",
  "Suno AI": "https://cdn.simpleicons.org/suno/ec4899",
  "NotebookLM": "https://cdn.simpleicons.org/google/3b82f6",
  "Zapier Automation": "https://cdn.simpleicons.org/zapier/ff4a00",
  "Dribbble": "https://cdn.simpleicons.org/dribbble/ea4c89",
  "Framer": "https://cdn.simpleicons.org/framer/0055ff",
  "3ds Max": "https://cdn.simpleicons.org/autodesk/06b6d4",
  "Midjourney": "https://cdn.simpleicons.org/discord/8b5cf6", // Fallback for Midjourney
};

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

// Add iconUrl to tools
for (const tool of tools) {
  if (newIconMap[tool.name]) {
    tool.iconUrl = newIconMap[tool.name];
  }
}

// Convert back to string
const newToolsStr = JSON.stringify(tools).replace(/"([^"]+)":/g, '$1:');

code = code.replace(toolsArrayStr, newToolsStr);

fs.writeFileSync(filePath, code, 'utf8');
console.log("main.min.js updated successfully with new AI and editing tool logos!");
