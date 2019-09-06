import { factory } from '../main.controller';

let compileEmail;
if (process.env.self) {
  compileEmail = require('./local');
} else {
  compileEmail = require('./server');
}

class MjmlService {
  constructor(ngjs, $http, ngbutils) {
    this.ngjs = ngjs;
    this.$http = $http;
    this.ngbutils = ngbutils;
  }

  compileEmail(email) {
    return compileEmail.default(email, this);
  }

  $get() {
    return this;
  }
}

export default factory('mjml', [
  'ngjs',
  '$http',
  'ngbutils',
  function(...args) {
    return new MjmlService(...args);
  }
]);
