export const createProductPopupTemplate = ({
  src,
  alt,
  height,
  width,
  text,
}) => `
      <div class="product-popup">
        <span class="product-popup__text">${text}</span>
        <img
          class="product-popup__image"
          alt="${alt}"
          src="${src}"
          width="${width}"
          height="${height}"
        />
      </div>
`;
