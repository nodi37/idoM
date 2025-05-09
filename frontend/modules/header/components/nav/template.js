export const createNavTemplate = () => `
        <div class="nav">
          <div class="nav__mobile-menu-controls">
            <img role="presentation" alt="logo" src="/assets/icons/logo-light.svg" />
            <button id="close-menu-btn" class="nav__close-button">
              <img role="presentation" src="/assets/icons/close.svg" /> close
            </button>
          </div>

          <nav>
            <ul class="nav__links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#featured">Featured products</a>
              </li>
              <li>
                <a href="#listing">Product listing</a>
              </li>
            </ul>
          </nav>
        </div>
`;
