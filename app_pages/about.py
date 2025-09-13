import streamlit as st
import html, secrets

def typewriter_heading(
    text: str,
    per_char_ms: int = 55,
    cursor_color: str = "#2B2D42",
    font_size: str = "clamp(5.0rem, 10vw, 8.0rem)",
    font_weight: int = 900,
    top_margin: str = "0",
    bottom_margin: str = "1rem",
):
    txt = text.strip()
    n   = max(1, len(txt))
    dur = n * per_char_ms
    uid = secrets.token_hex(3)  # 6-hex unique id per render
    safe = html.escape(txt)

    st.markdown(f"""
<style>
.ty-{uid} {{
  font-size:{font_size} !important;
  font-weight:{font_weight};
  margin:{top_margin} 0 {bottom_margin} 0;
  line-height:1.1;
}}
.ty-{uid} .txt {{
  position:relative;
  display:inline-block;
  white-space:nowrap;
  clip-path: inset(0 100% 0 0);
  animation: ty-reveal-{uid} {dur}ms steps({n}, end) forwards;
}}
.ty-{uid} .txt::after {{
  content:"";
  position:absolute;
  top:0; bottom:0;
  width:0; border-right:.08em solid {cursor_color};
  left:0;
  animation:
    ty-caret-move-{uid} {dur}ms steps({n}, end) forwards,
    ty-caret-blink-{uid} 900ms step-end infinite;
}}
@keyframes ty-reveal-{uid}    {{ to {{ clip-path: inset(0 0 0 0); }} }}
@keyframes ty-caret-move-{uid}{{ to {{ left: calc(100% - .06em); }} }}
@keyframes ty-caret-blink-{uid}{{ 50% {{ opacity: 0; }} }}
</style>

<h1 class="ty-{uid}"><span class="txt">{safe}</span></h1>
""", unsafe_allow_html=True)


def about():
    st.query_params.update(page="about")
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

        /* fully justify the paragraphs */
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
                        
    /* ---------- Slide-out reveal from the label side ---------- */
                
        .text-row .copy > .slide{
        --dist: 1.25rem; 
        --dur:  700ms; 
        --ease: cubic-bezier(.22,.61,.36,1);
        --delay: 150ms;

        transform: translateX(calc(-1 * var(--dist)));
        opacity:0;
        animation: copy-slide-in var(--dur) var(--ease) var(--delay) forwards;
        }

        .text-row.label-right{ grid-template-columns:1fr auto; } 
        .text-row.label-right .copy > .slide{
        transform: translateX(var(--dist));  
        }

        /* keyframes */
        @keyframes copy-slide-in{
        to{ transform: translateX(0); opacity:1; }
        }

        /* Respect user “reduce motion” preference */
        @media (prefers-reduced-motion:reduce){
        .text-row .copy > .slide{ animation:none; transform:none; opacity:1; }
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
                <div class="copy">
                    <div class="slide" style="--delay:800ms;">
                        Nanotechnology Engineering @ the University of Waterloo, Quantum Information specialization, and a minor in
                        Combinatorics and Optimization. I spend a lot of time at the Quantum-Nano Centre, touching semiconductor fab, 
                        lithography and materials characterization. Next up: a deeper run into quantum physics & computing— fueling a 
                        long-term curiosity for how matter behaves when the rules get weird.
                    </div>
                </div>
            </div>
            </div>
            """, unsafe_allow_html=True)
    # with img:
    #     st.image("./images/lightning.png", width='stretch')


    # --- Middle Row ---
    img, txt = st.columns([5, 7], vertical_alignment="center")
    # with img:
    #     st.image("./images/lightning.png", width='stretch')
    with txt:
        st.markdown("""
            <div class="section-row">
            <div class="text-row">
                <div class="vlabel">Professional</div>
                <div class="copy" lang="en">
                    <div class="slide" style="--delay:1400ms;">
                        Coast-to-coast R&D—from Los Angeles to Boston. I've designed microscope tooling, 
                        deployed data analysis and simulation tools, and turned one-off experiments into 
                        reliable workflows. I'm happiest solving problems that force me to learn new skills 
                        and result in dependable tools.
                    </div>
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
                    <div class="slide" style="--delay:2200ms;">
                        I'm a craftsman at heart, making real things that last. Archangel Ironworks is my 
                        after hours passion— forging custom blades and jewelry, experimenting with fun 
                        Damascus steel patterns, and fabricating awesome equipment for the shop. I post some 
                        of the cool stuff I make on Instagram. Away from the anvil, I'm an amateur perfumer 
                        and musical theatre nerd.
                    </div>
                </div>
            </div>
            </div>
            """, unsafe_allow_html=True)
    # with img:
    #     st.image("./images/lightning.png", width='stretch')
