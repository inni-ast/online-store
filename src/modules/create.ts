import { ErrorCreate } from "./const";
export function create(
  el: string,
  classNames: string,
  child: HTMLElement,
  parent: HTMLElement
) {
  const element = document.createElement(el);
  if (!element) throw new Error(ErrorCreate);
  if (classNames) {
    element.classList.add(...classNames.split(" "));
  }
  if (child && Array.isArray(child)) {
    child.forEach(
      (childElement) => childElement && element.appendChild(childElement)
    );
  } else if (child && typeof child === "object") {
    element.appendChild(child);
  } else if (child && typeof child === "string") {
    element.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(element);
  }
  return element;
}
