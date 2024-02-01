const Joi = require('joi');

const getCountries = {
    query: Joi.object().keys({
        region: Joi.string(),
      })};


module.exports = {
    getCountries
};
