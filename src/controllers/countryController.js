const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { countryService } = require('../services');

const getCountries =  catchAsync(async (req, res) => {
  const filter = pick(req.query, ['region']);
  const countryList = await countryService.getCountriesByRegion(filter);
  if (!countryList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country list not found');
  }
  res.send(countryList);
});

const getMinumumAndMaximumSalesRepresentatives = catchAsync(async (req, res) => {
  const representatives = await countryService.getMinumumAndMaximumSalesRepresentatives();
  if (!representatives) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Minumum and Maximum Sales Representatives not found');
  }

  res.send(representatives);
});

module.exports = {
  getCountries,
  getMinumumAndMaximumSalesRepresentatives,
};
