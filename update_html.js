const fs = require('fs');

function updateHtml() {
  let content = fs.readFileSync('index.html', 'utf8');

  // We want to add cursor:pointer and onclick to showcase-card-slide if it contains data-play-game.
  // Instead of complex parsing, let's just replace all instances where it's a known game card.
  
  // A safe way: split by '<div class="showcase-card-slide">'
  const parts = content.split('<div class="showcase-card-slide">');
  for (let i = 1; i < parts.length; i++) {
    // If this part contains a button with data-play-game before the next card or end
    if (parts[i].includes('data-play-game=')) {
      // Re-stitch with the onclick
      parts[i] = '<!-- clickable-card -->' + parts[i]; 
    }
  }
  
  content = parts.join('<div class="showcase-card-slide">');
  content = content.replace(/<div class="showcase-card-slide">\s*<!-- clickable-card -->/g, 
    '<div class="showcase-card-slide" style="cursor: pointer;" onclick="const btn = this.querySelector(\'[data-play-game]\'); if(btn) btn.click();">');
    
  fs.writeFileSync('index.html', content);
  console.log('index.html updated');
}

updateHtml();
