'use strict';
const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator');
const HcardStorage = require('../store/hcardStorage').factory;
const hcardStorage = HcardStorage();

router.use(validator);
router.post('/', function (req, res, next) {
   const hcardField = req.body;
   hcardStorage.update(hcardField).then(() => {
      res.end();
   }).catch((err) => {
      next(err);
   });
});

module.exports = router;
