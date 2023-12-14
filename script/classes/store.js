import { product_types } from "../constants.js";

export default class Store {
  constructor() {
    this._products = product_types; // An object containing all the types with arrays inside them
    this._sells = new Array();
  }

  addItem(item) {
    if (item.TYPE in this._products) {
      this._products[item.TYPE].push(item);
    } else {
      console.log("unrecognized type");
    }
  }

  updateItem(item) {
    item.updateContainer();
    this.placeItem(item, item.CONTAINER);
  }

  removeItem(item) {
    let remove = this._products[item.TYPE].indexOf(item);

    if (remove > -1) {
      this._products[item.TYPE].splice(remove, 1);
    } else {
      console.log("item not found");
    }
  }

  placeItem(item, element) {
    let itemModel = `
      <div class="img-container">
        <img src="${item.IMAGE}"/>
      </div>
      <div class="text-container">
        <p class="name">${item.NAME}</p>
        <p class="price">R$${item.PRICE}</p>
        <p class="type"><u>${item.TYPE}</u></p>
        <p class="description">${item.DESCRIPTION}</p>
      </div>
      <div class="btn-container">
        <button class="sell-btn" type="button">BUY</button>
        <button class="remove-btn" type="button">DELETE</button>
        <button class="edit-btn" type="button">EDIT</button>
        <button class="apply-btn hide" type="button">APPLY</button>
        <button class="cancel-btn hide" type="button">CANCEL</button>
      </div>
      <span class="hide">${item.TYPE}</span>
    `;

    item.CONTAINER.innerHTML = itemModel;
    if (element != item.CONTAINER) {
      element.append(item.CONTAINER);
    }
  }

  get allItems() {
    return this._products;
  }
}
