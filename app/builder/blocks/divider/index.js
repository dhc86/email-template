import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'divider',
    icon: '&#xE8E9;',
    primary_head: 'builder_el_divider'
  },
  defaults: {
    padding: ['15px', '15px', '15px', '15px'],
    backgroundColor: '#ffffff',
    border: {
      size: 1,
      style: 'solid',
      color: '#DADFE1'
    }
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Divider {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { padding, backgroundColor } = this.options;
        this.$el.css({
          padding: this.ngbutils.createPadding(padding),
          backgroundColor
        });
      }

      getDividerStyle() {
        return this.ngbutils.createBorder(this.options.border);
      }
    }
  ]
};
