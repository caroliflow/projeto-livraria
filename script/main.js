import { product_types } from "./constants.js";

let store_data;

const file_container = document.getElementById("f-c");
const drop_area = document.getElementById("drop-area");
const file_input = document.getElementById("file-input");

class Store {
  constructor() {
    this._products = {
      BOOK: [],
      CLOTHING: [],
      COLLECTIBLE: [],
      GAME: [],
      SUPPLY: [],
    };
    this._sells = new Array();
  }

  addItem(item) {
    if (item.type in this._products) {
      this._products[item.type].push(item);
    } else {
      console.log("unrecognized type");
    }
  }
 
  removeItem(item) {
    let remove = this._products[item.type].indexOf(item);

    if (remove > -1) {
      this._products[item.type].splice(remove, 1);
    } else {
      console.log("item not found");
    }
  }

  placeItems(element, filter=[]) {
    //element.innerHTML = "";

    Object.values(this._products).forEach((type) => {
      type.forEach((item) => {
        let itemModel = `
          <p id="item-${item.id}">
            Nome: ${item.name} </br>
            Price: ${item.price} </br>
            Description: ${item.description} </br>
            Img: ${item.image} </br>
            <button class="remove-btn" type="button">Remove</button>
            <span>${item.type}</span> 
          </p>
        `;

        element.innerHTML += itemModel;
      });
    });
  }

  get allItems() {
    return this._products;
  }
}

class Product {
  constructor(id, name, price, description, type, img) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._description = description;
    this._type = type;
    this._image = img;
  }
  editDescription(text) {
    this.description = text;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get price() {
    return this._price;
  }
  get description() {
    return this._description;
  }
  get type() {
    return this._type;
  }
  get image() {
    return this._image;
  }
}

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
    //file_container += "<p>Por favor, selecione um arquivo do tipo JSON</p>";
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

const store = new Store();
const render = document.getElementById("render");
const test = document.getElementById("test");

render.addEventListener("click", function() {
  let products = store_data.products;
  
  products.forEach((product) => {
    const item = new Product(
      product.id,
      product.name, 
      product.price, 
      product.description, 
      product.type, 
      product.img
    );
    store.addItem(item);
  });

  store.placeItems(test);

  const remove_buttons = document.querySelectorAll(".remove-btn");

  remove_buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const item_id = Number(event.target.parentNode.id.split("-")[1]);
      const item_type = event.target.parentNode.lastElementChild.textContent;
      let remove;

      store.allItems[item_type].forEach((item) => {
        if (item.id === item_id) {
          remove = item;
        }
      });

      store.removeItem(remove);
      event.target.parentNode.remove();
    }) 
  });
});


