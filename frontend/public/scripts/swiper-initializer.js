const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1.15,
  spaceBetween: 20,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-next-page-btn",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },

    1152: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});
