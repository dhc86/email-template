import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'imageTextLeft',
    icon: 'format_textdirection_r_to_l',
    primary_head: 'builder_el_image_text_left'
  },
  defaults: {
    padding: ['15px', '15px', '15px', '15px'],
    image: 'https://via.placeholder.com/400x250?text=Change+me',
    width: 400,
    backgroundColor: '#ffffff',
    altTag: '',
    font: {},
    linkTo: {
      type: 'none',
      link: ''
    },
    text:
      '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>'
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    'ngjs',
    class ImageTextLeft {
      constructor($element, ngbutils, ngjs) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
        this.ngjs = ngjs;
      }

      $doCheck() {
        const { backgroundColor, padding, font = {} } = this.options;
        this.$el.css({
          backgroundColor,
          padding: this.ngbutils.createPadding(padding),
          ...this.ngbutils.createFont(font)
        });
      }

      getImageStyles() {
        const { width } = this.options;
        return {
          width: `${width}px`
        };
      }
    }
  ]
};
