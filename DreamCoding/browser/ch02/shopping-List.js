"use strict";
const items = document.querySelector("#items");
const btn_add = document.querySelector(".add");
const list_input = document.querySelector("#listInput");
const img_delete = "<i class='fas fa-trash-alt'></i>";

function createElementWithAttr(tagName, attrNames, attrs) {
  const element = document.createElement(tagName);

  if (!Array.isArray(attrNames)) {
    element.setAttribute(attrNames, attrs);
  } else {
    attrNames.forEach((attrName, i) => element.setAttribute(attrName, attrs[i]));
  }

  return element;
}

function createItem(text) {
  const item = createElementWithAttr("li", "class", "item");
  const span = createElementWithAttr("span", "class", "list-text");
  span.textContent = text;
  const btn_del = createElementWithAttr("button", ["type", "class"], ["button", "delete"]);
  btn_del.innerHTML = img_delete;
  btn_del.addEventListener("click", () => item.remove());

  item.appendChild(span);
  item.appendChild(btn_del);

  return item;
}

function onAdd(e) {
  const text = list_input.value;
  if (e.type === "keyup" && e.key !== "Enter") return;
  if (!text) {
    list_input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });

  list_input.value = "";
  list_input.focus();
}

btn_add.addEventListener("click", onAdd);
list_input.addEventListener("keyup", onAdd);
