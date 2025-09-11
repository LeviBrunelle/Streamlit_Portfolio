import streamlit as st
import html

def typewriter_heading(
    text: str,
    per_char_ms: int = 55,
    cursor_color: str = "#2B2D42",
    font_size: str = "clamp(5.0rem, 10vw, 8.0rem)",   # bigger by default
    font_weight: int = 900,
    top_margin: str = "0",
    bottom_margin: str = "1rem",
):
    txt = text.strip()
    n   = len(txt)
    dur = max(1, n) * per_char_ms
    safe = html.escape(txt)

    st.markdown(f"""
<style>
.ty {{
  font-size:{font_size} !important;
  font-weight:{font_weight};
  margin:{top_margin} 0 {bottom_margin} 0;
  line-height:1.1;
}}
.ty .txt {{
  position:relative;
  display:inline-block;
  white-space:nowrap;
  clip-path: inset(0 100% 0 0);
  animation:ty-reveal {dur}ms steps({n}, end) forwards;
}}
/* Caret: rides along the right edge of the revealed text */
.ty .txt::after {{
  content:"";
  position:absolute;
  top:0; bottom:0;
  width:0;                      /* a pure border caret */
  border-right:.08em solid {cursor_color};
  left:0;
  /* move from 0% to 100% of the parent width, then
     nudge left so it sits inside the last glyph */
  animation:
    ty-caret-move {dur}ms steps({n}, end) forwards,
    ty-caret-blink 900ms step-end infinite;
}}
@keyframes ty-reveal    {{ to {{ clip-path: inset(0 0 0 0); }} }}
@keyframes ty-caret-move{{ to {{ left: calc(100% - .06em); }} }}
@keyframes ty-caret-blink{{ 50% {{ opacity: 0; }} }}
</style>

<h1 class="ty"><span class="txt">{safe}</span></h1>
""", unsafe_allow_html=True)


def about():
    typewriter_heading("Hi! I'm Levi.", per_char_ms=55)

    # ===== Custom CSS for vertical section labels =====

    st.markdown("""
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;600&family=League+Spartan:wght@700;900&display=swap" rel="stylesheet">

    <style>
    /* grid inside the text column */
    .text-row{
        display: grid;
        grid-template-columns: auto 1fr;      
        align-items: start;                  
        column-gap: .6rem;                  
    }

    /* vertical label (bottom -> top) */
    .text-row .vlabel{
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        text-orientation: mixed;
        font-family: "Oswald", "League Spartan", "Bebas Neue", system-ui, sans-serif;
        font-weight: 700;
        letter-spacing: .08em;
        line-height: 1;
        text-transform: uppercase;
        font-size: 1.25rem;
        margin-top: .28em;
    }

    /* Tighten overall row spacing */
    .section-row { margin-block: 1.75rem; }

    /* mobile: label becomes horizontal above paragraph */
    @media (max-width: 900px){
    .text-row{
        grid-template-columns: 1fr;
        row-gap: .25rem;
    }
    .text-row .vlabel{
        writing-mode: horizontal-tb;
        transform: none;
        letter-spacing: .06em;
        font-size: 0.95rem;
    }
    }

    /* fully justify only the paragraphs in these rows */
    .text-row .copy{
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;     
    line-height: 1.5;
    }

    /* constrain measure for nicer rag/spacing */
    @media (min-width: 900px){
    .text-row .copy{ max-width: 75ch; } 
    }
    </style>
    """, unsafe_allow_html=True)


    # ===== Content rows =====

    # --- Upper Row ---
    txt, img = st.columns([7, 5], vertical_alignment="center")
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Academic</div>
        <div class="copy" lang="en">
            Nanotechnology Engineering @ the University of Waterloo, with a Quantum Engineering option. 
            I spend a lot of time at the Quantum-Nano Centre, touching semiconductor fab, lithography, deposition, 
            materials characterization, polymers, and metallurgy. Next up: a deeper run into quantum physics & computing—
            fueling a long-term curiosity for how matter behaves when the rules get weird.
        </div>
    </div>
    </div>
    """, unsafe_allow_html=True)
    with img:
        st.image("./images/lightning.png", use_container_width=True)


    # --- Middle Row ---
    img, txt = st.columns([5, 7], vertical_alignment="center")
    with img:
        st.image("./images/lightning.png", use_container_width=True)
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Professional</div>
        <div class="copy" lang="en">
            Co-op rotations across industrial process and biotech R&D. At Terray Therapeutics, I built a 3-axis magnetic stage 
            for a lab microscope and used rotational AC fields to manipulate nanoparticles—projects in microscopy, lab-on-chip 
            drug discovery, DNA click chemistry, and surface science. The throughline: rapid prototyping, clean experiments, 
            shipped results.
        </div>
    </div>
    </div>
    """, unsafe_allow_html=True)


    # --- Lower Row ---
    txt, img = st.columns([7, 5], vertical_alignment="center")
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Personal</div>
        <div class="copy" lang="en">
            I'm a maker at heart. I run Archangel Ironworks, forging pattern-welded (Damascus) steel and kitchen 
            knives—recently leveling up the shop with custom tooling and better process control. I post builds and
            progress on Instagram; it keeps me honest and shows the craft behind the steel.
        </div>
    </div>
    </div>
    """, unsafe_allow_html=True)
    with img:
        st.image("./images/lightning.png", use_container_width=True)
