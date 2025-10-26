// src/components/expander.ts

type CardOpts = {
  cover?:   string;
  title:    string;
  dates?:   string;
  blurb?:   string;
  bullets?: string[];
  skills?:  string[];
  gallery?: string[];
  link_text?: string;
  link_url?:  string;
};

const esc = (s:string='') =>
  s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m] as string));

export function cardHTML({
  cover, title, dates, blurb, bullets = [], skills = [], gallery = [],
  link_text, link_url
}: CardOpts): string {

  const pills = skills.length
    ? `<div class="pills">${skills.map(s => `<span class="pill">${esc(s)}</span>`).join("")}</div>`
    : "";

  const bulletList = bullets.length
    ? `<ul>${bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`
    : "";

  const galleryStrip = gallery.length
    ? `<div class="gallery">${gallery.map(src =>
        `<a class="thumb" data-lb="${esc(src)}"><img src="${esc(src)}" alt=""></a>`
      ).join("")}</div>`
    : "";

  const cta = (link_text && link_url)
    ? `<div class="card-link">
         <a class="btn" href="${esc(link_url)}" target="_blank" rel="noopener">${esc(link_text)}</a>
       </div>`
    : "";

  return `
<details class="card">
  <summary>
    ${cover ? `<img class="cover" src="${esc(cover)}" alt="">` : `<div class="cover"></div>`}
    <div>
      <div class="title">${esc(title)}</div>
      ${dates ? `<div class="dates">${esc(dates)}</div>` : ``}
      ${blurb ? `<p class="blurb">${esc(blurb)}</p>` : ``}
    </div>
  </summary>

  ${cta}  <!-- slides in when open; styled via .card-link in theme.css -->

  <div class="card-body">
    <div class="card-inner">
      ${bulletList}
      ${pills}
      ${galleryStrip}
    </div>
  </div>
</details>`;
}
