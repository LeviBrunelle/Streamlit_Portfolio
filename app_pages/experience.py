# app_pages/resume.py
from __future__ import annotations

import base64
from pathlib import Path
from textwrap import dedent
import streamlit as st
import yaml

from .about import typewriter_heading

# ---------- paths ----------
APP_DIR = Path(__file__).resolve().parent
ROOT_DIR = APP_DIR.parent
CFG_PATH = ROOT_DIR / "resume.yaml"
IMG_DIR = ROOT_DIR / "images"


# ---------- helpers ----------
def load_yaml(path: Path) -> dict:
    try:
        with path.open("r", encoding="utf-8") as f:
            return yaml.safe_load(f) or {}
    except FileNotFoundError:
        return {}

def get_experience(cfg: dict) -> list[dict]:
    if not isinstance(cfg, dict):
        return []
    exp = cfg.get("experience")
    return exp if isinstance(exp, list) else []

def img_to_data_uri(p: Path) -> str | None:
    if not p or not p.exists():
        return None
    suf = p.suffix.lower()
    if suf in {".png", ".jpg", ".jpeg"}:
        mime = "image/png" if suf == ".png" else "image/jpeg"
        return f"data:{mime};base64,{base64.b64encode(p.read_bytes()).decode('ascii')}"
    if suf == ".svg":
        return p.read_text(encoding="utf-8")
    return None

def logo_html(logo_name: str | None, alt: str) -> str:
    if not logo_name:
        return "<div class='job-logo noimg'></div>"
    uri = img_to_data_uri(IMG_DIR / logo_name)
    if not uri:
        return "<div class='job-logo noimg'></div>"
    if uri.strip().startswith("data:image"):
        return f"<img class='job-logo' src='{uri}' alt='{alt} logo'/>"
    if uri.strip().startswith("<svg"):
        return f"<div class='job-logo svg'>{uri}</div>"
    return "<div class='job-logo noimg'></div>"

def bullets_html(items: list[str]) -> str:
    if not items:
        return ""
    lis = "".join(f"<li>{i}</li>" for i in items)
    return f"<ul class='job-bullets'>{lis}</ul>"

def skills_html(skills: list[str]) -> str:
    if not skills:
        return ""
    pills = "".join(f"<span class='skill-pill'>{s}</span>" for s in skills)
    return f"<div class='skills-row'>{pills}</div>"

def job_details(item: dict, delay_ms: int = 0) -> str:
    role = item.get("role", "")
    org = item.get("org", "")
    dates = item.get("dates", "")
    logo_name = item.get("logo")

    header = (
        "<summary class='job-summary'>"
        f"{logo_html(logo_name, org)}"
        "<div class='job-meta'>"
        f"<div class='job-role'>{role}</div>"
        f"<div class='job-org'><em>{org}</em></div>"
        f"<div class='job-dates'>{dates}</div>"
        "</div>"
        "</summary>"
    )
    body = (
        "<div class='job-body'>"
        f"{bullets_html(item.get('bullets', []))}"
        f"{skills_html(item.get('skills', []))}"
        "</div>"
    )

    return (
        f"<div class='job-wrap enter' style='--delay:{delay_ms}ms'>"
        "<details class='job-card'>"
        f"{header}"
        f"{body}"
        "</details>"
        "</div>"
    )

