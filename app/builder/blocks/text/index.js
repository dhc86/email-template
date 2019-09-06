import template from './template.html';
import { scoped } from './style.less';

export default {
  defaults: {
    padding: ['10px', '15px', '10px', '15px'],
    backgroundColor: '#ffffff',
    font: {
      size: 15,
      color: '#444444'
      // family: 'inherit'
    },
    text:
      '<p style="margin: 0">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>'
  },
  element: {
    type: 'text',
    icon: '&#xE8EE;',
    primary_head: 'builder_el_text'
    // second_head: 'builder_el_text_comment'
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    'ngjs',
    class Text {
      constructor($element, ngbutils, ngjs) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
        this.ngjs = ngjs;
      }

      $doCheck() {
        const { padding, backgroundColor, font } = this.options;
        this.$el.css({
          padding: this.ngbutils.createPadding(padding),
          backgroundColor,
          ...this.ngbutils.createFont(font)
        });
      }
    }
  ]
};
