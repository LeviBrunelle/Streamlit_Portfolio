import streamlit as st

def resume():
    st.query_params.update(page="resume")
    st.title("Resume")
    st.write("Resume page placeholder")