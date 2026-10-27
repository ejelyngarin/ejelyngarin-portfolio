const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector("#site-nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));}
const current=location.pathname.split("/").pop()||"index.html";
document.querySelectorAll("#site-nav a").forEach(a=>{if(a.getAttribute("href")===current){a.classList.add("active");a.setAttribute("aria-current","page");}});
const search=document.querySelector("#site-search");
if(search){const targets=[...document.querySelectorAll("main .searchable, main .future-card, main .timeline-item, main .achievement-item, main .family-card, main .value-grid article")];const status=document.querySelector(".search-status");search.addEventListener("input",()=>{const q=search.value.trim().toLowerCase();let count=0;targets.forEach(el=>{const match=!q||el.innerText.toLowerCase().includes(q);el.classList.toggle("search-hidden",!match);if(match&&q)count++;});if(status)status.textContent=!q?"Search across the content on this page.":count?`${count} matching section(s) or item(s) shown.`:"No matches found. Try a broader keyword.";});}
