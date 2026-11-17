const $ = (id) => document.getElementById(id);
const STORE = {players:"rfc_players",matches:"rfc_matches",news:"rfc_news"};
const read = key => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key,data) => localStorage.setItem(key,JSON.stringify(data));
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
  const players=read(STORE.players), matches=read(STORE.matches), news=read(STORE.news);
  $("playerGrid").innerHTML=players.map(p=>`<article class="player-card"><div class="number">${esc(p.number)}</div><h3>${esc(p.name)}</h3><p>${esc(p.position)}</p></article>`).join("");
  $("playersEmpty").classList.toggle("hidden",players.length>0);
  $("matchList").innerHTML=matches.sort((a,b)=>a.date.localeCompare(b.date)).map(m=>`<div class="match-row"><div><div class="match-date">${esc(m.date)}</div><div class="match-venue">${esc(m.venue||"Venue TBC")}</div></div><div class="match-opponent">REIKEMETSE FC <span style="color:#b88b3d">vs</span> ${esc(m.opponent)}</div><div class="match-status">${esc(m.score||"UPCOMING")}</div></div>`).join("");
  $("matchesEmpty").classList.toggle("hidden",matches.length>0);
  $("newsGrid").innerHTML=news.map(n=>`<article class="news-card"><small>${esc(n.date)}</small><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`).join("");
  $("newsEmpty").classList.toggle("hidden",news.length>0);
  renderManage();
}
function renderManage(){
  const entries=[...read(STORE.players).map((x,i)=>({type:"players",label:`Player: ${x.name} (#${x.number})`,i})),...read(STORE.matches).map((x,i)=>({type:"matches",label:`Match: vs ${x.opponent} — ${x.date}`,i})),...read(STORE.news).map((x,i)=>({type:"news",label:`News: ${x.title}`,i}))];
  $("manageItems").innerHTML=entries.length?entries.map(x=>`<div class="manage-item"><span>${esc(x.label)}</span><button class="delete-btn" data-type="${x.type}" data-index="${x.i}">DELETE</button></div>`).join(""):"<p class='empty-note'>No content added yet.</p>";
}
$("manageItems").addEventListener("click",e=>{const b=e.target.closest("button[data-type]");if(!b)return;const key=STORE[b.dataset.type],arr=read(key);arr.splice(Number(b.dataset.index),1);write(key,arr);render();});
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
$("year").textContent=new Date().getFullYear();

const DEMO_EMAIL="admin@reikemetsefc.co.za", DEMO_PASSWORD="Royals2026!";
$("loginForm").addEventListener("submit",e=>{e.preventDefault();if($("adminEmail").value.trim().toLowerCase()===DEMO_EMAIL && $("adminPassword").value===DEMO_PASSWORD){sessionStorage.setItem("rfc_demo_admin","yes");showDashboard();$("loginError").textContent="";}else{$("loginError").textContent="Login details are incorrect. Please try again."; }});
function showDashboard(){const ok=sessionStorage.getItem("rfc_demo_admin")==="yes";$("loginPanel").classList.toggle("hidden",ok);$("dashboard").classList.toggle("hidden",!ok);if(ok)renderManage();}
$("logoutBtn").addEventListener("click",()=>{sessionStorage.removeItem("rfc_demo_admin");showDashboard();});
$("playerForm").addEventListener("submit",e=>{e.preventDefault();const a=read(STORE.players);a.push({name:$("playerName").value.trim(),position:$("playerPosition").value.trim(),number:$("playerNumber").value});write(STORE.players,a);e.target.reset();render();});
$("matchForm").addEventListener("submit",e=>{e.preventDefault();const a=read(STORE.matches);a.push({opponent:$("opponent").value.trim(),date:$("matchDate").value,venue:$("venue").value.trim(),score:$("score").value.trim()});write(STORE.matches,a);e.target.reset();render();});
$("newsForm").addEventListener("submit",e=>{e.preventDefault();const a=read(STORE.news);a.unshift({title:$("newsTitle").value.trim(),body:$("newsBody").value.trim(),date:new Date().toLocaleDateString()});write(STORE.news,a);e.target.reset();render();});
showDashboard();render();
