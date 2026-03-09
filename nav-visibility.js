(() => {
  const nav = document.querySelector("body > nav");
  if (!nav) return;

  const enfoqueHeading = Array.from(document.querySelectorAll("h4")).find(
    (heading) => heading.textContent && heading.textContent.trim().toLowerCase() === "mi enfoque"
  );

  const triggerDiv = enfoqueHeading
    ? enfoqueHeading.closest("div")
    : document.querySelector(".infop");

  // If the trigger section is missing, keep nav visible to avoid locking it hidden.
  if (!triggerDiv) {
    nav.classList.remove("nav-hidden");
    return;
  }

  const updateNavVisibility = () => {
    const triggerBottom = triggerDiv.getBoundingClientRect().bottom + window.scrollY;
    const shouldShow = window.scrollY > triggerBottom;
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
