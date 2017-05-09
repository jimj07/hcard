'use strict';
const urlencode = require('urlencode');

module.exports = (props) => {
   //Private
   const hcardObject = {
      givenName: '',
      surname: '',
      email: '',
      phone: '',
      houseNumber: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      country: ''
   };

   const initialize = (props) => {
      if(!props) {
         return;
      }
      
      Object.keys(hcardObject).forEach((key) => {
         if (props[key]) {
            hcardObject[key] = props[key];
         }
      });
   };
   initialize(props);

   //Public
   const toURLParams = () => {
      return Object.keys(hcardObject).map(function (key) {
         return key + '=' + urlencode(hcardObject[key]);
      }).join('&');
   };

   const toString = () => {
      return JSON.stringify(hcardObject);
   };

   const get = () => {
      return hcardObject;
   };

   const set = (props) => {
      initialize(props);
   };

   return {
      toURLParams,
      toString,
      get,
      set
   };
};