import { styleLoader } from "@style-loader";

/**
 * To use this place this in the body
 * Dispatch custom event 'toggle-overlay' on document
 * You can pass onClickHandler
 */
class Overlay extends HTMLElement {
  constructor() {
    super();
    this.abortController = new AbortController();
    this.overlayClickHandler = null;
  }

  toggleOverlay(onClickAction) {
    const openedClass = "overlay--opened";
    const element = this.firstElementChild;

    if (element.classList.contains(openedClass)) {
      element.classList.remove(openedClass);
    } else {
      element.classList.add(openedClass);
    }

    if (this.overlayClickHandler) {
      element.removeEventListener("click", this.overlayClickHandler);
      this.overlayClickHandler = null;
    }

    // On Click action will be triggered only once
    // That's okay for now
    // But later we could add {onClick:()=>void, once: bool}
    // Or some other solution
    if (onClickAction) {
      this.overlayClickHandler = this.overlayClickHandler = () => {
        onClickAction();
        element.removeEventListener("click", this.overlayClickHandler);
        this.overlayClickHandler = null;
      };

      element.addEventListener("click", this.overlayClickHandler);
    }
  }

  async connectedCallback() {
    await styleLoader.load("/components/overlay/styles.css");
    this.innerHTML = `<div class="overlay">&nbsp;</div>`;

    // Init actions
    const { signal } = this.abortController;
    document.addEventListener(
      "toggle-overlay",
      ((e) => {
        this.toggleOverlay(e.detail?.onClick);
      }).bind(this),
      { signal }
    );
  }

  disconnectedCallback() {
    this.abortController.abort();
  }
}

customElements.define("overlay-component", Overlay);
