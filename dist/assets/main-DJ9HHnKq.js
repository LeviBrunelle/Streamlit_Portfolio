(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();function h(a){const t=document.getElementById("navbar");if(!t)return;t.innerHTML=`
    <a class="brand" href="/index.html" aria-label="Home">
      <!-- Use your actual filename: Logo.png or Logo.svg -->
      <img src="/images/icons/Logo.png" alt="Levi Brunelle logo">
    </a>

    <nav class="links">
      <a href="/index.html"        data-key="about">About</a>
      <a href="/projects.html"     data-key="projects">Projects</a>
      <a href="/experience.html"   data-key="experience">Experience</a>
      <a href="/contact.html"      data-key="contact">Contact</a>
    </nav>
  `;const o=a??(()=>{const i=(location.pathname.split("/").pop()||"index.html").toLowerCase();return i.startsWith("index")?"about":i.startsWith("projects")?"projects":i.startsWith("experience")?"experience":i.startsWith("contact")?"contact":"about"})();t.querySelectorAll(".links a").forEach(i=>{i.dataset.key===o&&i.classList.add("active")})}function b(a,t,o=40){a.innerHTML='<span class="typewrite"><span class="text"></span><span class="caret"></span></span>';const i=a.querySelector(".text"),e=a.querySelector(".caret");let s=0;function n(){s<=t.length?(i.textContent=t.slice(0,s),s++,requestAnimationFrame(()=>setTimeout(n,o))):e.style.animationPlayState="running"}e.style.animationPlayState="paused",n()}function c(a,t={}){const o=t.step??90,i=t.start??0,e=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&(r.target.classList.add("reveal-in"),e.unobserve(r.target))})},{threshold:.12,rootMargin:"0px 0px -10% 0px"});let s=0;for(const n of a)n.style.setProperty("--d",`${i+s*o}ms`),e.observe(n),s++}function P(){const a=location.pathname;if(a.endsWith("/")||a.endsWith("/index.html")){const t=document.querySelectorAll(".about-row .figure, .about-row .figure img"),o=document.querySelectorAll(".about-row .copy");t.forEach(i=>i.classList.add("reveal-base","reveal-up")),o.forEach(i=>i.classList.add("reveal-base","reveal-up")),c(t,{step:60,start:0}),c(o,{step:60,start:120})}if(a.includes("projects")){const t=document.querySelectorAll("details.card, .card");t.forEach(o=>o.classList.add("reveal-base","reveal-up")),c(t,{step:90,start:0})}if(a.includes("experience")){const t=document.querySelectorAll(".xp-card, details.card, .card");t.forEach(o=>o.classList.add("reveal-base","reveal-up")),c(t,{step:90,start:0})}}function y(){h("about");const a=document.querySelector("main");a.className="about-page",a.innerHTML=`
    <h1 id="about-hero" class="about-hero typewriter no-caret"></h1>

    <!-- ROW 1: text (label+paragraph) → image -->
    <section class="about-row">
      <div class="text">
        <div class="vlabel">Academic</div>
        <article class="copy">
          Nanotechnology Engineering @ the University of Waterloo, Quantum
          Information specialization, and a minor in Combinatorics and Optimization.
          I spend a lot of time at the Quantum-Nano Centre, touching semiconductor
          fab, lithography and materials characterization. Next up: a deeper run
          into quantum physics &amp; computing—fueling a long-term curiosity for how
          matter behaves when the rules get weird.
        </article>
      </div>
      <figure class="figure">
        <img src="/images/qnc.png" alt="Quantum-Nano Centre">
      </figure>
    </section>

    <!-- ROW 2 (STAGGER): image → text (label+paragraph) -->
    <section class="about-row flip">
      <figure class="figure">
        <img src="/images/qnc.png" alt="Project imagery">
      </figure>
      <div class="text">
        <div class="vlabel">Professional</div>
        <article class="copy">
          Coast-to-coast R&amp;D—from Los Angeles to Boston. I've designed microscope
          tooling, deployed data analysis and simulation tools, and turned one-off
          experiments into reliable workflows. I'm happiest solving problems that
          force me to learn new skills and result in dependable tools. Going forward,
          I want to expand my knowledge of software so I can build better tools for scientists,
          engineers, and technicians.
        </article>
      </div>
    </section>

    <!-- ROW 3: text (label+paragraph) → image -->
    <section class="about-row">
      <div class="text">
        <div class="vlabel">Personal</div>
        <article class="copy">
          I'm a craftsman at heart, making real things that last. Archangel Ironworks 
          is my after hours passion— forging custom blades and jewelry, experimenting 
          with fun Damascus steel patterns, and fabricating awesome equipment for the shop. 
          I post some of the cool stuff I make on Instagram. Away from the anvil, I'm an 
          amateur perfumer and musical theatre nerd.
        </article>
      </div>
      <figure class="figure">
        <img src="/images/personal.png" alt="Workshop imagery">
      </figure>
    </section>
  `,b(document.querySelector("#about-hero"),"Hi! I'm Levi.")}const v=document.querySelectorAll(".about-row .vlabel"),w=document.querySelectorAll(".about-row .figure");[...v,...w].forEach(a=>a.classList.add("reveal-base","reveal-up"));c([...v,...w],{step:120,start:0});const k=document.querySelectorAll(".about-row .copy");k.forEach(a=>a.classList.add("reveal-base","reveal-up"));c(k,{step:120,start:240});const l=(a="")=>a.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function x({cover:a,title:t,dates:o,blurb:i,bullets:e=[],skills:s=[],gallery:n=[],link_text:r,link_url:m}){const u=s.length?`<div class="pills">${s.map(d=>`<span class="pill">${l(d)}</span>`).join("")}</div>`:"",p=e.length?`<ul>${e.map(d=>`<li>${l(d)}</li>`).join("")}</ul>`:"",j=n.length?`<div class="gallery">${n.map(d=>`<a class="thumb" data-lb="${l(d)}"><img src="${l(d)}" alt=""></a>`).join("")}</div>`:"",L=r&&m?`<div class="card-link">
         <a class="btn" href="${l(m)}" target="_blank" rel="noopener">${l(r)}</a>
       </div>`:"";return`
<details class="card">
  <summary>
    ${a?`<img class="cover" src="${l(a)}" alt="">`:'<div class="cover"></div>'}
    <div>
      <div class="title">${l(t)}</div>
      ${o?`<div class="dates">${l(o)}</div>`:""}
      ${i?`<p class="blurb">${l(i)}</p>`:""}
    </div>
  </summary>

  ${L}  <!-- slides in when open; styled via .card-link in theme.css -->

  <div class="card-body">
    <div class="card-inner">
      ${p}
      ${u}
      ${j}
    </div>
  </div>
</details>`}const A=[{title:"Olevius",dates:"June 2025 - Present",blurb:"Novel blood pressure monitor - wrist-worn, continuous, and cuffless.",cover:"/images/projects/olevius/Olevius.png",link:"https://olevius.info/",link_text:"View Website",bullets:["Engineering capstone project, aiming to grow into a startup.","Building a wrist-worn device to measure blood pressure continuously without a traditional cuff.","Clinical accuracy goal of ±3 mmHg, comparable to gold-standard cuff-based measurements.","My roles: mechanical design and fabrication, optical simulation and fabrication, signal processing"],skills:["Optical Simulation","Signal Processing","python","Fiber Optics","Fusion360","COMSOL"]},{title:"GPU-Accelerated Lens Simulator",dates:"June 2025 - July 2025",blurb:"GPU-accelerated diffraction modeling with a Streamlit UI.",cover:"/images/projects/lens-sim/1mm_biconvex_lens.png",link:"https://github.com/LeviBrunelle/PyTorch_Diffraction_Simulation",link_text:"View Github Repo",bullets:["~10x speedup (vs CPU) via GPU acceleration with PyTorch.","Can accommodate arbitrary number of lens elements in the optical path.","Simulation metrics include PSF, MTF, effective and back focal lengths.","Visualization of 2D intensity field with optional dark mode.","Custom Streamlit UI for fast, responsive parameter tweaking.","Plans to add many more features, including different optical components and metrics."],skills:["Python","PyTorch","Scalar Wave Optics","OOP","Streamlit"],gallery:["/images/projects/lens-sim/gui1.png","/images/projects/lens-sim/gui2.png","/images/projects/lens-sim/gui3.png","/images/projects/lens-sim/gui4.png"]},{title:"Knife Vise",dates:"September 2025",blurb:"3-axis benchtop vise for securely holding knives during hand sanding.",cover:"/images/projects/knife-vise/cover.png",bullets:["3 degrees of freedom allows for precise positioning and stability.","Features adjustable clamps to securely hold various blade shapes.","Compact design fits on most workbenches without sacrificing space.","Spring loaded jaws for quick and easy release of the blade.","Will be fabricated this winter break."],skills:["Fusion360"],gallery:["/images/projects/knife-vise/img1.png","/images/projects/knife-vise/img2.png","/images/projects/knife-vise/img3.png"]},{title:"2x72 Belt Grinder",dates:"February 2025",blurb:"3hp belt grinder for knife making and metal fabrication.",cover:"/images/projects/grinder/img1.png",bullets:["3hp motor with vfd means the belt will maintain speed under any load.","2-axis belt tracking system ensures consistent alignment and prevents wobble.","Can be tilted from 0-90 degrees for different grinding tasks.",`Accepts industry standard 1.5" square tooling arms in case I'd rather buy an attachment than make one.`,"Adjustable work rest, small wheel holder, various contact wheels, different platen hardnesses, and surface grinder"],skills:["Fusion360","Sheet Metal Design","MIG Welding","Manual Lathe","Manual Mill","CNC Laser Cutting"],gallery:["/images/projects/grinder/img1.png","/images/projects/grinder/img2.png","/images/projects/grinder/img3.png","/images/projects/grinder/img4.png","/images/projects/grinder/img5.png","/images/projects/grinder/img6.png"]},{title:"Surface Grinding Attachment",dates:"December 2025",blurb:"Attachment for 2x72 belt grinder to enable precise surface grinding capabilities.",cover:"/images/projects/surface/img1.png",bullets:['Standard 1.5" tooling arm to fit in most grinders',"Entirely manually machined aluminum body.","Includes 7 switchable magnets in the chuck to hold workpieces securely.","Rigid dovetail feed mechanism with UHMW gibs for smooth, tight control.","Sine bar built into the chuck to allow for grinding precise tapers.",'Extra wide 3" contact wheel for tracking back and forth across a wide workpiece.'],skills:["Fusion360","Manual Mill"],gallery:["/images/projects/surface/img1.png","/images/projects/surface/img2.png","/images/projects/surface/img3.png","/images/projects/surface/img4.png","/images/projects/surface/img5.png"]}],q={projects:A};function S(){const a=document.body,t=document.createElement("div");t.className="lb-backdrop",t.innerHTML='<div class="lb-wrap"><img alt=""></div><button class="lb-close" aria-label="Close">×</button>',a.appendChild(t);const o=t.querySelector("img"),i=()=>{t.classList.remove("show"),document.body.style.overflow=""};t.addEventListener("click",e=>{e.target===t&&i()}),t.querySelector(".lb-close").onclick=i,window.addEventListener("keydown",e=>{e.key==="Escape"&&t.classList.contains("show")&&i()}),a.addEventListener("click",e=>{const s=e.target.closest("a.thumb");s&&(e.preventDefault(),o.src=s.dataset.lb||s.getAttribute("href")||"",t.classList.add("show"),document.body.style.overflow="hidden")})}const E=a=>a?a.startsWith("/images/")?a:`/images/${a}`:void 0;function I(){h("projects");const a=document.querySelector("main");a.innerHTML='<h1 id="ty"></h1><div id="cards" class="proj-list"></div>',b(document.querySelector("#ty"),"I've been working on...");const t=document.querySelector("#cards"),o=q.projects.map(e=>{const s=E(e.logo||e.cover);return x({cover:s,title:e.title,dates:e.dates,blurb:e.blurb,bullets:e.bullets,skills:e.skills,gallery:e.gallery,link_text:e.link_text??e.cta??e.linkText,link_url:e.link_url??e.link})}).join("");t.innerHTML=o,document.querySelector("main").classList.add("projects-page"),S();const i=Array.from(document.querySelectorAll(".proj-list details.card"));i.forEach((e,s)=>e.style.setProperty("--d",`${s*90}ms`)),i.forEach(e=>e.classList.add("reveal-base","reveal-up")),c(i,{step:90,start:0})}const M=[{title:"Lithography Intern",company:"Irradiant Technologies",location:"Boston, MA",dates:"May 2025 - Aug 2025",logo:"/images/jobs/irradiant_logo.png",link:"https://github.com/LeviBrunelle/PyTorch_Diffraction_Simulation",link_text:"View Github Repo",bullets:["Proposed, designed, and built an image-processing pipeline in Python to detect sample interfaces on a 2-photon lithography system, applying piecewise regression models and vectorized array calculations to generate 3D surface maps of warping, tilt, and roughness for precise print-plane calibration.","Built a GPU-accelerated lens simulation tool in PyTorch with a Streamlit GUI, enabling ~10x speedup in realistic diffraction modeling of complex optical systems.","Designed and fabricated optical components using 2-photon lithography; validated performance using image-analysis scripts and metrology tools.","Modeled and machined precise mounting components for optical breadboard setups, enabling the optical engineers to create more complex custom lithography and metrology systems."],skills:["Python","PyTorch","Scikit","SciPy","NumPy","Image Processing","Wave Optics","2-Photon Lithography","Confocal Microscopy","Streamlit"]},{title:"R&D Engineering Intern",company:"Terray Therapeutics",location:"Pasadena, CA",dates:"Sep 2023 - Apr 2024",logo:"/images/jobs/terray_logo.png",bullets:["Designed and fabricated a 3-axis AC electromagnetic microscope stage using Fusion360, CNC, and manual machining to enable live nanoparticle manipulation.","Developed image processing scripts using NumPy, Scikit-Learn, Pandas, and ImageJ to extract and analyze intensity data, ultimately discovering a more efficient surface chemistry for microarrays and improving loading efficiency by 20%.","Optimized microarray loading procedure by designing and printing custom sample holders, reducing touchpoints from 12 to 5.","Performed experiments on gold-thiol and nitride functionalized coatings for silicon microarrays to reduce non-specific binding of bio-enabled nanoparticles."],skills:["Surface Chemistry","Python","Image Processing","Electromag","DNA Click","Fluorescent Microscopy","Fusion360"]},{title:"Process Engineering Intern",company:"Evonik Industries",location:"Maitland, ON",dates:"May 2022 - Aug 2022",logo:"/images/jobs/evonik_logo.png",bullets:["Engineered a project to fix the RO water filtration system by processing instrument data with Pandas, performing water tests, and doing Root Cause Analysis to find and replace components and chemicals, saving the plant an estimated $60 000/year.","Specced, procured, and replaced plant instruments."],skills:["Data Processing","Root Cause Analysis","Plant Instrumentation","Process Engineering","Reverse Osmosis","Excel VBA"]},{title:"Bladesmith / Founder",company:"Archangel Ironworks",location:"Winnipeg, MB",dates:"Ongoing",logo:"/images/jobs/archangel_logo.jpg",link:"https://www.instagram.com/archangelironworks/",link_text:"View Instagram Profile",skills:["Bladesmithing","Blacksmithing","Welding","Metal Fabrication","Manual Machining","Woodworking","Jewelry Making"],bullets:["Designs and creates performance custom blades, pattern-welded (Damascus) steel, and jewelry.","Fabricates shop equipment such as belt grinders and forging presses using SMAW/GMAW, manual machining, and other fabrication techniques."]}],$={roles:M},C=a=>a?a.startsWith("/images/")?a:`/images/${a}`:void 0;function O(){h("experience");const a=document.querySelector("main");a.innerHTML='<h1 id="ty"></h1><div id="cards" class="xp-list"></div>',b(document.querySelector("#ty"),"My career so far.");const t=document.querySelector("#cards"),o=$.roles||[],i=o.map(n=>x({cover:C(n.logo),title:n.title,dates:n.dates,blurb:n.company,bullets:n.bullets,skills:n.skills,gallery:n.gallery,link_text:n.link_text??n.cta??n.linkText,link_url:n.link_url??n.link})).join("");t.innerHTML=i,t.querySelectorAll("details.card > summary .blurb").forEach((n,r)=>{var p;const m=(p=o[r])==null?void 0:p.location;if(!m)return;const u=document.createElement("div");u.className="location",u.textContent=m,n.insertAdjacentElement("afterend",u)}),document.querySelector("main").classList.add("experience-page"),S();const s=Array.from(document.querySelectorAll(".xp-list details.card"));s.forEach((n,r)=>n.style.setProperty("--d",`${r*90}ms`)),s.forEach(n=>n.classList.add("reveal-base","reveal-up")),c(s,{step:90,start:0})}function W(){h();const a=document.querySelector("main");a.innerHTML=`
    <h1 class="typewriter no-caret">Let's get in touch.</h1>

    <div class="contact-list" style="max-width:780px; margin-top:18px">
      ${f("/images/socials/email.png","Email","Fastest way to reach me for opportunities or questions.","mailto:lbrunell@uwaterloo.ca")}
      ${f("/images/socials/linkedin.png","LinkedIn","Professional updates and DMs—happy to connect.","https://www.linkedin.com/in/lbrunell/")}
      ${f("/images/socials/github.png","GitHub","Code, experiments, and work-in-progress projects.","https://github.com/levibrunelle/")}
      ${f("/images/socials/instagram.png","Instagram","Bladesmithing and other metal-related projects.","https://www.instagram.com/archangelironworks/")}
    </div>
  `,b(document.querySelector("h1"),"Let's get in touch.");const t=Array.from(document.querySelectorAll(".contact-item"));t.forEach((i,e)=>i.style.setProperty("--delay",`${e*90}ms`));const o=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),o.unobserve(e.target))})},{threshold:.12,rootMargin:"0px 0px -10% 0px"});t.forEach(i=>o.observe(i))}function f(a,t,o,i){return`
    <div class="contact-item">
      <div style="display:grid; grid-template-columns:52px 1fr; gap:16px; align-items:center">
        <img class="contact-icon" src="${a}" alt="${t}" style="width:52px; height:52px" />
        <div>
          <div class="contact-title" style="font-weight:800; font-size:22px">${t}</div>
          <a class="contact-desc" href="${i}">${o}</a>
        </div>
      </div>
    </div>
  `}const g=location.pathname;async function _(){g.endsWith("/")||g.endsWith("/index.html")?await y():g.includes("projects")?await I():g.includes("experience")?await O():g.includes("contact")?await W():await y(),P()}_();