# ---------- page ----------
def experience():
    typewriter_heading("My career so far.", per_char_ms=55)

    # CSS styling
    st.markdown(
        dedent("""
        <style>
          .rs-wrap{ max-width:1200px; margin: 0 auto; }

          /* Entrance animation */
          .job-wrap{
            text-align: left;
            padding: .3rem 0;
          }
          .job-wrap.enter{
            opacity: 0;
            transform: translateY(14px) scale(.985);
            filter: blur(3px);
            animation: cardIn 540ms cubic-bezier(.2,.7,0,.95) forwards;
            animation-delay: var(--delay, 0ms);
          }
          @keyframes cardIn{
            0%   { opacity:0; transform: translateY(14px) scale(.985); filter: blur(3px); }
            60%  { opacity:1; transform: translateY(-2px) scale(1.00); filter: blur(0); }
            100% { opacity:1; transform: translateY(0)    scale(1.00); filter: blur(0); }
          }

          /* Collapsed card */
          .job-card{
            display: inline-block;
            width: fit-content;
            max-width: min(900px, 92vw);
            text-align: left;
            margin: .9rem 0;
            padding: 14px;
            border: 2px solid transparent;
            border-radius: 18px;
            background: transparent;
            transition:
              border-color 140ms ease,
              background 140ms ease,
              max-width 220ms ease;
          }
          .job-card:hover{
            border-color: #111;
            background: rgba(17,17,17,0.02);
          }

          .job-summary{ list-style:none; cursor:pointer; }
          .job-summary::-webkit-details-marker{ display:none; }

          .job-summary{
            display:grid;
            grid-template-columns: 112px 1fr;
            column-gap: 18px;
            align-items:center;
          }
          .job-logo{
            width:112px; height:112px;
            border-radius:16px;
            object-fit:cover;
            background:#f2f2f2;
            transition:
              width 220ms ease, height 220ms ease, border-radius 220ms ease;
          }
          .job-logo.noimg{ background:transparent; }
          .job-logo.svg svg{ width:112px; height:112px; border-radius:16px; }

          .job-meta{ display:flex; flex-direction:column; gap:.25rem; }
          .job-role{  font-size:1.52rem; font-weight:800; letter-spacing:.01em; transition: font-size 220ms ease; }
          .job-org{   font-size:1.20rem; color: var(--text-color);             transition: font-size 220ms ease; }
          .job-dates{ font-size:1.08rem; opacity:.9;                           transition: font-size 220ms ease; }

          /* Open state — wider and shrink header to normal */
          .job-card[open]{ max-width: min(1100px, 92vw); }
          .job-card[open] .job-summary{ grid-template-columns: 76px 1fr; }
          .job-card[open] .job-logo{ width:76px; height:76px; border-radius:12px; }
          .job-card[open] .job-role{  font-size:1.08rem; }
          .job-card[open] .job-org{   font-size:.98rem; }
          .job-card[open] .job-dates{ font-size:.92rem; }

          /* Body: height animated via JS for smooth open/close. */
          .job-body{ overflow:hidden; }

          /* Content */
          .job-bullets{
            margin: .9rem 0 .75rem 0;
            padding-left: 1.15rem;
          }
          .job-bullets li{
            margin:.35rem 0;
            text-align: justify;
            text-justify: inter-word;
          }
          .skills-row{ display:flex; flex-wrap:wrap; gap:.6rem .8rem; margin-bottom:.25rem; }
          .skill-pill{
            display:inline-flex; align-items:center; justify-content:center;
            padding:.44rem .95rem; border:2px solid currentColor; border-radius:9999px;
            line-height:1; font-weight:700; white-space:nowrap;
          }
        </style>
        """),
        unsafe_allow_html=True,
    )

    # JS for open/close animation
    st.markdown(
        dedent("""
        <script>
        (function () {
          function animateDetails(d) {
            const body = d.querySelector('.job-body');
            if (!body) return;

            // cancel any running transitions
            body.style.transition = 'none';

            if (d.open) {
              // OPEN: 0 -> content height
              const end = body.scrollHeight;
              body.style.height = '0px';
              body.style.overflow = 'hidden';
              requestAnimationFrame(() => {
                body.style.transition = 'height 260ms ease';
                body.style.height = end + 'px';
              });
              body.addEventListener('transitionend', function te() {
                body.style.height = 'auto';
                body.style.overflow = 'visible';
                body.style.transition = '';
                body.removeEventListener('transitionend', te);
              });
            } else {
              // CLOSE: current height -> 0
              const start = body.scrollHeight;
              body.style.height = start + 'px';
              body.style.overflow = 'hidden';
              requestAnimationFrame(() => {
                body.style.transition = 'height 260ms ease';
                body.style.height = '0px';
              });
              body.addEventListener('transitionend', function tc() {
                body.style.transition = '';
                body.removeEventListener('transitionend', tc);
              });
            }
          }

          function bindDetails() {
            document.querySelectorAll('details.job-card').forEach(d => {
              if (d.__bound) return;
              d.__bound = true;

              const body = d.querySelector('.job-body');
              if (body && !d.open) {
                body.style.height = '0px';
                body.style.overflow = 'hidden';
              }
              d.addEventListener('toggle', () => animateDetails(d));
            });
          }

          const init = () => { bindDetails(); };
          init();
          setTimeout(init, 50);
          setTimeout(init, 250);
        })();
        </script>
        """),
        unsafe_allow_html=True,
    )

    cfg = load_yaml(CFG_PATH)
    jobs = get_experience(cfg)

    st.markdown("<div class='rs-wrap'>", unsafe_allow_html=True)

    if not jobs:
        st.info("No experience found in resume.yaml (expected a top-level 'experience:' list).")
        st.markdown("</div>", unsafe_allow_html=True)
        return

    # stagger entrance animation
    for i, j in enumerate(jobs):
        st.markdown(job_details(j, delay_ms=i * 400), unsafe_allow_html=True)

    st.markdown("</div>", unsafe_allow_html=True)

if __name__ == "__main__":
    experience()
