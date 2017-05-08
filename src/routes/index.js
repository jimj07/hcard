'use strict';
const express = require('express');
const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const HcardStorage = require('../store/hcardStorage').factory;
const hcardStorage = HcardStorage();
const Hcard = require('../../public/js/main').default;
const hcardFactory = React.createFactory(Hcard);

/* GET home page. */
router.get('/', function (req, res, next) {
   hcardStorage
      .get()
      .then((hcardProps) => {
         const hcardElement = hcardFactory(hcardProps);
         const renderedHcard = ReactDOMServer.renderToString(hcardElement);
         const hcardStr = hcardProps ? JSON.stringify(hcardProps) : 'undefined';
         const model = {
            hcard: renderedHcard,
            hcardProps: hcardStr
         };
         res.render('index', model);
      })
      .catch((err) => {
         next(err);
      });
});

module.exports = router;
