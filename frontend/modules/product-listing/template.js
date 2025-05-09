export const createCardTemplate = ({ id, alt, src, width, height }) => `
      <button data-card-id="${id}" class="product-listing__card">
        <img
          alt="${alt}"
          src="${src}"
          width="${width}"
          height="${height}"
        />
      </button>`;

export const createProductListingTemplate = (initialCount) => `
  <section id="listing" class="product-listing container">
    <div class="product-listing__count-wrapper">
      <span>Number of products per page:</span>
      <custom-select-component 
        id="products-per-page-selector" 
        options="[10,14,28]" 
        current-value="${initialCount}">
      </custom-select-component>
    </div>
    <div id='products-grid' class="product-listing__grid">
      <small-cta-component class="product-listing__cta" ></small-cta-component>
    </div>
  </section>`;
