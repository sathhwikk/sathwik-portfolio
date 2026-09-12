const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
  observer.observe(el);
});

function closeLightbox() {
  const overlay = document.querySelector(".image-lightbox");
  if (overlay) overlay.remove();
}

document.querySelectorAll(".demo-item img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Expanded project screenshot");
    overlay.innerHTML = `<button class="lightbox-close" aria-label="Close image">×</button>`;

    const large = document.createElement("img");
    large.src = img.src;
    large.alt = img.alt;
    overlay.appendChild(large);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.classList.contains("lightbox-close")) closeLightbox();
    });

    document.body.appendChild(overlay);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
