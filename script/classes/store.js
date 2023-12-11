export default class Store {
  constructor() {
    this._products = {
      BOOK: [],
      CLOTHING: [],
      COLLECTIBLE: [],
      GAME: [],
      SUPPLY: [],
      MOVIE: [],
      GIFTCARD: [],
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

  placeItems(element, filter = []) {
    //element.innerHTML = "";

    Object.values(this._products).forEach((type) => {
      type.forEach((item) => {
        let itemModel = `
          <p id="item-${item.id}">
            Nome: ${item.name} </br>
            Price: ${item.price} </br>
            Description: ${item.description} </br>
            <img src="${item.image}"/> </br>
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
