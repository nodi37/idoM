export const createCardTemplate = ({
  badge,
  badgeType,
  image,
  name,
  price,
}) => `
<div class="swiper-slide">
  <div class="featured-card">
    <div class="featured-card__image-wrapper">
      ${
        badge
          ? `<badge-component class="featured-card__badge" type="${badgeType}" text="${badge}"></badge-component>`
          : ""
      }
      <button class="featured-card__button" aria-label="Add to favorites">
        <img role="presentation" src="/assets/icons/fav-dark.svg" />
        <img role="presentation" src="/assets/icons/fav-light.svg" />
      </button>
      <img
        class="featured-card__product-image"
        width="380"
        height="380"
        alt="${name}"
        src="${image}"
      />
    </div>
    <div class="featured-card__info-wrapper">
      <p class="featured-card__product-name">${name}</p>
      <p class="featured-card__product-price">${price}</p>
    </div>
  </div>
</div>`;
