const fs = require('fs');

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix games cleanup in Snake and Flappy Bird
  content = content.replace(/window\.addEventListener\("keydown",p\),u\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),u()}(n);');
  content = content.replace(/window\.addEventListener\("keydown",p\),m\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),m()}(n);');

  // Fix generic cleanup in the modal close function (which defines let a=null)
  content = content.replace(/let a=null;function r\(\)\{e\.style\.display="none",n\.innerHTML="",a&&cancelAnimationFrame\(a\),document\.body\.style\.overflow=""\}/g, 
    'let a=null,currentCleanup=null;function r(){e.style.display="none",n.innerHTML="",a&&cancelAnimationFrame(a),currentCleanup&&currentCleanup(),currentCleanup=null,document.body.style.overflow=""}');

  // Completely simplify initPlayableWebsitesModal to only do window.open
  // We match everything from `function initPlayableWebsitesModal(){` to the next function declaration or end.
  // Note: Since main.min.js is on one line, we can't easily rely on regex without being careful.
  // We'll replace the exact string from function initPlayableWebsitesModal(){ to function initReviewSubmission() (or end).
  // Actually, wait, let's just use string slicing.
  const startStr = 'function initPlayableWebsitesModal(){';
  const endStr = 'function initReviewSubmission(){'; // This function comes after it in the minified file
  
  const startIndex = content.indexOf(startStr);
  const endIndex = content.indexOf(endStr);
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const newFunc = 'function initPlayableWebsitesModal(){document.querySelectorAll("[data-explore-web]").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault();window.open(o.getAttribute("data-explore-web"),"_blank");});});}';
    content = content.substring(0, startIndex) + newFunc + content.substring(endIndex);
  } else {
    // If initReviewSubmission isn't next, try another known function or just the window.slideShowcase
    const endStr2 = 'window.slideShowcase=function(e,t)';
    const endIndex2 = content.indexOf(endStr2);
    if (startIndex !== -1 && endIndex2 !== -1 && endIndex2 > startIndex) {
      const newFunc = 'function initPlayableWebsitesModal(){document.querySelectorAll("[data-explore-web]").forEach(o=>{o.addEventListener("click",a=>{a.preventDefault();window.open(o.getAttribute("data-explore-web"),"_blank");});});}';
      content = content.substring(0, startIndex) + newFunc + content.substring(endIndex2);
    }
  }

  fs.writeFileSync(file, content);
  console.log(`${file} updated`);
}

['js/main.js', 'js/main.min.js'].forEach(updateFile);
