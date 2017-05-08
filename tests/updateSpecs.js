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
});