(() => {
  const nav = document.querySelector("body > nav");
  if (!nav) {
    console.error("No se encontró el elemento <nav>.");
    return;
  }

  const triggerDiv = document.querySelector(".perfil-profesional");

  if (!triggerDiv) {
    console.warn(
      "No se encontró el elemento con la clase 'perfil-profesional'. Manteniendo la barra visible."
    );
    nav.classList.remove("nav-hidden");
    return;
  }

  const updateNavVisibility = () => {
    const triggerRect = triggerDiv.getBoundingClientRect();
    const triggerBottom = triggerRect.bottom + window.scrollY;
    const shouldShow = window.scrollY > triggerBottom;

    console.log(
      "triggerRect:",
      triggerRect,
      "triggerBottom:",
      triggerBottom,
      "scrollY:",
      window.scrollY,
      "shouldShow:",
      shouldShow
    );

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

  console.info("Iniciando visibilidad de navegación.");
  updateNavVisibility();
})();
