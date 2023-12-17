const { HttpError } = require("../helpers");

const validateAvatar = async (req, res, next) => {
  if (req.file === undefined) {
    next(
      HttpError(400, "The image was not found, please check form-data values")
    );
  }
  next();
};

module.exports = validateAvatar;
