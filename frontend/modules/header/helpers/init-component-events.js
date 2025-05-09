import { toggleOverlay } from "../../../utils/toggle-overlay.js";

export const initComponentEvents = (instance) => {
  const controller = new AbortController();
  const { signal } = controller;

  const openButton = instance.querySelector("#open-menu-btn");
  const closeButton = instance.querySelector("#close-menu-btn");
  const navLinks = instance.querySelectorAll(".nav__links a");
  const navElement = instance.querySelector("div.nav");

  const closeMenu = () => {
    navElement.classList.remove("nav--opened");
    toggleOverlay();
  };

  const openMenu = () => {
    navElement.classList.add("nav--opened");
    toggleOverlay(closeMenu);
  };

  openButton.addEventListener("click", openMenu, { signal });
  [closeButton, ...navLinks].forEach((el) => {
    el.addEventListener("click", closeMenu, { signal });
  });

  // If mobile menu then should be in body to be on the overlay
  const placeNav = () => {
    if (
      window.innerWidth < 1024 &&
      navElement.parentElement !== document.body
    ) {
      document.body.appendChild(navElement);
    }

    if (window.innerWidth > 1024 && !instance.contains(navElement)) {
      const defaultParent = instance.querySelector("header.header");
      const userBarElement = document.querySelector("div.user-bar");
      defaultParent.insertBefore(navElement, userBarElement);
    }
  };
  window.addEventListener("resize", placeNav, { signal });
  placeNav();

  return () => {
    abort();
    navElement.remove();
  };
};
