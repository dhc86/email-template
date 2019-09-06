import angular from 'angular';
import dragula from 'angular-dragula';
import 'tinymce';
import 'angular-ui-tinymce';
import 'ngalertify';
import 'angular-translate';
import 'angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js';
import 'angular-bootstrap-colorpicker/css/colorpicker.css';

/**
 * Email builder module
 * Include this module in your project like another Angular module ['ngjs-email-builder-module'] or you can rename it.
 */
export const {
  component,
  directive,
  factory,
  filter,
  config,
  constant,
  value
} = angular.module('ngjs-email-builder-module', [
  dragula(angular),
  'pascalprecht.translate',
  'ui.tinymce',
  'ngSanitize',
  'ngAlertify',
  'colorpicker.module'
]);

config([
  '$translateProvider',
  '$sceDelegateProvider',
  '$compileProvider',
  function($translateProvider, $sceDelegateProvider, $compileProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
    $compileProvider.debugInfoEnabled(false);

    $translateProvider.translations('en', require('./i18n/en.json'));
    $translateProvider.translations('ru', require('./i18n/ru.json'));
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
    // $translateProvider.fallbackLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
  }
]);

value('uiTinymceConfig', {
  baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.8.3',
  format: 'raw'
});

export const { noop } = angular;
