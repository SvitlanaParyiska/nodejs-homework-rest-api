const { Contact } = require("../models/contact");
const { NotFound } = require("http-errors");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const resultContacts = await Contact.find();
  res.json(resultContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const resultContact = await Contact.findById(contactId);
  if (!resultContact) {
    throw new NotFound("Not found");
  }
  res.json(resultContact);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const deletedResult = await Contact.findByIdAndDelete(contactId);
  if (!deletedResult) {
    throw new NotFound("Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedResult = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedResult) {
    throw new NotFound("Not found");
  }
  res.json(updatedResult);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedResult = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedResult) {
    throw new NotFound("Not found");
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
