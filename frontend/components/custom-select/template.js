const buildOptions = (options) =>
  options
    .map((option, index) => {
      if (!index) {
        return `
      <button data-value="${option}" class="custom-select__option option">
        <span>${option}</span>
        <img
          style="transform: rotate(180deg)"
          role="presentation"
          src="/assets/icons/chev-down.svg"
        />
      </button>`;
      } else {
        return `<button data-value="${option}" class="custom-select__option option">${option}</button>`;
      }
    })
    .join("");

export const createCustomSelectTemplate = (options, currentValue) => `
      <div class="custom-select">
        <button class="custom-select__trigger trigger">
            <span data-current-value="${currentValue}" >
              ${currentValue}
            </span>
          <img role="presentation" src="/assets/icons/chev-down.svg" />
        </button>

        <div class="custom-select__data-list data-list">
          ${buildOptions(options)}
        </div>
      </div>`;
