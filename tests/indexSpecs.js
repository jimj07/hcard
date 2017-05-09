'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const HcardStorage = require('../src/store/hcardStorage');
const mockHcardStorage = require('./mockHcardStorage');
const Hcard = require('../src/models/hcard');

describe('index', () => {
   let sandbox;

   beforeEach(function (done) {
      sandbox = sinon.sandbox.create();
      done();
   });

   afterEach(function (done) {
      sandbox.restore();
      done();
   });

   it('should response rendered page with saved hcard value', (done) => {
      const hcard = Hcard({
         'givenName': 'Jim',
         'surname': 'Jiang',
      });
      const renderedHcard = '<hcard></hcard>';
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      sandbox.stub(React, 'createFactory').returns(() => {});
      sandbox.stub(ReactDOMServer, 'renderToString').returns(renderedHcard);
      sandbox.stub(mockHcardStorage, 'get').resolves(Promise.resolve(hcard));


      const server = require('../app');
      request(server).get('/').expect(200).end((err, res) => {
         expect(err).to.be.null;
         expect(res.text).to.contains(hcard.toString());
         expect(res.text).to.contains(renderedHcard);
         done();
      });
   });

   it('should response rendered page with no hcard value', (done) => {
      const hcard = Hcard();
      const renderedHcard = '<hcard></hcard>';
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      sandbox.stub(React, 'createFactory').returns(() => {});
      sandbox.stub(ReactDOMServer, 'renderToString').returns(renderedHcard);
      sandbox.stub(mockHcardStorage, 'get').resolves(Promise.resolve(hcard));


      const server = require('../app');
      request(server).get('/').expect(200).end((err, res) => {
         expect(err).to.be.null;
         expect(res.text).to.contains(hcard.toString());
         expect(res.text).to.contains(renderedHcard);
         done();
      });
   });
});