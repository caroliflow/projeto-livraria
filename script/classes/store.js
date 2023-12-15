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
    item.CONTAINER.innerHTML = item.MODEL;
    if (element != item.CONTAINER) {
      element.append(item.CONTAINER);
    }
  }

  addSell(item, seller, element) {
    let sell = {
      name: item.NAME,
      price: item.PRICE,
      seller: seller["NAME"],
    };
    this._sells.push(sell);

    console.log(sell["seller"]);
    let model = `
      <div class="sell">
        <p>vendedor: ${sell["seller"]}</p>
        <p>item: ${sell["name"]}</p>
        <p>valor: ${sell["seller"]}</p>
      </div>
    `;

    element.innerHTML += model;
  }

  get allItems() {
    return this._products;
  }
}
