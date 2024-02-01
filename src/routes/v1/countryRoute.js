const express = require('express');
const validate = require('../../middlewares/validate');
const countryController = require('../../controllers/countryController');

const router = express.Router();

router
  .route('/countries')
  .get(countryController.getCountries);

router
  .route('/salesrep')
  .get(countryController.getMinumumAndMaximumSalesRepresentatives);

module.exports = router;

