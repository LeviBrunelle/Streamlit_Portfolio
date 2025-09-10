import streamlit as st

st.set_page_config(page_title="Levi Brunelle", layout="wide")

about   = st.Page("app_pages/about.py",    title="About",    icon=":material/home:")
projects= st.Page("app_pages/projects.py", title="Projects", icon=":material/collections_bookmark:")
resume  = st.Page("app_pages/resume.py",   title="Resume",   icon=":material/description:")
contact = st.Page("app_pages/contact.py",  title="Contact",  icon=":material/mail:")

nav = st.navigation([about, projects, resume, contact], position="top")  # ribbon
nav.run()