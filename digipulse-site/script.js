const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const menuLabel = document.querySelector("[data-menu-label]");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    const label = isOpen ? "Fermer le menu" : "Ouvrir le menu";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", label);
    if (menuLabel) menuLabel.textContent = label;
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
      if (menuLabel) menuLabel.textContent = "Ouvrir le menu";
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector("[data-form-status]");
const formSubmit = document.querySelector("[data-form-submit]");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    // Honeypot: if filled, silently drop (likely a bot)
    if (formData.get("_gotcha")) {
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Envoi en cours...";
      formStatus.classList.remove("is-error", "is-success");
    }
    if (formSubmit) formSubmit.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = "Merci ! Votre demande a bien été envoyée, nous revenons vers vous rapidement.";
          formStatus.classList.add("is-success");
        }
      } else {
        throw new Error("Formspree error");
      }
    } catch (err) {
      if (formStatus) {
        formStatus.textContent = "Une erreur est survenue. Contactez-nous directement sur WhatsApp via l'icône ci-dessus.";
        formStatus.classList.add("is-error");
      }
    } finally {
      if (formSubmit) formSubmit.disabled = false;
    }
  });
}
