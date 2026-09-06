const fs = require('fs');

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace initPlayableWebsitesModal
  content = content.replace(/function initPlayableWebsitesModal\(\).*?\{t\.target===e&&a\(\)\}\}/, 
    'function initPlayableWebsitesModal(){document.querySelectorAll("[data-explore-web]").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),window.open(e.getAttribute("data-explore-web"),"_blank")})})}');

  // Replace snake and flappy event listener cleanup
  content = content.replace(/window\.addEventListener\("keydown",p\),u\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),u()}(n);');
  content = content.replace(/window\.addEventListener\("keydown",p\),m\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),m()}(n);');

  // Replace r() cleanup
  content = content.replace(/let a=null;function r\(\)\{e\.style\.display="none",n\.innerHTML="",a&&cancelAnimationFrame\(a\),document\.body\.style\.overflow=""\}/g, 
    'let a=null,currentCleanup=null;function r(){e.style.display="none",n.innerHTML="",a&&cancelAnimationFrame(a),currentCleanup&&currentCleanup(),currentCleanup=null,document.body.style.overflow=""}');
    
  fs.writeFileSync(file, content);
  console.log(`${file} updated`);
}

['js/main.js', 'js/main.min.js'].forEach(updateFile);
