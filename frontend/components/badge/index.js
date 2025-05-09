import { styleLoader } from "@style-loader";

class Badge extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["text", "type"];
  }

  connectedCallback() {
    styleLoader.load("/components/badge/styles.css");
    const text = this.getAttribute("text") || "badge";
    const type = this.getAttribute("type") || "primary";
    this.innerHTML = `
            <div class="badge badge--${type}">
                ${text}
            </div>
        `;
  }
}

customElements.define("badge-component", Badge);
