import { actions, roles } from "./constants.js";

const mappings = new Map();

mappings.set(actions.ADD_ITEM, [roles.ADMIN]);
mappings.set(actions.MODIFY_ITEM, [roles.ADMIN]);
mappings.set(actions.REMOVE_ITEM, [roles.ADMIN]);
mappings.set(actions.VIEW_ITEM, [roles.ADMIN, roles.EMPLOYEE, roles.GUEST]);
mappings.set(actions.ADD_SELL, [roles.ADMIN, roles.EMPLOYEE]);
mappings.set(actions.REMOVE_SELL, [roles.ADMIN]);
mappings.set(actions.VIEW_SELL, [roles.ADMIN, roles.EMPLOYEE]);

function has_permission(file, action) {
  if (!file?.TYPE) {
    return false;
  }

  if (mappings.has(action)) {
    return mappings.get(action).includes(file.TYPE);
  }

  return false;
}

export default has_permission;
