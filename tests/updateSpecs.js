'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const mockHcardStorage = require('./mockHcardStorage');

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

   it('should response rendered page with saved hcard value', (done) => {
      const hcarStorageStub = sandbox.stub(mockHcardStorage, 'update').resolves();

      const server = require('../app');
      request(server)
         .post('/update')
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .send('suburb=Pyrmont')
         .expect(200).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.empty;
            expect(hcarStorageStub.calledWith({
               suburb: 'Pyrmont'
            })).to.be.true;
            done();
         });
   });

   it('should response 400 about invalid email', (done) => {
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