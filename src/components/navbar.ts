export function mountNavbar(forceKey?: "about"|"projects"|"experience"|"contact"){
  const host = document.getElementById("navbar");
  if (!host) return;

  // Inject markup inside the header.site-nav
  host.innerHTML = `
    <a class="brand" href="/index.html" aria-label="Home">
      <!-- Use your actual filename: Logo.png or Logo.svg -->
      <img src="/images/icons/Logo.png" alt="Levi Brunelle logo">
    </a>

    <nav class="links">
      <a href="/index.html"        data-key="about">About</a>
      <a href="/projects.html"     data-key="projects">Projects</a>
      <a href="/experience.html"   data-key="experience">Experience</a>
      <a href="/contact.html"      data-key="contact">Contact</a>
    </nav>
  `;

  // Decide which link is active
  const key =
    forceKey ??
    (() => {
      const f = (location.pathname.split("/").pop() || "index.html").toLowerCase();
      if (f.startsWith("index"))      return "about";
      if (f.startsWith("projects"))   return "projects";
      if (f.startsWith("experience")) return "experience";
      if (f.startsWith("contact"))    return "contact";
      return "about";
    })();

  // Apply the persistent underline to the matching link
  host.querySelectorAll<HTMLAnchorElement>(".links a").forEach(a => {
    if (a.dataset.key === key) a.classList.add("active");
  });
}
