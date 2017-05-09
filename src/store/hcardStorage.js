'use strict';
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db.json', {
   storage: fileAsync
});
const Hcard = require('../models/hcard');
const entryId = 'hcard';

module.exports.factory = () => {
   const save = (hcard) => {
      return db.set(entryId, hcard.get())
         .write();
   };

   const get = () => {
      return new Promise((resolve) => {
         const hcardProps = db.get(entryId).value();
         const hcard = Hcard(hcardProps);
         resolve(hcard);
      });
   };

   return {
      save,
      get
   };
};