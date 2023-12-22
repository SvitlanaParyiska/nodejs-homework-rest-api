const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const validateAvatar = require("./validateAvatar");
const validateSimpleBody = require("./validateSimpleBody");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  validateAvatar,
  validateSimpleBody,
};
