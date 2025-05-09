export const rerenderCurrentValue = (instance, value) => {
  const element = instance.querySelector("[data-current-value]");
  element.innerText = value;
};
