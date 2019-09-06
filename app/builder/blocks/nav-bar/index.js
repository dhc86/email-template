import template from './template.html';
import { scoped } from './style.less';

export default {
  element: {
    type: 'navBar',
    icon: '&#xE5D2;',
    primary_head: 'builder_el_navbar'
    // second_head: 'builder_el_navbar_comment'
  },
  defaults: {
    align: 'center',
    padding: ['5px', '15px', '5px', '15px'],
    // logo: 'https://via.placeholder.com/80x50?text=Logo',
    backgroundColor: '#ef6451',
    border: {
      size: 0,
      color: '#3498DB',
      style: 'solid'
      // radius: 0
    },
    font: {
      color: '#ffffff'
    },
    items: [
      {
        title: 'Default',
        href: 'https://em.wlocalhost.org/#!/'
      }
    ]
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class NavBar {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const {
          padding,
          backgroundColor,
          border,
          font,
          color,
          align
        } = this.options;
        this.$el.css({
          backgroundColor,
          padding: this.ngbutils.createPadding(padding),
          ...this.ngbutils.createBorder(border),
          color,
          ...this.ngbutils.createFont(font)
        });
        this.$el.toggleClass('left', align === 'left');
        this.$el.toggleClass('right', align === 'right');
      }
    }
  ]
};
