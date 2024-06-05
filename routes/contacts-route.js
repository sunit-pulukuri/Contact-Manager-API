const express = require("express");
const { getAllContacts, createNewContact, deleteContact, getIndividualContact, updateContact } = require("../controllers/contact-controller");
const validateToken = require("../middleware/validate-token-handler");
const router = express.Router();
//The default route 
//when the URL is http://localhost:5001/api/contacts/


router.use(validateToken);

router.route("/").get(getAllContacts).post(createNewContact)

router.route("/:id").get(getIndividualContact).put(updateContact).delete(deleteContact)




module.exports = router;