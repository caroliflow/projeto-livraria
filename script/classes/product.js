export default class Product {
  constructor(id, name, price, description, type, stock, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.type = type;
    this.stock = stock;
    this.image = img;

    this.model = `
      <div class="img-container">
        <img src="${this.image}"/>
      </div>
      <div class="text-container">
        <p class="name">${this.name}</p>
        <p class="price">R$${this.price}</p>
        <p class="type"><u>${this.type}</u></p>
        <p class="description">${this.description}</p>
      </div>
      <div class="btn-container"></div>
    `;

    this.container = document.createElement("div");
    this.container.classList.add("card-model");
    this.container.setAttribute("id", `item-${this.id}`);
  }

  updateContainer() {
    this.container.innerHTML = "";
  }

  appendModel(element) {
    this.model += element;
  }

  editName(name) {
    this.name = name;
  }

  editPrice(price) {
    this.description = price;
  }

  editDescription(text) {
    this.description = text;
  }

  editType(type) {
    this.type = type;
  }

  removeStocks(amount) {
    this.stock -= amount;
  }

  changeImage(image) {
    this.image = image;
  }

  get ID() {
    return this.id;
  }
  get NAME() {
    return this.name;
  }
  get PRICE() {
    return this.price;
  }
  get DESCRIPTION() {
    return this.description;
  }
  get TYPE() {
    return this.type;
  }
  get STOCK() {
    return this.stock;
  }
  get IMAGE() {
    return this.image;
  }
  get MODEL() {
    return this.model;
  }
  get CONTAINER() {
    return this.container;
  }
}
