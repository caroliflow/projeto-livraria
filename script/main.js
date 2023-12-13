import Store from "./classes/store.js";
import Product from "./classes/product.js";

const store = new Store();
const render = document.getElementById("render");
const test = document.getElementById("test");
const download = document.getElementById("download");

const drop_area = document.getElementById("drop-area");
const file_input = document.getElementById("file-input");

let store_data;

file_input.addEventListener("change", (event) => {
  event.stopPropagation();
  event.preventDefault();

  const file = event.target.files;
  readJSON(file);
});

drop_area.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});

drop_area.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();

  const file = event.dataTransfer.files;
  readJSON(file);
});

function readJSON(file) {
  const json = file[0];

  if (json.type && !json.type.endsWith("/json")) {
    console.log("not json file");
    return undefined;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const content = event.target.result;
    store_data = JSON.parse(content);
  };

  reader.readAsText(json);
}

download.addEventListener("click", () => {
  const data = {
    users: [],
    products: [],
  };

  store_data.users.forEach((user) => {
    data["users"].push(user);
  });

  let id = 0;
  for (let key in store.allItems) {
    store.allItems[key].forEach((item) => {
      id++;
      item.id = id;
      data["products"].push(item);
    });
  }

  const anchor = document.createElement("a");
  anchor.href = "data:text/json;charset=utf-8;lang=pt-BR," + JSON.stringify(data);
  anchor.download = "dados.json";
  anchor.click();
  console.log(anchor.href);
});

render.addEventListener("click", (event) => {
  let products = store_data.products;

  products.forEach((product) => {
    const item = new Product(
      product.id,
      product.name,
      product.price,
      product.description,
      product.type,
      product.stock,
      product.img
    );
    store.addItem(item);
  });

  event.target.remove();

  store.placeItems(test);
});

function searchItem(element) {
  const item_id = Number(element.target.parentNode.id.split("-")[1]);
  const item_type = element.target.parentNode.lastElementChild.textContent;
  let remove;

  store.allItems[item_type].forEach((item) => {
    if (item.ID === item_id) {
      remove = item;
    }
  });

  return remove;
}

test.addEventListener("click", (event) => {
  let button = event.target.className;
  
  if (button === "remove-btn") {
    let item = searchItem(event);

    store.removeItem(item);
    event.target.parentNode.remove();

    console.log(store.allItems);

  } else if (button === "sell-btn") {
    let item = searchItem(event);
  
    if (item.STOCK > 0) {
      item.removeStocks(1);
    } else {
      console.log("out of stock");
    }

    store.placeItems(test);
  }
})