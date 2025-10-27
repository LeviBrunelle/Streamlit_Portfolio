import { mountNavbar } from "../components/navbar";
import { typewriter } from "../components/typewriter";
import { revealStagger } from "../components/reveal";


export function mountAbout(){
  mountNavbar("about");

  const main = document.querySelector("main")!;
  main.className = "about-page"; 

  main.innerHTML = `
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
          force me to learn new skills and result in dependable tools. 
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
  `;

  // Typewriter for the hero
  typewriter(document.querySelector("#about-hero")!, "Hi! I'm Levi.");
}

// === About reveals ===
// Headers (vertical labels) + images first
const _aboutHeaders = document.querySelectorAll<HTMLElement>(".about-row .vlabel");
const _aboutImages  = document.querySelectorAll<HTMLElement>(".about-row .figure");
[..._aboutHeaders, ..._aboutImages].forEach(el => el.classList.add("reveal-base","reveal-up"));
revealStagger([..._aboutHeaders, ..._aboutImages], { step: 120, start: 0 });

// Then paragraphs (slide out from under the headers)
const _aboutParas = document.querySelectorAll<HTMLElement>(".about-row .copy");
_aboutParas.forEach(el => el.classList.add("reveal-base","reveal-up"));
revealStagger(_aboutParas, { step: 120, start: 240 });

