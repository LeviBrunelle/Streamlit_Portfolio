// src/components/lightbox.ts
export function mountLightbox() {
  const root = document.body;
  const lb = document.createElement("div");
  lb.className = "lb-backdrop";
  lb.innerHTML = `<div class="lb-wrap"><img alt=""></div><button class="lb-close" aria-label="Close">×</button>`;
  root.appendChild(lb);

  const img = lb.querySelector("img") as HTMLImageElement;
  const close = () => { lb.classList.remove("show"); document.body.style.overflow = ""; };

  lb.addEventListener("click",  (e) => { if (e.target === lb) close(); });
  (lb.querySelector(".lb-close") as HTMLButtonElement).onclick = close;
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.classList.contains("show")) close(); });

  root.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest("a.thumb") as HTMLAnchorElement | null;
    if (!a) return;
    e.preventDefault();
    img.src = a.dataset.lb || a.getAttribute("href") || "";
    lb.classList.add("show");
    document.body.style.overflow = "hidden";
  });
}
