# app_pages/contact.py
import base64, pathlib
from textwrap import dedent
import streamlit as st
from .about import typewriter_heading

EMAIL = "lbrunell@uwaterloo.ca"

def _data_uri(path: str) -> str:
    p = pathlib.Path(path)
    b64 = base64.b64encode(p.read_bytes()).decode("utf-8")
    return f"data:image/png;base64,{b64}"

def contact():
    st.query_params.update(page="contact")
    typewriter_heading("Let's get in touch.", per_char_ms=55)

    # ----- Custom CSS for contact links -----
    st.markdown(dedent("""
    <style>
      :root{
        --ink:#2B2D42;
        --muted:#4B5563;
      }

      .contact-wrap{ margin:0; }
      .vlist{ list-style:none; margin:0; padding:0; }
      .vlist li{ margin:.25rem 0 1rem; }

      /* Staggered entrance (same vibe as Experience) */
      .item{
        opacity:0;
        transform: translateY(14px) scale(.985);
        filter: blur(3px);
      }
      .item.enter{
        animation: cardIn 520ms cubic-bezier(.2,.7,0,.95) forwards;
        animation-delay: var(--d, 0ms);
      }
      @keyframes cardIn{
        0%   { opacity:0; transform: translateY(14px) scale(.985); filter: blur(3px); }
        60%  { opacity:1; transform: translateY(-2px) scale(1.00); filter: blur(0); }
        100% { opacity:1; transform: translateY(0)    scale(1.00); filter: blur(0); }
      }
      @media (prefers-reduced-motion: reduce){
        .item{ opacity:1 !important; transform:none !important; filter:none !important; animation:none !important; }
      }

      /* Row link */
      a.row{
        display:flex; align-items:center; gap:1rem;
        padding:.25rem 0;
        color:var(--ink);
        text-decoration:none;
        background:none; border:none; box-shadow:none; transform:none;
      }
      a.row:visited{ color:var(--ink); }
      a.row:hover{ background:transparent; transform:none; }

      /* Icon sizing */
      .icon{ width:40px; height:40px; flex:0 0 40px; border-radius:.5rem; }

      /* Text block */
      .txt{ display:flex; flex-direction:column; gap:.25rem; }
      .title{ font-weight:800; letter-spacing:.01em; }
      .desc{
        color:var(--muted);
        line-height:1.45;
        position:relative;
      }

      /* Sweep underline on hover (left -> right) */
      .desc::after{
        content:"";
        position:absolute; left:0; right:0; bottom:-3px;
        height:2px; background:#000;
        transform:scaleX(0); transform-origin:left;
        transition:transform .35s ease;
      }
      a.row:hover .desc::after{ transform:scaleX(1); }
    </style>
    """), unsafe_allow_html=True)

    links = [
        {
            "href": f"mailto:{EMAIL}",
            "img": _data_uri("images/email.png"),
            "title": "Email",
            "desc": "Fastest way to reach me for opportunities or questions.",
        },
        {
            "href": "https://www.linkedin.com/in/lbrunell",
            "img": _data_uri("images/linkedin.png"),
            "title": "LinkedIn",
            "desc": "Professional updates and DMs—happy to connect.",
        },
        {
            "href": "https://github.com/LeviBrunelle",
            "img": _data_uri("images/github.png"),
            "title": "GitHub",
            "desc": "Code, experiments, and work-in-progress projects.",
        },
        {
            "href": "https://instagram.com/archangelironworks",
            "img": _data_uri("images/instagram.png"),
            "title": "Instagram",
            "desc": "Bladesmithing and other metal-related projects.",
        },
    ]

    
    items_html = []
    for i, l in enumerate(links):
        delay = i * 400  # ms
        item = (
            f'<li class="item enter" style="--d:{delay}ms">'
            f'  <a class="row" href="{l["href"]}" target="_blank" rel="noopener">'
            f'    <img class="icon" src="{l["img"]}" alt="{l["title"]} icon" />'
            f'    <div class="txt">'
            f'      <div class="title">{l["title"]}</div>'
            f'      <div class="desc">{l["desc"]}</div>'
            f'    </div>'
            f'  </a>'
            f'</li>'
        )
        items_html.append(item)

    html = (
        '<div class="contact-wrap">'
        '<ul class="vlist">'
        + "".join(items_html) +
        '</ul>'
        '</div>'
    )

    st.markdown(html, unsafe_allow_html=True)

    st.markdown("""
    <script>
      (function(){
        const items = document.querySelectorAll('.item');
        items.forEach(el => {
          el.classList.remove('enter');
          void el.offsetWidth;  // Force reflow
          el.classList.add('enter');
        });
      })();
    </script>
    """, unsafe_allow_html=True)
