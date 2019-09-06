import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'imageText3x2',
    icon: 'wrap_text',
    primary_head: 'builder_el_image_text_3x2'
  },
  defaults: {
    padding: ['15px', '15px', '15px', '15px'],
    backgroundColor: '#ffffff',
    font: {},
    image1: 'https://via.placeholder.com/300x200?text=Change+me',
    image2: 'https://via.placeholder.com/300x200?text=Change+me',
    image3: 'https://via.placeholder.com/300x200?text=Change+me',
    width1: 300,
    width2: 300,
    width3: 300,
    altTag1: '',
    altTag2: '',
    altTag3: '',
    linkTo1: {
      type: 'none',
      link: ''
    },
    linkTo2: {
      type: 'none',
      link: ''
    },
    linkTo3: {
      type: 'none',
      link: ''
    },
    text1:
      '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. </p>',
    text2:
      '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. </p>',
    text3:
      '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. </p>'
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    'ngjs',
    class ImageText3x2 {
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

      getImageWidth(key) {
        return {
          width: `${this.options[key]}px`
        };
      }
    }
  ]
};
