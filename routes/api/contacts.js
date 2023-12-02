const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  validateFavorite,
} = require("../../middlewares");

const { joiSchema, updateFavoriteSchemas } = require("../../models/contact");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(joiSchema), add);

router.delete("/:contactId", isValidId, deleteById);

router.put("/:contactId", isValidId, validateBody(joiSchema), updateById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(updateFavoriteSchemas),
  updateStatusContact
);

module.exports = router;
