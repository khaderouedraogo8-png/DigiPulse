(() => {
  const intro = document.getElementById("intro");
  const dialog = document.getElementById("car-dialog");
  const menuToggle = document.querySelector(".menu-toggle");
  const HOLD_MS = 2800; // temps d'accueil allongé avant le split
  const SPLIT_MS = 1400;

  // Intro : maintien puis split des panneaux avant disparition
  if (intro) {
    document.body.classList.add("intro-active");
    window.setTimeout(() => {
      intro.classList.add("is-splitting");
      window.setTimeout(() => {
        intro.classList.add("is-gone");
        document.body.classList.remove("intro-active");
      }, SPLIT_MS);
    }, HOLD_MS);
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function openCarFromCard(card) {
    if (!dialog || !card) return;
    const name = card.dataset.name || "";
    const price = card.dataset.price || "";
    const specs = card.dataset.specs || "";
    const img = card.dataset.img || "";
    document.getElementById("dialog-name").textContent = name;
    document.getElementById("dialog-price").textContent = price;
    document.getElementById("dialog-specs").textContent = specs;
    const imgEl = document.getElementById("dialog-img");
    imgEl.src = img;
    imgEl.alt = name;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  // Clic (ou Entrée) sur la voiture → ouvrir la fiche
  document.querySelectorAll(".car-card").forEach((card) => {
    const hit = card.querySelector(".car-hit");
    if (hit) {
      hit.addEventListener("click", (event) => {
        event.preventDefault();
        openCarFromCard(card);
      });
    }
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCarFromCard(card);
      }
    });
  });

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      alert("Merci — votre message a bien été enregistré (démo).");
    });
  }
})();
