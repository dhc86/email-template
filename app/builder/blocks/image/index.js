import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'image',
    icon: '&#xE40B;',
    primary_head: 'builder_el_image'
  },
  defaults: {
    align: 'center',
    padding: ['0px', '0px', '0px', '0px'],
    backgroundColor: '#ffffff',
    image: 'https://via.placeholder.com/800x300?text=Change+Me',
    width: 800,
    altTag: 'Image alt',
    linkTo: {
      type: 'none',
      link: ''
    }
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Image {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { align, padding, backgroundColor } = this.options;
        this.$el.css({
          textAlign: align,
          padding: this.ngbutils.createPadding(padding),
          backgroundColor
        });
      }

      getImageStyle() {
        return {
          width: `${this.options.width}px`
        };
      }
    }
  ]
};
