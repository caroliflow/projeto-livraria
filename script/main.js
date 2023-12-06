var store_data;

const file_container = document.getElementById("f-c");
const drop_area = document.getElementById("drop-area");
const file_input = document.getElementById("file-input");

class Product {
  constructor(name, price, description, type, img) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.type = type;
    this.image = img;
  }
  edit_description(text) {
    this.description = text;
  }
  get_name() {
    return this.name;
  }
  get_price() {
    return this.price;
  }
  get_description() {
    return this.description;
  }
  get_type() {
    return this.type;
  }
  get_image() {
    return this.image;
  }
}

file_input.addEventListener("change", (event) => {
  event.stopPropagation();
  event.preventDefault();

  const file = event.target.files;
  read_JSON(file);
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
  read_JSON(file);
});

function read_JSON(file) {
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
    getInformation(store_data);
  };

  reader.readAsText(json);
}
