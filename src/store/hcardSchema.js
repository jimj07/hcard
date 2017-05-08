'use strict';
module.exports = {
   'givenName': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'surname': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'email': {
      optional: {
         options: { checkFalsy: true }
      },
      isEmail: {
         errorMessage: 'Invalid Email'
      }
   },
   'phone': {
      optional: {
         options: { checkFalsy: true }
      },
      isNumeric: {
         errorMessage: 'Invalid Phone Number'
      }
   },
   'houseNumber': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'street': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'suburb': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'state': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'postcode': {
      optional: {
         options: { checkFalsy: true }
      },
   },
   'country': {
      optional: {
         options: { checkFalsy: true }
      },
   }
};