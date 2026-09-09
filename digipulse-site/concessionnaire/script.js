(() => {
  const intro = document.getElementById("intro");
  const dialog = document.getElementById("car-dialog");
  const menuToggle = document.querySelector(".menu-toggle");
  // Accueil allongé : maintien visible, puis split des panneaux avant disparition
  const HOLD_MS = 4200;
  const SPLIT_MS = 1800;

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

  function openCar(data) {
    if (!dialog || !data) return;
    document.getElementById("dialog-name").textContent = data.name || "";
    document.getElementById("dialog-price").textContent = data.price || "";
    document.getElementById("dialog-specs").textContent = data.specs || "";
    const imgEl = document.getElementById("dialog-img");
    imgEl.src = data.img || "";
    imgEl.alt = data.name || "";
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function dataFromEl(el) {
    return {
      name: el.dataset.name || "",
      price: el.dataset.price || "",
      specs: el.dataset.specs || "",
      img: el.dataset.img || "",
    };
  }

  // Clic sur la voiture hero → fiche détail
  const heroHit = document.querySelector(".hero-car-hit");
  if (heroHit) {
    heroHit.addEventListener("click", () => openCar(dataFromEl(heroHit)));
  }

  // Clic (ou Entrée) sur une carte catalogue → fiche détail
  document.querySelectorAll(".car-card").forEach((card) => {
    const hit = card.querySelector(".car-hit");
    if (hit) {
      hit.addEventListener("click", (event) => {
        event.preventDefault();
        openCar(dataFromEl(card));
      });
    }
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCar(dataFromEl(card));
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
