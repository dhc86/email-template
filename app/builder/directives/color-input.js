import { directive } from '../main.controller';

export default directive('colorInput', () => ({
  restrict: 'E',
  replace: false,
  template: `
    <div class="current-color" ng-style="{ backgroundColor: model }"></div>
    <input ng-model="model" colorpicker type="text" />
  `,
  scope: {
    model: '='
  },
  link(scope, elem, attrs) {
    elem.find('div').on('click', () => elem.find('input').click());
    elem
      .find('input')
      .on('focus', () => {
        elem.addClass('focussed');
      })
      .on('focusout', () => {
        elem.removeClass('focussed');
      });
  }
}));
