import streamlit as st

def projects():
    st.query_params.update(page="projects")
    st.title("Projects")
    st.write("Projects page placeholder")