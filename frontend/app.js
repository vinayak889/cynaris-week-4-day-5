const jobs = [
 {id:1,title:'Frontend Developer',company:'Pixelwave Studio',category:'Engineering',location:'Bengaluru',type:'Full-time',salary:'₹5–8 LPA',tags:['React','JavaScript','UI'],logo:'P',color:'mint'},
 {id:2,title:'Laravel Backend Developer',company:'Northstar Tech',category:'Engineering',location:'Remote',type:'Full-time',salary:'₹4–7 LPA',tags:['Laravel','PHP','MySQL'],logo:'N'},
 {id:3,title:'Product Designer',company:'Forma Labs',category:'Design',location:'Bengaluru',type:'Full-time',salary:'₹6–10 LPA',tags:['Figma','UX','Design'],logo:'F'},
 {id:4,title:'Marketing Associate',company:'Brightside',category:'Marketing',location:'Hyderabad',type:'Full-time',salary:'₹3–5 LPA',tags:['SEO','Content','Growth'],logo:'B'},
 {id:5,title:'Junior Web Developer',company:'CloudNine',category:'Engineering',location:'Remote',type:'Internship',salary:'₹15k/month',tags:['HTML','CSS','JavaScript'],logo:'C'},
 {id:6,title:'UI/UX Intern',company:'Studio One',category:'Design',location:'Chennai',type:'Internship',salary:'₹12k/month',tags:['Figma','Wireframes'],logo:'S'}
];
let currentFilter='All', searchTerm='', locationTerm='';
const grid=document.getElementById('jobGrid'), count=document.getElementById('jobCount');
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 const filtered=jobs.filter(j=>{
  const hay=[j.title,j.company,j.category,...j.tags].join(' ').toLowerCase();
  const searchOk=!searchTerm||hay.includes(searchTerm.toLowerCase());
  const locOk=!locationTerm||j.location.toLowerCase().includes(locationTerm.toLowerCase());
  const filterOk=currentFilter==='All'||j.category===currentFilter|| (currentFilter==='Remote'&&j.location==='Remote');
  return searchOk&&locOk&&filterOk;
 });
 count.textContent=`${filtered.length} roles`;
 grid.innerHTML=filtered.map(j=>`<article class="job-card"><div class="job-top"><div class="company-logo">${escapeHtml(j.logo)}</div><button class="save" aria-label="Save job" data-save="${j.id}">♡</button></div><h3>${escapeHtml(j.title)}</h3><div class="company">${escapeHtml(j.company)}</div><div class="tags">${j.tags.map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}<span class="tag">${escapeHtml(j.type)}</span></div><div class="job-meta"><span>⌖ ${escapeHtml(j.location)}</span><b>${escapeHtml(j.salary)}</b></div><button class="btn apply" data-apply="${j.id}">Apply now</button></article>`).join('');
 grid.querySelectorAll('[data-apply]').forEach(b=>b.addEventListener('click',()=>openApply(Number(b.dataset.apply))));
 grid.querySelectorAll('[data-save]').forEach(b=>b.addEventListener('click',()=>{b.textContent=b.textContent==='♡'?'♥':'♡';b.style.color=b.textContent==='♥'?'#d85d6a':'';toast(b.textContent==='♥'?'Job saved (demo)':'Removed from saved jobs');}));
}
function openApply(id){const j=jobs.find(x=>x.id===id);document.getElementById('applyJobId').value=id;document.getElementById('modalTitle').textContent='Apply: '+j.title;document.getElementById('modal').classList.remove('hidden');}
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400);}
document.getElementById('searchBtn').onclick=()=>{searchTerm=document.getElementById('searchInput').value.trim();locationTerm=document.getElementById('locationInput').value.trim();render();document.getElementById('jobs').scrollIntoView({behavior:'smooth'});};
document.getElementById('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('searchBtn').click();});
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{currentFilter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render();});
document.querySelectorAll('[data-search]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById('searchInput').value=a.dataset.search;searchTerm=a.dataset.search;render();document.getElementById('jobs').scrollIntoView({behavior:'smooth'});});
document.getElementById('closeModal').onclick=()=>document.getElementById('modal').classList.add('hidden');
document.getElementById('modal').onclick=e=>{if(e.target.id==='modal')e.currentTarget.classList.add('hidden');};
document.getElementById('applyForm').onsubmit=e=>{e.preventDefault();const application={jobId:Number(document.getElementById('applyJobId').value),name:document.getElementById('appName').value,email:document.getElementById('appEmail').value,portfolio:document.getElementById('appPortfolio').value,submittedAt:new Date().toISOString()};const key='jobportal-demo-applications';const existing=JSON.parse(localStorage.getItem(key)||'[]');existing.push(application);localStorage.setItem(key,JSON.stringify(existing));e.target.reset();document.getElementById('modal').classList.add('hidden');toast('Demo application submitted!');};
document.getElementById('loginBtn').onclick=()=>toast('Login flow is a backend integration placeholder in this demo.');
document.getElementById('signupBtn').onclick=()=>toast('Registration flow is a backend integration placeholder in this demo.');
render();
