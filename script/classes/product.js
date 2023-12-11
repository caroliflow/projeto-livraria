export default class Product {
  constructor(id, name, price, description, type, img) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._description = description;
    this._type = type;
    this._image = img;
  }

  editName(name) {
    this._name = name;
  }

  editPrice(price) {
    this._description = price;
  }

  editDescription(text) {
    this._description = text;
  }

  editType(type) {
    this._type = type;
  }

  editImage(image) {
    this._image = image;
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
