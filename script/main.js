import Store from "./classes/store.js";
import Product from "./classes/product.js";

import has_permission from "./permissions.js";
import { actions } from "./constants.js";

const store = new Store();
const items_section = document.getElementById("items");
const download = document.getElementById("download");

const modal_container = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const open_modal_btn = document.querySelector(".login");
const close_modal_btn = document.querySelector(".btn-close");
const login_form = document.getElementById("login");
const logout_btn = document.getElementById("exit");

let logged = false;
const loggedUser = {
  EMAIL: "",
  PASSWORD: "",
  TYPE: "GUEST",
};

const drop_area = document.getElementById("drop-area");
const file_input = document.getElementById("file-input");

let store_data;

const logout = function () {
  for (let key in loggedUser) {
    loggedUser[key] = "";
  }
  logged = false;

  const cards = document.querySelectorAll(".card-model");
  cards.forEach((card) => {
    let item = searchItem(card);
    removeButtons(item);
    store.updateItem(item);
  });

  logout_btn.classList.toggle("hidden");
  download.classList.toggle("hidden");
  open_modal_btn.classList.toggle("hidden");
};

const open_modal = function () {
  modal_container.classList.remove("hidden");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const close_modal = function () {
  modal_container.classList.add("hidden");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

/*
  THIS SECTION CONTAINS CODE FOR LOADING AND DOWNLOADING JSON FILES
*/

file_input.addEventListener("change", (event) => {
  event.stopPropagation();
  event.preventDefault();

  event.target.parentNode.parentNode.classList.toggle("show-file");

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
    console.log("not json file");
    return undefined;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const content = event.target.result;
    store_data = JSON.parse(content);
    render();
  };

  reader.readAsText(json);
}

download.addEventListener("click", () => {
  const data = {
    users: [],
    products: [],
  };

  store_data.users.forEach((user) => {
    data["users"].push(user);
  });

  let id = 0;
  for (let key in store.allItems) {
    store.allItems[key].forEach((item) => {
      id++;
      item.id = id;
      data["products"].push(item);
    });
  }

  const anchor = document.createElement("a");
  anchor.href =
    "data:text/json;charset=utf-8;lang=pt-BR," + JSON.stringify(data);
  anchor.download = "dados.json";
  anchor.click();
  console.log(anchor.href);
});

/*
  THIS SECTION CONTAINS CODE FOR THE LOGIN FUNCTIONALITY
*/

open_modal_btn.addEventListener("click", open_modal);
close_modal_btn.addEventListener("click", close_modal);
logout_btn.addEventListener("click", logout);

login_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = event.target.querySelector("#user").value;
  const password = event.target.querySelector("#password").value;

  const auth = {
    EMAIL: user,
    PASSWORD: password,
  };

  if (login(auth)) {
    loggedUser["EMAIL"] = auth["EMAIL"];
    loggedUser["PASSWORD"] = auth["PASSWORD"];

    logged = true;

    const cards = document.querySelectorAll(".card-model");
    cards.forEach((card) => {
      let item = searchItem(card);
      addButtons(item);
      store.updateItem(item);
    });

    close_modal();
    logout_btn.classList.toggle("hidden");
    download.classList.toggle("hidden");
    open_modal_btn.classList.toggle("hidden");

    console.log("Logged in");
  } else {
    console.log("couldn't log in");
  }
});

function login(auth) {
  const users = store_data.users;
  let log = false;

  users.forEach((user) => {
    if (user.email === auth["EMAIL"] && auth["PASSWORD"] === user.password) {
      loggedUser["TYPE"] = user.type;
      log = true;
    }
  });

  return log;
}

/*
  GENERAL FUNCTIONS
*/

function render() {
  let products = store_data.products;

  products.forEach((product) => {
    const item = new Product(
      product.id,
      product.name,
      product.price,
      product.description,
      product.type,
      product.stock,
      product.img
    );
    store.addItem(item);
    store.placeItem(item, items_section);
  });
}

function removeButtons(item) {
  const buttons = item.CONTAINER.getElementsByTagName("button");
  buttons.forEach((button) => {
    button.remove();
  });
}

function addButtons(item) {
  const button = function (className, content) {
    let button = `
      <button class="${className}">${content}</button>
    `;
    item.appendModel(button);
  };

  if (has_permission(loggedUser, actions.ADD_SELL)) {
    button("sell-btn", "BUY");
  }
  if (has_permission(loggedUser, actions.REMOVE_ITEM)) {
    button("remove-btn", "REMOVE");
  }
  if (has_permission(loggedUser, actions.MODIFY_ITEM)) {
    button("edit-btn", "EDIT");
    button("apply-btn hidden", "APPLY");
    button("cancel-btn hidden", "CANCEL");
  }
}

function searchItem(element) {
  const item_id = Number(element.id.split("-")[1]);
  const item_type = element.querySelector(".type").textContent;
  let remove;

  store.allItems[item_type].forEach((item) => {
    if (item.ID === item_id) {
      remove = item;
    }
  });

  return remove;
}

/*
  THIS EVENT LISTENER HANDLES THE EVENTS FOR EVERY BUTTON IN THE ITEMS
*/

items_section.addEventListener("click", (event) => {
  let card = event.target.parentNode;
  let text_container = card.querySelector(".text-container");

  let button = event.target;
  let edit = card.querySelector(".edit-btn");
  let apply = card.querySelector(".apply-btn");
  let cancel = card.querySelector(".cancel-btn");

  let item = searchItem(card);

  switch (button.className) {
    case "remove-btn":
      store.removeItem(item);
      card.remove();
      break;

    case "sell-btn":
      if (item.STOCK > 0) {
        item.removeStocks(1);
      } else {
        console.log("out of stock");
      }
      store.updateItem(item);
      break;

    case "edit-btn":
      text_container.childNodes.forEach((text) => {
        text.contentEditable = "true";
      });

      edit.classList.toggle("hidden");
      apply.classList.toggle("hidden");
      cancel.classList.toggle("hidden");

      break;

    case "apply-btn":
      let name = text_container.querySelector(".name").textContent;
      let price = Number(text_container.querySelector(".price").textContent);
      let type = text_container.querySelector(".type").textContent;
      let description =
        text_container.querySelector(".description").textContent;

      item.editName(name);
      item.editPrice(price);
      item.editType(type);
      item.editDescription(description);

      text_container.childNodes.forEach((text) => {
        text.contentEditable = "false";
      });

      edit.classList.toggle("hidden");
      apply.classList.toggle("hidden");
      cancel.classList.toggle("hidden");

      store.updateItem(item);
      break;

    case "cancel-btn":
      text_container.childNodes.forEach((text) => {
        text.contentEditable = "false";
      });

      edit.classList.toggle("hidden");
      apply.classList.toggle("hidden");
      cancel.classList.toggle("hidden");

      store.updateItem(item);
      break;
  }
});
