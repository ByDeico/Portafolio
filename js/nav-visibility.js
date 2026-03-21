(() => {
  const nav = document.querySelector("nav");
  if (!nav) {
    console.error("No se encontró el elemento <nav>.");
    return;
  }

  const triggerSection =
    document.querySelector(".seccion.mi-enfoque") || document.querySelector(".mi-enfoque");
  const desktopQuery = window.matchMedia("(min-width: 769px)");
  const navToggle = nav.querySelector(".nav-toggle");

  if (navToggle) {
    const closeMobileMenu = () => {
      if (!desktopQuery.matches) {
        navToggle.checked = false;
      }
    };

    const navLinks = nav.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      if (!desktopQuery.matches && navToggle.checked && !nav.contains(event.target)) {
        navToggle.checked = false;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    desktopQuery.addEventListener("change", () => {
      if (desktopQuery.matches) {
        navToggle.checked = false;
      }
    });
  }

  if (!triggerSection) {
    console.warn(
      "No se encontró el elemento con la clase 'mi-enfoque'. Manteniendo la barra visible."
    );
    nav.classList.remove("nav-hidden");
    return;
  }

  const updateNavVisibility = () => {
    if (!desktopQuery.matches) {
      nav.classList.remove("nav-hidden");
      return;
    }

    const triggerRect = triggerSection.getBoundingClientRect();
    const triggerBottom = triggerRect.bottom + window.scrollY;
    const shouldShow = window.scrollY >= triggerBottom;

    nav.classList.toggle("nav-hidden", !shouldShow);
  };

  let isTicking = false;
  const onScroll = () => {
    if (isTicking) return;

    isTicking = true;
    window.requestAnimationFrame(() => {
      updateNavVisibility();
      isTicking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateNavVisibility);

  updateNavVisibility();
})();
