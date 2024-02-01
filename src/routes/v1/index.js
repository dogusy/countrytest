const express = require('express');
const countryRoute = require('./countryRoute');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/country',
    route: countryRoute,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
