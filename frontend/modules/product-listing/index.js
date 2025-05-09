import { triggerPopup } from "../../utils/trigger-popup.js";
import { createProductPopupTemplate } from "./components/product-popup/template.js";
import { initComponentEvents } from "./helpers/init-component-events.js";
import { fetchProducts } from "./helpers/product-fetch.js";
import {
  createCardTemplate,
  createProductListingTemplate,
} from "./template.js";
import { styleLoader } from "@style-loader";

class ProductListingSection extends HTMLElement {
  constructor() {
    super();
    this.cleanupFunction = () => {};
    this.productsCount = 10;
    this.cardClickHandlers = new Map();
  }

  showCardPopup(cardData) {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = createProductPopupTemplate(cardData);
    triggerPopup(templateEl.content.firstElementChild);
  }

  async updateCards() {
    const cardsData = fetchProducts(this.productsCount); // await with other props

    // Create new cards
    const cardElements = cardsData.map((cardData) => {
      const templateElement = document.createElement("template");
      const markup = createCardTemplate(cardData);
      templateElement.innerHTML = markup;
      const targetElement = templateElement.content.firstElementChild;

      const clickHandler = (() => this.showCardPopup(cardData)).bind(this);
      targetElement.addEventListener("click", clickHandler);

      this.cardClickHandlers.set(targetElement, clickHandler);

      return targetElement;
    });

    const gridElement = this.querySelector("#products-grid");

    // Remove old
    gridElement.querySelectorAll("[data-card-id]").forEach((node) => {
      const handler = this.cardClickHandlers.get(node);
      if (handler) {
        node.removeEventListener("click", handler);
        this.cardClickHandlers.delete(node);
      }
      node.remove();
    });

    cardElements.forEach((el) => {
      gridElement.appendChild(el);
    });
  }

  connectedCallback() {
    styleLoader.load("/modules/product-listing/styles.css");
    styleLoader.load(
      "/modules/product-listing/components/product-popup/styles.css"
    );
    this.innerHTML = createProductListingTemplate(this.productsCount);
    this.updateCards();
    this.cleanupFunction = initComponentEvents(this);
  }

  disconnectedCallback() {
    this.cleanupFunction();
  }
}

customElements.define("product-listing", ProductListingSection);
