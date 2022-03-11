const {
  getallcontacts,
  createcontact,
  deletecontact,
  updatecontact,
  singleContact,
} = require("../controllers/contactController");

const router = require("express").Router();

router.route("/contacts").get(getallcontacts);

router.route("/contact/new").post(createcontact);
router
  .route("/contact/:id")
  .delete(deletecontact)
  .put(updatecontact)
  .get(singleContact);

module.exports = router;
