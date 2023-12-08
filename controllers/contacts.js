const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite=[true, false] } = req.query;
  const skip = (page - 1) * limit;
  const resultContacts = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    { skip, limit }
  );
  res.json({
    contacts: resultContacts,
    page: Math.ceil(resultContacts.length / limit),
    total: resultContacts.length,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const resultContact = await Contact.findById(contactId);
  if (!resultContact) {
    throw HttpError(404, "Not found");
  }
  res.json(resultContact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const deletedResult = await Contact.findByIdAndDelete(contactId);
  if (!deletedResult) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedResult = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedResult) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedResult);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedResult = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedResult) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedResult);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
