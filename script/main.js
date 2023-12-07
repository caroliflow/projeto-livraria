var store_data;

const file_container = document.getElementById("f-c");
const drop_area = document.getElementById("drop-area");
const file_input = document.getElementById("file-input");

class Store {
  constructor() {
    this._products = [];
    this.sells = [];
  }

  addProduct(product, element) {
    this._products.push(product);

    let itemModel = `
      <p>Nome: ${product.name}</p>
      <p>Price: ${product.price}</p>
      <p>Description: ${product.description}</p>
      <p>Type: ${product.type}</p>
      <p>Img: ${product.image}</p>
    `;

    element.innerHTML += itemModel;
  }

  get allProducts() {
    return this._products;
  }
}

class Product {
  constructor(name, price, description, type, img) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.type = type;
    this.image = img;
  }
  editDescription(text) {
    this.description = text;
  }
  get name() {
    return this.name;
  }
  get price() {
    return this.price;
  }
  get description() {
    return this.description;
  }
  get type() {
    return this.type;
  }
  get image() {
    return this.image;
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

function renderItems() {
  if (store_data) {
    let products = store_data.usuarios;

    products.forEach((item) => {
      
    });
  } else {
    console.log("no information");
  }
}
