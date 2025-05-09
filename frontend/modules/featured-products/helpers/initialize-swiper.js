export const initializeSwiper = () => {
  return new Swiper(".featured-products__swiper", {
    direction: "horizontal",
    slidesPerView: 1.15,
    spaceBetween: 20,
    loop: true,

    pagination: {
      el: ".featured-products__swiper-pagination",
    },

    navigation: {
      nextEl: ".featured-products__swiper-next-page-btn",
    },

    scrollbar: {
      el: ".featured-products__swiper-scrollbar",
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
};
