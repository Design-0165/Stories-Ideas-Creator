const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'main.min.js');
let code = fs.readFileSync(filePath, 'utf8');

// The mapping of tools to devicon svg URLs
const iconMap = {
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Go Language": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
  "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  "Amazon Web Services": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Google Cloud (GCP)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "LinkedIn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
  "Behance": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/behance/behance-original.svg",
  "CodePen": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codepen/codepen-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  "Canva Pro": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
  "Blender 3D": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg",
  "Autodesk Maya": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maya/maya-original.svg",
  "Adobe Photoshop": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
  "Adobe Illustrator": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg",
  "Adobe Premiere Pro": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg",
  "Adobe After Effects": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg",
  "Adobe XD": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg"
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
  if (iconMap[tool.name]) {
    tool.iconUrl = iconMap[tool.name];
  }
}

// Convert back to string
const newToolsStr = JSON.stringify(tools).replace(/"([^"]+)":/g, '$1:');

code = code.replace(toolsArrayStr, newToolsStr);

// Now update drawToolLogo
const drawLogoMatch = code.match(/drawToolLogo\([^)]*\)\{.*?\}(?=\s*\}\s*const\s+s\s*=\s*r\.map)/);
if (!drawLogoMatch) {
  console.error("Could not find drawToolLogo");
  process.exit(1);
}

const oldDrawLogo = drawLogoMatch[0];

const newDrawLogo = `drawToolLogo(e){
  const t=this.tool.type,n=this.tool.brand,o=this.tool.color,a=.55*this.radius;
  e.shadowColor="rgba(0, 0, 0, 0.3)",e.shadowBlur=4;
  
  if (this.tool.iconUrl) {
    if (!this.img) {
      this.img = new Image();
      this.img.src = this.tool.iconUrl;
    }
    if (this.img.complete && this.img.naturalWidth !== 0) {
      const size = this.radius * 1.3;
      e.drawImage(this.img, -size/2, -size/2, size, size);
      return;
    }
  }

  "adobe"===t?(e.fillStyle=this.tool.bg,e.beginPath(),e.roundRect(.8*-a,.8*-a,1.6*a,1.6*a,.3*a),e.fill(),e.font=\`900 \${.8*a}px "Outfit", sans-serif\`,e.fillStyle=o,e.textAlign="center",e.textBaseline="middle",e.fillText(n,0,1)):"js"===t?(e.fillStyle="#f7df1e",e.beginPath(),e.roundRect(.75*-a,.75*-a,1.5*a,1.5*a,.2*a),e.fill(),e.font=\`900 \${.7*a}px "Outfit", sans-serif\`,e.fillStyle="#000000",e.textAlign="right",e.textBaseline="bottom",e.fillText("JS",.65*a,.65*a)):"html"===t?(e.fillStyle="#e34f26",e.beginPath(),e.moveTo(.6*-a,.7*-a),e.lineTo(.6*a,.7*-a),e.lineTo(.5*a,.5*a),e.lineTo(0,.8*a),e.lineTo(.5*-a,.5*a),e.closePath(),e.fill(),e.font=\`900 \${.55*a}px "Outfit", sans-serif\`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("5",0,0)):"css"===t?(e.fillStyle="#1572b6",e.beginPath(),e.moveTo(.6*-a,.7*-a),e.lineTo(.6*a,.7*-a),e.lineTo(.5*a,.5*a),e.lineTo(0,.8*a),e.lineTo(.5*-a,.5*a),e.closePath(),e.fill(),e.font=\`900 \${.55*a}px "Outfit", sans-serif\`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("3",0,0)):"figma"===t?(e.fillStyle="#f24e1e",e.beginPath(),e.arc(.35*-a,.35*-a,.35*a,0,2*Math.PI),e.fill(),e.fillStyle="#ff7262",e.beginPath(),e.arc(.35*a,.35*-a,.35*a,0,2*Math.PI),e.fill(),e.fillStyle="#a259ff",e.beginPath(),e.arc(.35*-a,.35*a,.35*a,0,2*Math.PI),e.fill(),e.fillStyle="#1abcfe",e.beginPath(),e.arc(.35*a,.35*a,.35*a,0,2*Math.PI),e.fill()):"linkedin"===t?(e.fillStyle="#0a66c2",e.beginPath(),e.roundRect(.75*-a,.75*-a,1.5*a,1.5*a,.25*a),e.fill(),e.font=\`900 \${.85*a}px "Outfit", sans-serif\`,e.fillStyle="#ffffff",e.textAlign="center",e.textBaseline="middle",e.fillText("in",0,-1)):(e.fillStyle=o,e.font=\`900 \${Math.min(.55*a,14)}px "Outfit", sans-serif\`,e.textAlign="center",e.textBaseline="middle",e.fillText(n,0,1))
}`.replace(/\n\s*/g, '');

code = code.replace(oldDrawLogo, newDrawLogo);

fs.writeFileSync(filePath, code, 'utf8');
console.log("main.min.js updated successfully!");
