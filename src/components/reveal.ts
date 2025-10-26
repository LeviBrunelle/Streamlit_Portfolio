// src/components/reveal.ts


export function revealStagger(
  nodes: Iterable<HTMLElement>,
  opts: { step?: number; start?: number } = {}
) {
  const step  = opts.step  ?? 90; 
  const start = opts.start ?? 0;  

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("reveal-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  let i = 0;
  for (const el of nodes) {
    el.style.setProperty("--d", `${start + i * step}ms`);
    io.observe(el);
    i++;
  }
}

/**
 * Auto-detects elements on the current page and applies reveal classes
 */
export function initRevealsForCurrentPage() {
  const path = location.pathname;

  // ABOUT: images first, then paragraphs
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    const images = document.querySelectorAll<HTMLElement>(".about-row .figure, .about-row .figure img");
    const paras  = document.querySelectorAll<HTMLElement>(".about-row .copy");

    images.forEach(el => el.classList.add("reveal-base","reveal-up"));
    paras.forEach(el  => el.classList.add("reveal-base","reveal-up"));

    revealStagger(images, { step: 60, start: 0 });
    revealStagger(paras,  { step: 60, start: 120 });
  }


  // PROJECTS: each card slides in one after another
  if (path.includes("projects")) {
    const cards = document.querySelectorAll<HTMLElement>("details.card, .card");
    cards.forEach(el => el.classList.add("reveal-base","reveal-up"));
    revealStagger(cards, { step: 90, start: 0 });
  }

  // EXPERIENCE: each card slides in one after another
  if (path.includes("experience")) {
    const cards = document.querySelectorAll<HTMLElement>(".xp-card, details.card, .card");
    cards.forEach(el => el.classList.add("reveal-base","reveal-up"));
    revealStagger(cards, { step: 90, start: 0 });
  }
}
