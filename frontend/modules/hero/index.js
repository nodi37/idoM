import { createHeroTemplate } from "./template.js";
import { styleLoader } from "@style-loader";

class HeroSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    // Styles
    styleLoader.load("/modules/hero/styles.css");

    // Template
    this.innerHTML = createHeroTemplate();
  }
}

customElements.define("hero-component", HeroSection);
