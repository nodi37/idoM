import { initComponentEvents } from "./helpers/init-component-events.js";
import { rerenderCurrentValue } from "./helpers/render-current-value.js";
import { createCustomSelectTemplate } from "./template.js";
import { styleLoader } from "@style-loader";

/**
 * To use this component listen to event "update-option" on this component
 * Update attribute current-value on this component
 * Check example
 *
 * @example
 * <div id="module">
 *  <custom-select-component id="custom" options=[1,2] current-value='1'></custom-select-component>
 * </div>
 * //...
 * const selector = module.querySelector("#custom")
 * selector.addEventListener('current-value', ()=>{
 *    const value = e.detail.value;
 *    selector.setAttribute("current-value", value); // This will update the main value visible on screen
 *    doSomethingWithValue(value)
 * })
 */
class CustomSelect extends HTMLElement {
  constructor() {
    super();
    this.isInitialized = false;
    this.cleanupFunction = () => {};
  }

  // Attributes
  static get observedAttributes() {
    return ["options", "current-value"];
  }

  get options() {
    const attribute = this.getAttribute("options");
    if (!attribute) return [];
    return JSON.parse(attribute);
  }

  get currentValue() {
    return this.getAttribute("current-value");
  }

  // Attribute change handlers
  attributeChangedCallback(name, _, newValue) {
    if (!this.isInitialized) return;
    if (name === "current-value") {
      rerenderCurrentValue(this, newValue);
    }
  }

  connectedCallback() {
    // Style
    styleLoader.load("/components/custom-select/styles.css");

    // Rendering element
    this.innerHTML = createCustomSelectTemplate(
      this.options,
      this.currentValue,
      this.eventName
    );

    // Init events
    this.cleanupFunction = initComponentEvents(this);

    // Mark as initialized
    this.isInitialized = true;
  }

  disconnectedCallback() {
    this.cleanupFunction();
  }
}

customElements.define("custom-select-component", CustomSelect);
