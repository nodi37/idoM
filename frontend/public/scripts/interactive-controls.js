const initBurgerMenuControl = () => {
  const openButton = document.getElementById("open-menu-btn");
  const closeButton = document.getElementById("close-menu-btn");
  const menuElement = document.getElementById("header-nav");
  const overlay = document.getElementById("nav-overlay");
  const otherClosingButtons = document.querySelectorAll("#header-nav a");

  const openMenu = () => {
    menuElement.classList.add("opened");
    overlay.classList.add("opened");
  };

  const closeMenu = () => {
    menuElement.classList.remove("opened");
    overlay.classList.remove("opened");
  };

  openButton.addEventListener("click", openMenu);
  [closeButton, overlay, ...otherClosingButtons].forEach((el) => {
    el.addEventListener("click", closeMenu);
  });
};

const initCustomSelectControl = () => {
  const closingButtons = document.querySelectorAll(
    "#custom-select-data-list button"
  );
  const openingButton = document.getElementById("custom-select-trigger");
  const switchableElement = document.getElementById("custom-select-data-list");

  const open = () => {
    switchableElement.classList.add("opened");
  };

  const close = () => {
    switchableElement.classList.remove("opened");
  };

  openingButton.addEventListener("click", open);
  closingButtons.forEach((btn) => {
    btn.addEventListener("click", close);
  });
};

const initTooltipTrigger = () => {
  const cards = document.querySelectorAll(".card[data-card-id]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardWithOpenedTooltip = document.querySelector(
        ".card.opened[data-card-id]"
      );

      if (card.classList.contains("opened")) {
        card.classList.remove("opened");
      } else {
        card.classList.add("opened");
      }

      if (cardWithOpenedTooltip) {
        cardWithOpenedTooltip.classList.remove("opened");
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenuControl();
  initCustomSelectControl();
  initTooltipTrigger();
});
