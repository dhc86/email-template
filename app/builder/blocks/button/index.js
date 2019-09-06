import template from './template.html';
import { scoped } from './style.less';

export default {
  defaults: {
    align: 'center',
    padding: ['12px', '20px', '12px', '20px'],
    margin: ['15px', '15px', '15px', '15px'],
    buttonText: 'Click me',
    url: '#',
    buttonBackgroundColor: '#3498DB',
    backgroundColor: '#ffffff',
    border: {
      size: 1,
      radius: 3,
      color: '#3498DB',
      style: 'solid'
    },
    fullWidth: false,
    font: {
      size: 15,
      color: '#ffffff',
      weight: 'normal'
      // family: 'inherit'
    }
  },
  element: {
    type: 'button',
    icon: '&#xE913;',
    primary_head: 'builder_el_button'
    // second_head: 'builder_el_button_comment'
  },
  template,
  bindings: {
    options: '='
  },
  controller: [
    '$element',
    'ngbutils',
    class Button {
      constructor($element, ngbutils) {
        $element.addClass(scoped);
        this.$el = $element;
        this.ngbutils = ngbutils;
      }

      $doCheck() {
        const { align, margin, backgroundColor } = this.options;
        this.$el.css({
          textAlign: align,
          backgroundColor,
          padding: this.ngbutils.createPadding(margin)
        });
      }

      getButtonStyles() {
        const {
          padding,
          buttonBackgroundColor,
          border,
          fullWidth,
          font
        } = this.options;

        return {
          padding: this.ngbutils.createPadding(padding),
          backgroundColor: buttonBackgroundColor,
          width: (fullWidth && '100%') || null,
          ...this.ngbutils.createFont(font),
          ...this.ngbutils.createBorder(border)
        };
      }
    }
  ]
};
