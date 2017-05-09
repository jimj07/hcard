'use strict';
const express = require('express');
const router = express.Router();
const HcardModel = require('../models/hcard');
const validator = require('../middlewares/validator');
const HcardStorage = require('../store/hcardStorage').factory;
const hcardStorage = HcardStorage();

router.use(validator);

router.post('/', function (req, res, next) {
   const hcard = HcardModel(req.body);
   hcardStorage.save(hcard).then(() => {
      res.redirect('/');
   }).catch((err) => {
      next(err);
   });
});

module.exports = router;
