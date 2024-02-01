const httpStatus = require('http-status');
const { Country } = require('../models');
const ApiError = require('../utils/ApiError');
const axios =  require('../utils/axios');

/**
 * Query for countries
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getCountriesByRegion = async (filter) => {
    try{
        const countries = await Country.find(filter);
        return countries
    }catch{
        return null;
    }

};

/**
 * Query for countries
 * @returns {Promise<QueryResult>}
 */
const getMinumumAndMaximumSalesRepresentatives = async () => {
    try{
        const countries = await axios.get('/country/countries', { params: {} }).then((result) => {
            return result.data;
        }).catch((err) => {
            return {};
        });

        const regionSalesRequirements = analyzeRegionsBySalesRep(countries);
        return regionSalesRequirements
    }catch(err){
        return null;
    }

};

function analyzeRegionsBySalesRep(countries) {
  const regionSalesRequirements = {};
  const MIN_REP = 3;
  const MAX_REP = 7;
  countries.forEach((country) => {
    const region = country.region;

    if (!regionSalesRequirements[region]) {
      regionSalesRequirements[region] = {
        region,
        countryCount: 1,
        maxSalesReq:1,
        minSalesReq:1,
      };
    } else {
      regionSalesRequirements[region].countryCount++;
    }
  });
  result = {}
  Object.values(regionSalesRequirements).forEach((regionRequirement) => {
    const countryCount = regionRequirement.countryCount;
    regionRequirement.minSalesReq = Math.max(1, Math.floor(countryCount / MAX_REP));
    let remaining = countryCount%MAX_REP;
    regionRequirement.minSalesReq += remaining !=0 ? 1 : 0;
    regionRequirement.maxSalesReq = Math.max(regionRequirement.minSalesReq, Math.floor(countryCount / MIN_REP));

    result[regionRequirement.region] = {
        region:regionRequirement.region,
        minSalesReq:regionRequirement.minSalesReq,
        maxSalesReq:regionRequirement.maxSalesReq,
    };
});
  return Object.values(result);
}

module.exports = {
    getCountriesByRegion,
    getMinumumAndMaximumSalesRepresentatives,
};
