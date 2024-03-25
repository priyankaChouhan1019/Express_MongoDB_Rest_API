/* 1st :::controller is going to contoll all our logic to the req/res
2nd:::since we are going to connect ongo db ,it always return promises so we use async/await and using try catch 
we will handle error but we have  better option to handl it as "express-async-handler" we will wrap our code with this
 so now we no need to write try/catch in order to handle error */

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc create all contacts
//@route POST /api/contacts
//@access public
const createContacts = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, number } = req.body;
  if (!name || !email || !number) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    number,
    //   user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access public
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateContact);
});

//@desc delete contact
//@route PUT /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.remove();

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContacts,
  deleteContact,
};
