// src/pages/projects.ts
import { mountNavbar }   from "../components/navbar";
import { typewriter }    from "../components/typewriter";
import { cardHTML }      from "../components/expander";
import projects          from "../data/projects.json";
import { mountLightbox } from "../components/lightbox";
import { revealStagger } from "../components/reveal";

// path normalizer 
const fix = (p?: string) => (p ? (p.startsWith("/images/") ? p : `/images/${p}`) : undefined);

export function mountProjects(){
  mountNavbar("projects");

  const main = document.querySelector("main")!;
  main.innerHTML = `<h1 id="ty"></h1><div id="cards" class="proj-list"></div>`;
  typewriter(document.querySelector("#ty")!, "I've been working on...");

  const list = document.querySelector<HTMLDivElement>("#cards")!;

  const cards = (projects as any).projects.map((p:any) => {
    // prefer explicit cover/logo from JSON; normalize if it’s just a filename
    const cover = fix(p.logo || p.cover);
    return cardHTML({
      cover,
      title:   p.title,
      dates:   p.dates,
      blurb:   p.blurb,
      bullets: p.bullets,
      skills:  p.skills,
      gallery: p.gallery,
      link_text: p.link_text ?? p.cta ?? p.linkText,
      link_url:  p.link_url  ?? p.link
    });
  }).join("");

  list.innerHTML = cards;

  document.querySelector("main")!.classList.add("projects-page");

  mountLightbox();

  const _cards = Array.from(document.querySelectorAll<HTMLDetailsElement>(".proj-list details.card"));
  _cards.forEach((el, i) => el.style.setProperty("--d", `${i*90}ms`));
  _cards.forEach(el => el.classList.add("reveal-base", "reveal-up"));
  revealStagger(_cards, { step: 90, start: 0 });
}
