import streamlit as st


def about():
    st.title("Hi! I'm Levi.")

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
        align-items: center;                  
        column-gap: .6rem;                  
    }

    /* vertical label (bottom -> top) */
    .text-row .vlabel{
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        text-orientation: mixed;
        font-family: "Bebas Neue", "Oswald", "League Spartan", system-ui, sans-serif;
        font-weight: 700;
        letter-spacing: .08em;
        line-height: 1;
        text-transform: uppercase;
        font-size: 1.25rem;
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
    </style>
    """, unsafe_allow_html=True)


    # Row 1 — text | image
    
    txt, img = st.columns([7, 5], vertical_alignment="center")
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Academic</div>
        <div>
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

    # Row 2 — image | text
    img, txt = st.columns([5, 7], vertical_alignment="center")
    with img:
        st.image("./images/lightning.png", use_container_width=True)
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Professional</div>
        <div>
        Co-op rotations across industrial process and biotech R&D. At Terray Therapeutics, I built a 3-axis magnetic stage 
        for a lab microscope and used rotational AC fields to manipulate nanoparticles—projects in microscopy, lab-on-chip 
        drug discovery, DNA click chemistry, and surface science. The throughline: rapid prototyping, clean experiments, 
        shipped results.
        </div>
    </div>
    </div>
    """, unsafe_allow_html=True)

    # Row 3 — text | image
    txt, img = st.columns([7, 5], vertical_alignment="center")
    with txt:
        st.markdown("""
    <div class="section-row">
    <div class="text-row">
        <div class="vlabel">Personal</div>
        <div>
            I'm a maker at heart. I run Archangel Ironworks, forging pattern-welded (Damascus) steel and kitchen 
            knives—recently leveling up the shop with custom tooling and better process control. I post builds and
            progress on Instagram; it keeps me honest and shows the craft behind the steel.
        </div>
    </div>
    </div>
    """, unsafe_allow_html=True)
    with img:
        st.image("./images/lightning.png", use_container_width=True)

