export const initComponentEvents = (instance) => {
  const abortController = new AbortController();
  const { signal } = abortController;

  const countSelectorElement = instance.querySelector(
    "#products-per-page-selector"
  );

  countSelectorElement.addEventListener(
    "update-option",
    (e) => {
      instance.productsCount = e.detail.value;
      countSelectorElement.setAttribute("current-value", e.detail.value);
      instance.updateCards();
    },
    { signal }
  );

  // Page change etc...

  return () => {
    abortController.abort();
  };
};
