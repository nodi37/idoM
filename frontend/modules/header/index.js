import { initComponentEvents } from "./helpers/init-component-events.js";
import { loadStyles } from "./helpers/load-styles.js";
import { createHeaderTemplate } from "./template.js";

class Header extends HTMLElement {
  constructor() {
    super();
    this.cleanupFunction = () => {};
  }

  connectedCallback() {
    // Styles
    loadStyles();

    // Template
    this.innerHTML = createHeaderTemplate();

    // Init controls
    this.cleanupFunction = initComponentEvents(this);
  }

  disconnectedCallback() {
    this.cleanupFunction();
  }
}

customElements.define("header-component", Header);
