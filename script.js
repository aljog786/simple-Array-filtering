const products = ["Cargos", "Shirt", "Hoodie", "Jeans"];
const colors = ["Black", "Grey", "Brown", "Blue"];
const sizes = ["S", "M", "L", "XL", "XXL"];

const productCheckboxList = document.getElementById("forProducts");
const colorCheckboxList = document.getElementById("forColors");
const sizeCheckboxList = document.getElementById("forSizes");

function createCheckboxList(list, array) {
  array.forEach((item) => {
    const checkboxItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = item;
    checkbox.value = item;
    const label = document.createElement("label");
    label.htmlFor = item;
    label.textContent = item;
    checkboxItem.appendChild(checkbox);
    checkboxItem.appendChild(label);
    list.appendChild(checkboxItem);
  });
}

createCheckboxList(productCheckboxList, products);
createCheckboxList(colorCheckboxList, colors);
createCheckboxList(sizeCheckboxList, sizes);

let productsArray = [];

productsArray = products.flatMap((product) =>
  colors.flatMap((color) => sizes.map((size) => ({ product, color, size })))
);

console.log(productsArray);

const applyButton = document.getElementById("apply");

const allProductsTable = document.querySelector(".tableForAllProducts tbody");
const selectedProductsTable = document.querySelector(".tableForSelected tbody");

renderProductsTable(productsArray, allProductsTable);

applyButton.addEventListener("click", () => {
  const selectedProducts = getSelectedCheckboxes(productCheckboxList);
  const selectedColors = getSelectedCheckboxes(colorCheckboxList);
  const selectedSizes = getSelectedCheckboxes(sizeCheckboxList);

  const filters = [
    { key: "product", values: selectedProducts },
    { key: "color", values: selectedColors },
    { key: "size", values: selectedSizes } 
  ];

  const filteredArray = filterProductsArray(productsArray, filters);

  console.log(filteredArray);

  renderProductsTable(filteredArray, selectedProductsTable);
});

function getSelectedCheckboxes(checkboxList) {
  const selectedCheckboxes = Array.from(
    checkboxList.querySelectorAll("input[type=checkbox]:checked")
  );

  return selectedCheckboxes.map((checkbox) => checkbox.value);
}

function filterProductsArray(productsArray, filters) {
  return productsArray.filter((product) => {
    return filters.every((filter) => {
      const { key, values } = filter;
      return values.length === 0 || values.includes(product[key]);
    });
  });
}

function renderProductsTable(products, table) {
  table.innerHTML = "";

  products.forEach((product) => {
    const row = table.insertRow();
    row.insertCell().appendChild(document.createTextNode(product.product));
    row.insertCell().appendChild(document.createTextNode(product.color));
    row.insertCell().appendChild(document.createTextNode(product.size));
  });
}
const clearButton = document.getElementById("reset");

const checkboxes = document.querySelectorAll("input[type=checkbox]");
const table = document.querySelector(".tableForSelected tbody");
clearButton.addEventListener("click", () => {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  table.innerHTML = "";
});
