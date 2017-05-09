'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const HcardStorage = require('../src/store/hcardStorage');
const mockHcardStorage = require('./mockHcardStorage');
const Hcard = require('../src/models/hcard');

describe('submit', () => {
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
         'givenName': 'Sam',
         'surname': 'Fairfax',
      });
      const renderedHcard = '<hcard></hcard>';
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      sandbox.stub(React, 'createFactory').returns(() => { });
      sandbox.stub(ReactDOMServer, 'renderToString').returns(renderedHcard);
      sandbox.stub(mockHcardStorage, 'get').resolves(Promise.resolve(hcard));
      const hcarStorageStub = sandbox.stub(mockHcardStorage, 'save').resolves();

      const server = require('../app');
      request(server)
         .post('/submit')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send(hcard.toURLParams())
         .expect(302).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains('to /');
            expect(hcarStorageStub.called).to.be.true;
            done();
         });
   });

   it('should response 400 about invalid email', (done) => {
      const hcard = Hcard({
         givenName: 'Sam',
         surname: 'Fairfax',
         email: 'invalid'
      });
      const renderedHcard = '<hcard></hcard>';
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      sandbox.stub(React, 'createFactory').returns(() => { });
      sandbox.stub(ReactDOMServer, 'renderToString').returns(renderedHcard);
      sandbox.stub(mockHcardStorage, 'get').resolves(Promise.resolve(hcard.get()));
      const hcarStorageStub = sandbox.stub(mockHcardStorage, 'save').resolves();

      const server = require('../app');
      request(server)
         .post('/submit')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send(hcard.toURLParams())
         .expect(400).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains('Invalid Email');
            expect(hcarStorageStub.called).to.be.false;
            done();
         });
   });
});