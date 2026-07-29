const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'main.min.js');
let code = fs.readFileSync(filePath, 'utf8');

const newTools = [
  {name: "GPT-4o", type: "badge", brand: "GPT-4o", color: "#10a37f", bg: "#03241b", iconUrl: "https://cdn.simpleicons.org/openai/10a37f"},
  {name: "Ollama", type: "badge", brand: "Ollama", color: "#000000", bg: "#ffffff", iconUrl: "https://cdn.simpleicons.org/ollama/000000"},
  {name: "Gemini Advanced", type: "badge", brand: "Gemini", color: "#4285f4", bg: "#081a3d", iconUrl: "https://cdn.simpleicons.org/googlegemini/4285f4"},
  {name: "GitHub Copilot", type: "badge", brand: "Copilot", color: "#ffffff", bg: "#161b22", iconUrl: "https://cdn.simpleicons.org/githubcopilot/ffffff"},
  {name: "Cursor", type: "badge", brand: "Cursor", color: "#000000", bg: "#ffffff", iconUrl: "https://cdn.simpleicons.org/cursor/000000"},
  {name: "Claude Code", type: "badge", brand: "Claude Code", color: "#d97706", bg: "#331700", iconUrl: "https://cdn.simpleicons.org/anthropic/d97706"},
  {name: "DALL-E 3", type: "badge", brand: "DALL-E 3", color: "#10a37f", bg: "#03241b", iconUrl: "https://cdn.simpleicons.org/openai/10a37f"},
  {name: "Runway AI", type: "badge", brand: "Runway", color: "#000000", bg: "#ffffff"},
  {name: "Higgsfield", type: "badge", brand: "Higgsfield", color: "#ffffff", bg: "#111111"},
  {name: "Sora 2", type: "badge", brand: "Sora 2", color: "#10a37f", bg: "#03241b", iconUrl: "https://cdn.simpleicons.org/openai/10a37f"},
  {name: "Kling AI", type: "badge", brand: "Kling", color: "#ffffff", bg: "#222222"},
  {name: "Jasper", type: "badge", brand: "Jasper", color: "#ffffff", bg: "#4a3c8e"},
  {name: "Perplexity AI", type: "badge", brand: "Perplexity", color: "#22B8CD", bg: "#0A1F24", iconUrl: "https://cdn.simpleicons.org/perplexity/22B8CD"},
  {name: "Notion AI", type: "badge", brand: "Notion", color: "#000000", bg: "#ffffff", iconUrl: "https://cdn.simpleicons.org/notion/000000"},
  {name: "Lex", type: "badge", brand: "Lex", color: "#ffffff", bg: "#333333"},
  {name: "Brave", type: "badge", brand: "Brave", color: "#fb542b", bg: "#301008", iconUrl: "https://cdn.simpleicons.org/brave/fb542b"},
  {name: "Otter.ai", type: "badge", brand: "Otter.ai", color: "#0055ff", bg: "#e6f0ff"},
  {name: "Descript", type: "badge", brand: "Descript", color: "#2a82fa", bg: "#0d1a33"},
  {name: "ElevenLabs", type: "badge", brand: "ElevenLabs", color: "#000000", bg: "#ffffff", iconUrl: "https://cdn.simpleicons.org/elevenlabs/000000"},
  {name: "Grok", type: "badge", brand: "Grok", color: "#000000", bg: "#ffffff"},
  {name: "DeepSeek", type: "badge", brand: "DeepSeek", color: "#4d94ff", bg: "#0a1f3d", iconUrl: "https://cdn.simpleicons.org/deepseek/4d94ff"},
  {name: "Veo", type: "badge", brand: "Veo", color: "#ffffff", bg: "#ff5500"},
  {name: "Flow", type: "badge", brand: "Flow", color: "#000000", bg: "#44ff44"},
  {name: "AI Tools", type: "badge", brand: "AI Tools", color: "#ffffff", bg: "#ff00ff"},
  {name: "Coding Tools", type: "badge", brand: "Coding Tools", color: "#ffffff", bg: "#00ffff"},
  {name: "Editing Tools", type: "badge", brand: "Editing Tools", color: "#ffffff", bg: "#ffff00"}
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
  // Try to avoid exact duplicates
  if (!existingNames.has(newTool.name.toLowerCase())) {
    tools.push(newTool);
  }
}

// Convert back to string
const newToolsStr = JSON.stringify(tools).replace(/"([^"]+)":/g, '$1:');

code = code.replace(toolsArrayStr, newToolsStr);

fs.writeFileSync(filePath, code, 'utf8');
console.log("main.min.js updated successfully with all requested tools!");
