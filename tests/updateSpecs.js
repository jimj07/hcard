'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const HcardStorage = require('../src/store/hcardStorage');
const mockHcardStorage = require('./mockHcardStorage');
const Hcard = require('../src/models/hcard');

describe('update', () => {
   let sandbox;

   beforeEach(function (done) {
      sandbox = sinon.sandbox.create();
      done();
   });

   afterEach(function (done) {
      sandbox.restore();
      done();
   });

   it('should response 200', (done) => {
      const hcard = Hcard({
         'givenName': 'Sam',
         'surname': 'Fairfax',
      });

      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      sandbox.stub(mockHcardStorage, 'get').resolves(Promise.resolve(hcard));
      const hcarStorageStub = sandbox.stub(mockHcardStorage, 'save').resolves();

      const server = require('../app');
      request(server)
         .post('/update')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send('suburb=Pyrmont')
         .expect(200).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.empty;
            expect(hcarStorageStub.calledWith(hcard)).to.be.true;
            expect(hcard.get()).to.deep.equals({
               givenName: 'Sam',
               surname: 'Fairfax',
               email: '',
               phone: '',
               houseNumber: '',
               street: '',
               suburb: 'Pyrmont',
               state: '',
               postcode: '',
               country: ''
            });
            done();
         });
   });

   it('should response 400 about invalid email', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      const hcarStorageStub = sandbox.stub(mockHcardStorage, 'save').resolves();
      const server = require('../app');
      request(server)
         .post('/submit')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send('givenName=Sam&surname=Fairfax&email=invalid')
         .expect(400).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains('Invalid Email');
            expect(hcarStorageStub.called).to.be.false;
            done();
         });
   });
});