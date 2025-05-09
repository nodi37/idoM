export const toggleOverlay = (onClick) => {
  document.dispatchEvent(
    new CustomEvent("toggle-overlay", {
      detail: {
        onClick,
      },
    })
  );
};
