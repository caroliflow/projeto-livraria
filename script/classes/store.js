import { product_types } from "../constants.js";
export default class Store {
  constructor() {
    this._products = product_types; // An object with all the types with arrays inside them
    this._sells = new Array();
  }

  addItem(item) {
    if (item.TYPE in this._products) {
      this._products[item.TYPE].push(item);
    } else {
      console.log("unrecognized type");
    }
  }

  removeItem(item) {
    let remove = this._products[item.TYPE].indexOf(item);

    if (remove > -1) {
      this._products[item.TYPE].splice(remove, 1);
    } else {
      console.log("item not found");
    }
  }

  placeItems(element, filter = []) {
    element.innerHTML = "";

    Object.values(this._products).forEach((type) => {
      type.forEach((item) => {
        let itemModel = `
          <p id="item-${item.ID}">
            Nome: ${item.NAME} </br>
            Price: ${item.PRICE} </br>
            Description: ${item.DESCRIPTION} </br>
            Stock: ${item.STOCK} </br>
            <img src="${item.IMAGE}"/> </br>
            <button class="remove-btn" type="button">Remove</button> </br>
            <button class="sell-btn" type="button">Sell Item</button>
            <span>${item.TYPE}</span> 
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
