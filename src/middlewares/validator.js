'use strict';
const util = require('util');
const hcardSchema = require('../models/hcardSchema');
module.exports = (req, res, next) => {
   req.checkBody(hcardSchema);
   req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
         const err = new Error('There have been validation errors: ' + util.inspect(result.array()));
         err.status = 400;
         next(err);
      } else {
         next();
      }
   });
};