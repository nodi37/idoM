import { fakeData } from "./_data.js";
import { initializeSwiper } from "./helpers/initialize-swiper.js";
import { createFeaturedProductsTemplate } from "./template.js";
import { styleLoader } from "@style-loader";

class FeaturedProductsSection extends HTMLElement {
  constructor() {
    super();
    this.swiperInstance = null;
  }

  connectedCallback() {
    // Styles
    styleLoader.load("/modules/featured-products/styles.css");
    styleLoader.load(
      "/modules/featured-products/components/featured-card/styles.css"
    );

    // Load data here
    // If this data is going to change, this logic needs an update
    const cards = fakeData;

    // Render template
    this.innerHTML = createFeaturedProductsTemplate(cards);

    // Init swiper
    this.swiperInstance = initializeSwiper();
  }

  disconnectedCallback() {
    if (!this.swiperInstance) return;
    this.swiperInstance.destroy(true, true);
  }
}

customElements.define("featured-products", FeaturedProductsSection);
