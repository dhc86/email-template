import template from './template.html';
import { scoped } from './style.less';

export default {
  template,
  defaults: {
    align: 'center',
    title: 'Enter your title here',
    subTitle: 'Subtitle',
    padding: ['20px', '15px', '20px', '15px'],
    backgroundColor: '#ffffff',
    font: {
      color: '#444444'
    }
  },
  element: {
    type: 'title',
    icon: '&#xE165;',
    primary_head: 'builder_el_title'
  },
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Title {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { backgroundColor, align, padding, color, font } = this.options;
        this.$el.css({
          backgroundColor,
          textAlign: align,
          padding: this.ngbutils.createPadding(padding),
          color,
          ...this.ngbutils.createFont(font)
        });
      }
    }
  ]
};
