import { factory } from './main.controller';

export default factory('ngbutils', [
  '$filter',
  'alertify',
  'ngjs',
  ($filter, alertify, ngjs) => ({
    /**
     * Translate key direct in module
     * @example: ngbutils.translate(key_to_translate, additional_data)
     * @param key_to_translate
     * @param additional_data
     * @returns {*}
     */
    translate(key_to_translate, additional_data) {
      return $filter('translate')(key_to_translate, additional_data);
    },
    /**
     * Convert string from snake to camel
     * @param str
     * @returns {*}
     */
    snakeToCamel(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/_([a-z])/gi, function(m, w) {
        return '' + w.toUpperCase();
      });
    },
    /**
     * Convert camel to snake
     * @param str
     * @returns {*}
     */
    camelToSnake(str) {
      if (typeof str !== 'string') return str;
      return str.replace(/([A-Z])/g, function(m, w) {
        return '_' + w.toLowerCase();
      });
    },
    /**
     * Generate random id
     * @param prefix
     * @returns {string}
     */
    uid(prefix) {
      return (
        (prefix || 'id') +
        new Date().getTime() +
        'RAND' +
        Math.ceil(Math.random() * 100000)
      );
    },

    createPadding(paddingArray) {
      return paddingArray.join(' ');
    },

    getLink({ type, link }) {
      if (type === 'email') {
        return `mailto:${link}`;
      }
      return link;
    },

    createBorder(
      { size, radius, color, style } = {
        size: 1,
        radius: 0,
        color: '#3498DB',
        style: 'solid'
      }
    ) {
      return {
        border: `${size}px ${style} ${color}`,
        borderRadius: `${radius}px`
      };
    },

    createFont(
      { size, color, weight, style, family } = {
        size: 16,
        color: '#ffffff',
        weight: 'normal',
        style: 'normal',
        family: 'inherit'
      }
    ) {
      return {
        fontFamily: family,
        fontStyle: style,
        fontWeight: weight,
        fontSize: `${size}px`,
        color
      };
    },
    /**
     * Notify
     * @param msg
     * @param callback
     * @returns {{log: ngbutils.log, success: ngbutils.success, error: ngbutils.error}}
     */
    notify(msg, callback) {
      return {
        log() {
          return alertify.log(msg, callback);
        },
        success() {
          alertify.success(msg, callback);
        },
        error() {
          alertify.error(msg, callback);
        }
      };
    },
    /**
     * Confirm dialog
     * @param msg
     * @param succesFn
     * @param cancelFn
     * @param okBtn
     * @param cancelBtn
     * @returns {IAlertify}
     */
    confirm(msg, succesFn, cancelFn, okBtn, cancelBtn) {
      return alertify
        .okBtn(okBtn)
        .cancelBtn(cancelBtn)
        .confirm(msg, succesFn, cancelFn);
    },
    /**
     * Alert dialog
     * @param msg
     * @returns {IAlertify}
     */
    alert(msg) {
      return alertify.okBtn('Accept').alert(msg);
    },
    /**
     * Prompt dialog
     * @param defaultvalue
     * @param promptMessage
     * @param successFn
     * @param cancelFn
     * @returns {IAlertify}
     */
    prompt(defaultvalue, promptMessage, successFn, cancelFn) {
      return alertify
        .defaultValue(defaultvalue)
        .prompt(promptMessage, successFn, cancelFn);
    },

    /**
     * Track events with Google Analytics
     * @param category
     * @param event
     * @param name
     * @returns {*}
     */
    trackEvent(category, event, name) {
      if (ngjs.config.trackEvents && window.ga) {
        return window.ga('send', 'event', category, event, name);
      } else if (ngjs.config.trackEvents && !window.ga) {
        return console.info('To track events, add Google UA in in your pages!');
      }
    }
  })
]);
