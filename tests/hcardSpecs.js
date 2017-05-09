'use strict';
const expect = require('chai').expect;
const Hcard = require('../src/models/hcard');

describe('hcard', () => {
   describe('get()', () => {
      it('should return an object with all properties having empty value', () => {
         const expectCard = {
            'givenName': '',
            'surname': '',
            'email': '',
            'phone': '',
            'houseNumber': '',
            'street': '',
            'suburb': '',
            'state': '',
            'postcode': '',
            'country': ''
         };
         const card = Hcard();
         const actualCard = card.get();
         expect(actualCard).to.be.deep.equals(expectCard);
      });

      it('should return an object equals to the one passed in during initialization', () => {
         const cardProps = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'street': 'Harris Street',
            'suburb': 'Pyrmont',
            'state': 'NSW',
            'postcode': '2009',
            'country': 'Australia'
         };
         const card = Hcard(cardProps);
         const actualCard = card.get();
         expect(actualCard).to.be.deep.equals(cardProps);
      });

      it('should return an object with properties partially assigned value', () => {
         const cardProps = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
         };
         const expectCard = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'street': '',
            'suburb': '',
            'state': '',
            'postcode': '',
            'country': ''
         };
         const card = Hcard(cardProps);
         const actualCard = card.get();
         expect(actualCard).to.be.deep.equals(expectCard);
      });

      it('should return an object with predefined properties when the initialization value contains extra properties', () => {
         const cardProps = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'extraProp1': 'abc',
            'extraProp2': 'efg',
         };
         const expectCard = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'street': '',
            'suburb': '',
            'state': '',
            'postcode': '',
            'country': ''
         };
         const card = Hcard(cardProps);
         const actualCard = card.get();
         expect(actualCard).to.be.deep.equals(expectCard);
      });
   });

   describe('toUrlParams()', () => {
      it('should return url params', () => {
         const cardProps = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'street': 'Harris Street',
            'suburb': 'Pyrmont',
            'state': 'NSW',
            'postcode': '2009',
            'country': 'Australia'
         };
         const expectUrlParams = 'givenName=Sam&surname=Fairfax&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris%20Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia';
         const card = Hcard(cardProps);
         const actualUrlParams = card.toURLParams();
         expect(actualUrlParams).to.be.equals(expectUrlParams);
      });
   });

   describe('toString()', () => {
      it('should return stringify hcard', () => {
         const cardProps = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
         };
         const expectCard = {
            'givenName': 'Sam',
            'surname': 'Fairfax',
            'email': 'sam.fairfax@fairfaxmedia.com.au',
            'phone': '0292822833',
            'houseNumber': '100',
            'street': '',
            'suburb': '',
            'state': '',
            'postcode': '',
            'country': ''
         };
         const expectStrCard = JSON.stringify(expectCard);
         const card = Hcard(cardProps);
         const actualStrCard = card.toString();
         expect(actualStrCard).to.be.equals(expectStrCard);
      });
   });
});