export default class Product {
  constructor(id, name, price, description, type, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.type = type;
    this.image = img;
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
  get IMAGE() {
    return this.image;
  }
}
