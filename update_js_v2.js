const fs = require('fs');

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Fix games cleanup (Snake and Flappy Bird)
  content = content.replace(/window\.addEventListener\("keydown",p\),u\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),u()}(n);');
  content = content.replace(/window\.addEventListener\("keydown",p\),m\(\)\}\(n\);/g, 
    'window.addEventListener("keydown",p),currentCleanup=()=>window.removeEventListener("keydown",p),m()}(n);');

  // Fix generic cleanup in r()
  content = content.replace(/let a=null;function r\(\)\{e\.style\.display="none",n\.innerHTML="",a&&cancelAnimationFrame\(a\),document\.body\.style\.overflow=""\}/g, 
    'let a=null,currentCleanup=null;function r(){e.style.display="none",n.innerHTML="",a&&cancelAnimationFrame(a),currentCleanup&&currentCleanup(),currentCleanup=null,document.body.style.overflow=""}');

  // Update website modal logic
  // We want to replace:
  // o.addEventListener("click",a=>{a.preventDefault();!function(o,a){
  // with:
  // o.addEventListener("click",a=>{a.preventDefault();const _url=o.getAttribute("data-explore-web");if(!_url.includes("github.com")&&!_url.includes("instagram.com")){window.open(_url,"_blank");return;}!function(o,a){
  content = content.replace(/o\.addEventListener\("click",a=>\{a\.preventDefault\(\);!function\(o,a\)\{/g,
    'o.addEventListener("click",a=>{a.preventDefault();const _url=o.getAttribute("data-explore-web");if(!_url.includes("github.com")&&!_url.includes("instagram.com")){window.open(_url,"_blank");return;}!function(o,a){');

  fs.writeFileSync(file, content);
  console.log(`${file} updated`);
}

['js/main_formatted.js'].forEach(updateFile);
