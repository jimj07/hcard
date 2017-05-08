'use strict';
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db.json', {
   storage: fileAsync
});
const entryId = 'hcard';

module.exports.factory = () => {

   const save = (hcard) => {
      return db.set(entryId, hcard)
         .write();
   };

   const update = (hcardField) => {
      return db.get(entryId)
         .assignIn(hcardField)
         .write();
   };

   const get = () => {
      return new Promise((resolve) => {
         const hcard = db.get(entryId).value();
         resolve(hcard);
      });
   };

   return {
      save,
      update,
      get
   };
};