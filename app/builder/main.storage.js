export default [
  'ngbutils',
  'variables',
  function(ngbutils, variables) {
    'use strict';

    var STORAGE_ID = 'Email',
      self = this;

    self.opts = {
      /**
       * Get Email from localStorage
       */
      get: function() {
        return new Promise(function(resolve, reject) {
          try {
            var email = JSON.parse(localStorage.getItem(STORAGE_ID)) || {
              name: variables.defaults.newEmailName,
              elements: [],
              html: '',
              emailSettings: {
                options: variables.defaults.emailOptions,
                type: 'emailSettings'
              }
            };
            resolve(email);
          } catch (e) {
            ngbutils.notify(e).error();
            reject(e);
          }
        });
      },

      /**
       * Put changed data in Email
       * Emulate server storage with Promise
       * @param email
       * @returns {Promise}
       */
      put: function(email) {
        return new Promise(function(resolve, reject) {
          try {
            // Remove multine breaks
            email.html = ngbutils.removeLineBreaks(email.html);
            localStorage.setItem(STORAGE_ID, JSON.stringify(email));
            resolve();
          } catch (e) {
            ngbutils.notify(e).error();
            reject(e);
          }
        });
      },

      /**
       * Delete current email template
       * @returns {*}
       */
      delete: function() {
        return delete localStorage[STORAGE_ID] && self.opts.get();
      }
    };

    return self.opts;
  }
];
