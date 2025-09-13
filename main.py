import streamlit as st
from streamlit_navigation_bar import st_navbar
import os
import app_pages as pg

# ===== Streamlit Page Setup =====
st.set_page_config(page_title="Levi Brunelle", layout="wide", page_icon="./images/Logo.svg")


# ===== Navigation Bar =====

# --- Logo ---
parent_dir = os.path.dirname(os.path.abspath(__file__))
logo_path = os.path.join(parent_dir, "images/Logo.svg")

# --- Page Names ---
pages = ["About", "Projects", "Resume", "Contact"]

# --- Built-in styling ---
styles = {
    "nav":  {"background-color": "transparent", "height": "9.25rem",
             "padding": "0 0", "justify-content": "flex-start", "align-items": "center"},
    "div":  {"max-width": "100%", "width": "auto"},
    "ul":   {"gap": "2rem", "justify-content": "flex-start"},
    "img":  {"height": "7.75rem", "margin-right": "0.0rem"},
    "a":    {"padding": "8px 10px", "text-decoration": "none"},
    "span": {"font-size": "1.45rem", "font-weight": "800"},
    "active": {
        "background-color": "transparent",
        "color": "var(--text-color)",
        "--active-underline": "1",}
}

# --- CSS to add an underline sweep effect on hover ---
css = """
/* reset */
nav ul li a { text-decoration: none; background: transparent; }
nav ul li a span { position: relative; display: inline-block; }

/* one underline pseudo-element */
nav ul li a span::after{
  content:"";
  position:absolute; left:0;
  bottom:-6px;                
  height:2px;                 
  width:100%;
  background:#111;
  transform:scaleX(0);
  transform-origin:left center;
  transition:transform 180ms ease-out;
}

/* show on hover */
nav ul li a:hover span::after{ transform:scaleX(1); }

/* keep it open for the active page */
nav ul li a span[style*="--active-underline"]::after{
  transform:scaleX(1);
}
"""


# --- Create the navbar ---
selected = st_navbar(
    pages,
    selected="About", 
    logo_path=logo_path,         
    styles=styles,
    css=css,                 
    options={"hide_nav": True, "show_menu": True, "show_sidebar": False, "use_padding": False},
    adjust=True,
)



# --- Route ---
if selected == "About": pg.about()
elif selected == "Projects": pg.projects()
elif selected == "Resume": pg.resume()
elif selected == "Contact": pg.contact()





