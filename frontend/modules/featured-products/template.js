import { createCardTemplate } from "./components/featured-card/template.js";

export const createFeaturedProductsTemplate = (cards) => `
<section id="featured" class="featured-products container">
  <span class="featured-products__eyebrow">FEATURED PRODUCTS</span>
  <h2 class="featured-products__title">Browse Featured</h2>
  <div class="featured-products__swiper swiper">
    <div class="featured-products__swiper-wrapper swiper-wrapper">
      ${cards.map((cardData) => createCardTemplate(cardData)).join("")}
    </div>

    <div class="featured-products__swiper-next-page-btn">
      <img aria-label="Next page" src="/assets/icons/arrow-right.svg" />
    </div>

    <div class="featured-products__swiper-scrollbar swiper-scrollbar"></div>
  </div>
</section>`;
