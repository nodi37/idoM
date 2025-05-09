import { styleLoader } from "@style-loader";
import { createPopupTemplate } from "./template.js";

class Popup extends HTMLElement {
  constructor() {
    super();
    this.cleanupController = new AbortController();
  }

  get contentParent() {
    return this.querySelector("div.popup__content");
  }

  get closeButton() {
    return this.querySelector(".popup__close-button");
  }

  openPopup() {
    this.firstElementChild.classList.add("popup--on-top");
    this.firstElementChild.classList.add("popup--opened");
  }

  closePopup() {
    this.firstElementChild.classList.remove("popup--opened");
    setTimeout(() => {
      this.firstElementChild.classList.remove("popup--on-top");
      this.contentParent.innerHTML = "";
    }, 250);
  }

  handleTriggerPopup(content) {
    if (!content) return; // TODO: Improve this here
    this.contentParent.appendChild(content);
    this.openPopup();
  }

  async connectedCallback() {
    await styleLoader.load("/components/popup/styles.css");
    this.innerHTML = createPopupTemplate();

    // Cleanup signal
    const { signal } = this.cleanupController;

    // Close button event
    this.closeButton.addEventListener("click", this.closePopup.bind(this), {
      signal,
    });

    // TODO: Add on overlay close if needed

    // Popup trigger event
    document.addEventListener(
      "open-popup",
      ((e) => {
        this.handleTriggerPopup(e?.detail?.node);
      }).bind(this),
      { signal }
    );
  }

  disconnectedCallback() {
    this.cleanupController();
  }
}

customElements.define("popup-component", Popup);
