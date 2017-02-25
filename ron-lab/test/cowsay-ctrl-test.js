'use strict';

require('./lib/test-setup.js');

const angular = require('angular');
const cowsay = require('cowsay-browser');

describe('Cowsay Controller', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });

  describe('initial properties', () => {
    it('title property should equal Welcome to Cowville!', () => {
      expect(this.cowsayCtrl.title).toBe('Welcome to Cowville!');
    });

    it('history property should be an empty array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    it('list of cowfiles should show proper cowfiles', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.current).toEqual(list[0]);
      });
    });
  });

  describe('#update', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      let result = this.cowsayCtrl.update('testing');
      expect(result).toEqual(expected);
    });
  });

  describe('#speak', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history[0]).toEqual(expected);
    });
  });

  describe('#undo', () => {
    it('should return a cow that says testing', () => {
      let expected = cowsay.say({ text: 'testing', f: this.cowsayCtrl.current });
      this.cowsayCtrl.speak('testing');
      this.cowsayCtrl.speak('testing again');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expected);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });
  });
});

describe('NavController', function() {
  beforeEach(() => {
    angular.mock.module('cowsayApp');
    angular.mock.inject($controller => {
      this.navCtrl = new $controller('NavController');
    });
  });

  describe('router properties: ', () => {
    it('should have an array of routes ', () => {
      expect(Array.isArray(this.navCtrl.routes)).toBe(true);
    });
  });

  describe('router should have router property of name ', () => {
    it('should return a property of name: home ', () => {
      expect(this.navCtrl.routes[0].name).toBe('home');
    });
  });

  describe('router objects should have router property of url ', () => {
    it('should return a  url property of "/home"', () => {
      expect(this.navCtrl.routes[0].url).toBe('/home');
    });
  });

  describe('router should have router property of name ', () => {
    it('should return a property of name: about ', () => {
      expect(this.navCtrl.routes[1].name).toBe('about');
    });
  });

  describe('router objects should have router property of url ', () => {
    it('should return a  url property of "/about-us"', () => {
      expect(this.navCtrl.routes[1].url).toBe('/about-us');
    });
  });

  describe('router should have router property of name ', () => {
    it('should return a property of name: contact ', () => {
      expect(this.navCtrl.routes[2].name).toBe('contact');
    });
  });

  describe('router objects should have router property of url ', () => {
    it('should return a  url property of "/contact-us"', () => {
      expect(this.navCtrl.routes[2].url).toBe('/contact-us');
    });
  });

});
