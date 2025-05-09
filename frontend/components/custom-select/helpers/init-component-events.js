export const initComponentEvents = (instance) => {
  const controller = new AbortController();
  const { signal } = controller;

  // Component elements
  const trigger = instance.querySelector(".trigger");
  const clickableOptions = instance.querySelectorAll(".option"); // This could be probably optimized
  const dataList = instance.querySelector(".data-list");

  // Handlers
  const handleMenuOpen = () => {
    if (dataList.classList.contains("opened")) {
      dataList.classList.remove("opened");
    } else {
      dataList.classList.add("opened");
    }
  };

  const handleOptionClick = (e) => {
    handleMenuOpen();
    const value = e.currentTarget.dataset.value;
    const updateOptionEvent = new CustomEvent("update-option", {
      detail: { value },
    });
    instance.dispatchEvent(updateOptionEvent);
  };

  // Assigning event listeners
  trigger.addEventListener("click", handleMenuOpen, { signal });

  clickableOptions.forEach((clickable) => {
    clickable.addEventListener("click", handleOptionClick, { signal });
  });

  return () => {
    controller.abort();
  };
};
