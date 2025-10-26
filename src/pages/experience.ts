// src/pages/experience.ts
import { mountNavbar }   from "../components/navbar";
import { typewriter }    from "../components/typewriter";
import { cardHTML }      from "../components/expander";
import experience        from "../data/experience.json";
import { mountLightbox } from "../components/lightbox";
import { revealStagger } from "../components/reveal";

// path normalizer
const fix = (p?: string) => (p ? (p.startsWith("/images/") ? p : `/images/${p}`) : undefined);

export function mountExperience(){
  mountNavbar("experience");

  const main = document.querySelector("main")!;
  main.innerHTML = `<h1 id="ty"></h1><div id="cards" class="xp-list"></div>`;
  typewriter(document.querySelector("#ty")!, "My career so far.");

  const list = document.querySelector<HTMLDivElement>("#cards")!;

  // keep roles so we can inject location after render
  const roles: any[] = (experience as any).roles || [];

  const cards = roles.map((r:any) => cardHTML({
    cover:   fix(r.logo),
    title:   r.title,
    dates:   r.dates,
    blurb:   r.company,
    bullets: r.bullets,
    skills:  r.skills,
    gallery: r.gallery,
    link_text: r.link_text ?? r.cta ?? r.linkText,
    link_url:  r.link_url  ?? r.link
  })).join("");

  list.innerHTML = cards;



  const blurbs = list.querySelectorAll<HTMLParagraphElement>('details.card > summary .blurb');
  blurbs.forEach((el, i) => {
    const loc = roles[i]?.location;
    if (!loc) return;
    const locDiv = document.createElement('div');
    locDiv.className = 'location';
    locDiv.textContent = loc;
    el.insertAdjacentElement('afterend', locDiv);
  });

  document.querySelector("main")!.classList.add("experience-page");

  mountLightbox();

  const _cards = Array.from(document.querySelectorAll<HTMLDetailsElement>(".xp-list details.card"));
  _cards.forEach((el, i) => el.style.setProperty("--d", `${i*90}ms`));
  _cards.forEach(el => el.classList.add("reveal-base", "reveal-up"));
  revealStagger(_cards, { step: 90, start: 0 });
}
