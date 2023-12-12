const roles = {
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
  GUEST: "GUEST",
};

const actions = {
  ADD_ITEM: "ADD_ITEM",
  MODIFY_ITEM: "MODIFY_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  VIEW_ITEM: "VIEW_ITEM",
  ADD_SELL: "ADD_SELL",
  REMOVE_SELL: "REMOVE_SELL",
  VIEW_SELL: "VIEW_SELL",
};

const product_types = {
  BOOK: [],
  CLOTHING: [],
  COLLECTIBLE: [],
  GAME: [],
  SUPPLY: [],
  MOVIE: [],
  GIFTCARD: [],
};

export { actions, roles, product_types };
