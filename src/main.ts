// src/main.ts
import { mountAbout } from "./pages/about";
import { mountProjects } from "./pages/projects";
import { mountExperience } from "./pages/experience";
import { mountContact } from "./pages/contact";
import { initRevealsForCurrentPage } from "./components/reveal";

// Basic router by pathname
const path = location.pathname;

async function mount() {
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    await mountAbout();
  } else if (path.includes("projects")) {
    await mountProjects();
  } else if (path.includes("experience")) {
    await mountExperience();
  } else if (path.includes("contact")) {
    await mountContact();
  } else {
    // default to About
    await mountAbout();
  }

  // IMPORTANT: run reveals AFTER page markup exists
  initRevealsForCurrentPage();
}

mount();
