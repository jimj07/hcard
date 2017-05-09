'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');
const HcardStorage = require('../src/store/hcardStorage');
const mockHcardStorage = require('./mockHcardStorage');
const Hcard = require('../src/models/hcard');

describe('app', () => {
   let sandbox;

   beforeEach(function (done) {
      sandbox = sinon.sandbox.create();
      done();
   });

   afterEach(function (done) {
      process.env.NODE_ENV = undefined;
      sandbox.restore();
      done();
   });

   it('should response 404', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);
      const server = require('../app');
      request(server)
         .get('/doesntExist')
         .expect(404).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains('Not Found');
            done();
         });
   }).timeout(10000);

   it('should response error when update failed', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);

      const updateFailedError = 'Update failed';
      
      sandbox.stub(mockHcardStorage, 'get').resolves(Hcard());
      sandbox.stub(mockHcardStorage, 'save').rejects(new Error(updateFailedError));

      const server = require('../app');
      request(server)
         .post('/update')
         .expect(500).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains(updateFailedError);
            done();
         });
   });

   it('should response error when submit failed', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);

      const submitFailedError = 'Save failed';
      sandbox.stub(mockHcardStorage, 'save').rejects(new Error(submitFailedError));

      const server = require('../app');
      request(server)
         .post('/submit')
         .expect(500).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains(submitFailedError);
            done();
         });
   });

   it('should response error when get failed', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);

      const getFailedError = 'Get failed';
      sandbox.stub(mockHcardStorage, 'get').rejects(new Error(getFailedError));

      const server = require('../app');
      request(server)
         .get('/')
         .expect(500).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains(getFailedError);
            done();
         });
   });

   it('should response error with no details when it is not development env', (done) => {
      sandbox.stub(HcardStorage, 'factory').returns(mockHcardStorage);

      const getFailedError = 'Get failed';
      sandbox.stub(mockHcardStorage, 'get').rejects(new Error(getFailedError));

      process.env.SUPRESS_LOG = 'false';
      const server = require('../app');
      server.set('env', 'production');
      request(server)
         .get('/')
         .expect(500).end((err, res) => {
            expect(err).to.be.null;
            expect(res.text).to.contains(getFailedError);
            expect(res.text).to.contains('<pre></pre>');
            process.env.SUPRESS_LOG = 'true';
            done();
         });
   });
});