export const triggerPopup = (node) => {
  document.dispatchEvent(
    new CustomEvent("open-popup", {
      detail: {
        node,
      },
    })
  );
};
