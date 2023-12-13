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
      <p id="item-${item.ID}">
        Nome: ${item.NAME} </br>
        Price: ${item.PRICE} </br>
        Description: ${item.DESCRIPTION} </br>
        Stock: ${item.STOCK} </br>
        <img src="${item.IMAGE}"/> </br>
        <button class="remove-btn" type="button">Remove</button> </br>
        <button class="sell-btn" type="button">Sell Item</button>
        <button class="edit-btn" type="button">Edit</button>
        <span>${item.TYPE}</span> 
      </p>
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
