import { createLogoTemplate } from "./components/logo/template.js";
import { createNavTemplate } from "./components/nav/template.js";
import { createUserBarTemplate } from "./components/user-bar/template.js";

export const createHeaderTemplate = () => `
    <div class="header-fixed-wrapper">
      <header class="header container">
        
        ${createLogoTemplate()}
        ${createNavTemplate()}
        ${createUserBarTemplate()}

        <button id="open-menu-btn" class="header__mobile-nav-trigger">
          <img role="presentation" src="/assets/icons/burger.svg" /> Menu
        </button>

      </header>
    </div>`;
