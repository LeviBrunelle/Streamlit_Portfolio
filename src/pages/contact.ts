import { mountNavbar } from "../components/navbar";
import { typewriter } from "../components/typewriter";

export function mountContact() {
  mountNavbar();

  const main = document.querySelector("main")!;
  main.innerHTML = `
    <h1 class="typewriter no-caret">Let's get in touch.</h1>

    <div class="contact-list" style="max-width:780px; margin-top:18px">
      ${item("/images/socials/email.png",   "Email",    "Fastest way to reach me for opportunities or questions.", "mailto:lbrunell@uwaterloo.ca")}
      ${item("/images/socials/linkedin.png","LinkedIn", "Professional updates and DMs—happy to connect.",         "https://www.linkedin.com/in/lbrunell/")}
      ${item("/images/socials/github.png",  "GitHub",   "Code, experiments, and work-in-progress projects.",       "https://github.com/levibrunelle/")}
      ${item("/images/socials/instagram.png",   "Instagram","Bladesmithing and other metal-related projects.",     "https://www.instagram.com/archangelironworks/")}
    </div>
  `;

  // animate the header typing
  typewriter(document.querySelector<HTMLElement>("h1")!, "Let's get in touch.");

  // === Stagger & reveal ===
  const items = Array.from(document.querySelectorAll<HTMLElement>(".contact-item"));
  items.forEach((el, i) => el.style.setProperty("--delay", `${i * 90}ms`));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => io.observe(el));
}

/* one contact row */
function item(icon: string, title: string, desc: string, href: string): string {
  return `
    <div class="contact-item">
      <div style="display:grid; grid-template-columns:52px 1fr; gap:16px; align-items:center">
        <img class="contact-icon" src="${icon}" alt="${title}" style="width:52px; height:52px" />
        <div>
          <div class="contact-title" style="font-weight:800; font-size:22px">${title}</div>
          <a class="contact-desc" href="${href}">${desc}</a>
        </div>
      </div>
    </div>
  `;
}


