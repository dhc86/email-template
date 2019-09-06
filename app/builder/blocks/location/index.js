import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'location',
    icon: '&#xE0C8;',
    primary_head: 'builder_el_location'
  },
  defaults: {
    align: 'center',
    padding: ['15px', '15px', '15px', '15px'],
    address: '37 bis, rue du Sentier 75002 Paris',
    image: 'http://i.imgur.com/DPCJHhy.png',
    backgroundColor: '#ffffff',
    font: {
      color: '#ef6451',
      size: 20
    }
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Location {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { padding, backgroundColor, font, color, align } = this.options;
        this.$el.attr('align', align);
        this.$el.css({
          padding: this.ngbutils.createPadding(padding),
          backgroundColor,
          color,
          ...this.ngbutils.createFont(font)
        });
      }
    }
  ]
};
