import { createSmallCtaTemplate } from "./template.js";
import { styleLoader } from "@style-loader";

class SmallCta extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    styleLoader.load("/components/small-cta/styles.css");
    this.innerHTML = createSmallCtaTemplate();
  }
}

customElements.define("small-cta-component", SmallCta);
